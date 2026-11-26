// limv2.js: UNCLE LIM, redrawn (teacher, 26 Nov 2026, on the first build's rider: "where's the hand?"). Loaded after artv2.js (limHead,
// roadsterV2, RD, bikeRearV2, kopiBag, handL, SKINL, INKL). A friendly older man in the series' clean outlined style: a head on a neck,
// shoulders, two arms with visible mitten hands, a short-sleeved checked shirt with folds and shading, khaki shorts with a hem, legs with
// knees, sandals. RIDING: his seat ON the saddle, both hands on the grips (the far hand behind the stem), his feet ON the pedals (a two-bone
// leg solved for each pedal, so they turn with the cranks; the far leg drawn behind the frame, darker). He sips his kopi only when stopped:
// the near hand lifts the bag, the far hand stays on the bar. STANDING: hands at his sides, the kopi bag in one hand, a sip, a wave.
// FACES notes (SERIES_FORMAT 6x): limRideV2 FACES right (mirrored to ride left); limStand faces the camera; limFrontRideV2 rides towards the
// camera; limRearRideV2 rides away.
const LIM = { shirt: "#8CC8EC", shirt2: "#5FA6D6", check: "#3F86B8", shorts: "#8A9670", shorts2: "#6E7A57", skin: SKINL, skin2: "#D9A57A", ink: INKL, sandal: "#6B4A33" };
// a two-segment limb a -> b -> c with an outline; w = width
const limbL = (pts, w, col, ink = LIM.ink) => { const d = "M" + pts.map((p) => `${n2(p[0])} ${n2(p[1])}`).join(" L"); return `<path d="${d}" stroke="${ink}" stroke-width="${w + 7}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`; };
// solve a two-bone joint: from a to c with bone lengths l1, l2; side = +1 / -1 bends one way or the other
const ik2 = (a, c, l1, l2, side) => { const dx = c[0] - a[0], dy = c[1] - a[1], d = Math.min(l1 + l2 - .5, Math.hypot(dx, dy)), a0 = Math.atan2(dy, dx), b = Math.acos(clamp((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d), -1, 1)) * side;
  return [a[0] + l1 * Math.cos(a0 + b), a[1] + l1 * Math.sin(a0 + b)]; };
// a mitten hand curled round a grip (seen from the side or the front), origin = the grip; k scale; dark = the far hand
const mittGrip = (x, y, k = 1, dark = false) => TF(x, y, k, `<ellipse cx="0" cy="0" rx="20" ry="17" fill="${dark ? LIM.skin2 : LIM.skin}" stroke="${LIM.ink}" stroke-width="5"/><path d="M-12 -6 q12 8 24 0 M-12 3 q12 8 24 0" stroke="${LIM.skin2}" stroke-width="3" fill="none"/><path d="M-6 -15 q10 -4 16 4" stroke="${LIM.ink}" stroke-width="4" fill="none" stroke-linecap="round"/>`);
// a relaxed mitten hand hanging down (front view), origin = the wrist
const mittHang = (x, y, k = 1, fl = 1) => TF(x, y, k, `<g transform="scale(${fl} 1)"><path d="M-14 -4 Q-18 22 -8 34 Q4 40 14 30 Q20 14 14 -4z" fill="${LIM.skin}" stroke="${LIM.ink}" stroke-width="5" stroke-linejoin="round"/><path d="M-14 6 q-10 6 -8 16" stroke="${LIM.ink}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M-4 24 v8 M4 24 v9" stroke="${LIM.skin2}" stroke-width="3"/></g>`);
// a short sleeve over the top of an arm (from the shoulder s towards the elbow e, covering frac of it)
const sleeveL = (s, e, frac = .5, w = 42) => { const m = [s[0] + (e[0] - s[0]) * frac, s[1] + (e[1] - s[1]) * frac], L = Math.hypot(m[0] - s[0], m[1] - s[1]) || 1, nx = -(m[1] - s[1]) / L * w / 2, ny = (m[0] - s[0]) / L * w / 2;
  const a = [s[0] + nx, s[1] + ny], b = [m[0] + nx * 1.08, m[1] + ny * 1.08], c = [m[0] - nx * 1.08, m[1] - ny * 1.08], d = [s[0] - nx, s[1] - ny], P = (p) => `${n2(p[0])} ${n2(p[1])}`;
  return `<path d="M${P(a)} L${P(b)} L${P(c)} L${P(d)} A${n2(w / 2)} ${n2(w / 2)} 0 0 0 ${P(a)}z" fill="${LIM.shirt}" stroke="${LIM.ink}" stroke-width="5" stroke-linejoin="round"/><path d="M${P([b[0] * .8 + c[0] * .2 + (s[0] - m[0]) * .12, b[1] * .8 + c[1] * .2 + (s[1] - m[1]) * .12])} L${P([c[0] * .8 + b[0] * .2 + (s[0] - m[0]) * .12, c[1] * .8 + b[1] * .2 + (s[1] - m[1]) * .12])}" stroke="${LIM.shirt2}" stroke-width="4" stroke-linecap="round"/>`; };
// the side-view torso (shirt), from the hip h up to the shoulder s, facing right
function limTorsoSide(h, s) { const ang = Math.atan2(s[0] - h[0], h[1] - s[1]), c = Math.cos(ang), sn = Math.sin(ang), P = (u, v) => [h[0] + u * c + v * sn, h[1] + u * sn - v * c];   // u: across (+ = front), v: up
  const pts = [P(-56, -6), P(52, -6), P(68, 56), P(60, 130), P(40, 184), P(0, 198), P(-34, 192), P(-54, 166), P(-62, 110), P(-62, 50)];
  let s_ = `<path d="M${pts.map((p) => n2(p[0]) + " " + n2(p[1])).join(" L")}Z" fill="${LIM.shirt}" stroke="${LIM.ink}" stroke-width="6" stroke-linejoin="round"/>`;
  for (let j = 1; j < 6; j++) { const a = P(-58, j * 32), b = P(58, j * 32); s_ += `<path d="M${n2(a[0])} ${n2(a[1])} L${n2(b[0])} ${n2(b[1])}" stroke="${LIM.check}" stroke-width="3" opacity=".35"/>`; }
  for (let i = -2; i <= 2; i++) { const a = P(i * 24, 4), b = P(i * 24, 182); s_ += `<path d="M${n2(a[0])} ${n2(a[1])} L${n2(b[0])} ${n2(b[1])}" stroke="#fff" stroke-width="3" opacity=".4"/>`; }
  const f1 = P(30, 30), f2 = P(10, 90), f3 = P(-30, 50), f4 = P(-40, 110); s_ += `<path d="M${n2(f1[0])} ${n2(f1[1])} Q${n2(f2[0])} ${n2(f2[1])} ${n2(f2[0] - 4)} ${n2(f2[1] + 20)} M${n2(f3[0])} ${n2(f3[1])} Q${n2(f4[0])} ${n2(f4[1])} ${n2(f4[0] + 6)} ${n2(f4[1] + 24)}" stroke="${LIM.shirt2}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  const c1 = P(38, 178), c2 = P(8, 196), c3 = P(52, 166); s_ += `<path d="M${n2(c1[0])} ${n2(c1[1])} L${n2(c2[0])} ${n2(c2[1])} L${n2(c3[0])} ${n2(c3[1])}" stroke="${LIM.ink}" stroke-width="5" fill="#fff"/>`;   // the collar
  return s_; }
// the side-view leg from the hip to a pedal p (thigh in the shorts, the shin, a sandal on the pedal); far = darker
function limLegSide(hip, p, far) { const ft = [p[0] + 4, p[1] - 12], kn = ik2(hip, ft, 205, 205, -1), m = [hip[0] + (kn[0] - hip[0]) * .78, hip[1] + (kn[1] - hip[1]) * .78];
  const sk = far ? LIM.skin2 : LIM.skin, sh = far ? LIM.shorts2 : LIM.shorts;
  return limbL([hip, kn], 50, sk) + limbL([kn, ft], 34, sk) + limbL([hip, m], 66, sh) + `<path d="M${n2(m[0] - 30)} ${n2(m[1] + 10)} L${n2(m[0] + 30)} ${n2(m[1] - 10)}" stroke="${LIM.ink}" stroke-width="5"/>`
    + `<path d="M${n2(ft[0] - 30)} ${n2(ft[1] + 14)} Q${n2(ft[0] - 30)} ${n2(ft[1] - 8)} ${n2(ft[0] + 2)} ${n2(ft[1] - 6)} Q${n2(ft[0] + 40)} ${n2(ft[1])} ${n2(ft[0] + 42)} ${n2(ft[1] + 14)}Z" fill="${far ? "#4E3424" : LIM.sandal}" stroke="${LIM.ink}" stroke-width="4"/>`; }

/* FACES: right */ function limRideV2(t, o = {}) { const cr = o.crank || 0, sip = o.sip || 0; let s = "";
  const hip = [RD.ST[0] + 4, RD.ST[1] - 26], sh = [hip[0] + 34, hip[1] - 186], nk = [sh[0] + 12, sh[1] - 16], grip = [RD.HT[0] - 112, RD.HT[1] - 70], bell = [RD.HT[0] - 46, RD.HT[1] - 96];
  const ped = (a) => V2.add(RD.BB, V2.pol(RD.crank, a));
  // behind the bike: the far leg, the far arm to the far grip
  s += limLegSide([hip[0] + 8, hip[1] + 4], ped(cr + Math.PI), true);
  { const g = [grip[0] - 6, grip[1] - 4], el = ik2([sh[0] - 12, sh[1] + 24], g, 150, 150, 1); s += limbL([[sh[0] - 12, sh[1] + 24], el, g], 26, LIM.skin2) + mittGrip(g[0], g[1], .95, true); }
  s += roadsterV2(t, { ...o, stand: o.stand === undefined ? false : o.stand, kopi: sip > 0 ? false : o.kopi });
  // the seat on the saddle (shorts), the torso, the near leg
  s += `<ellipse cx="${n2(hip[0] + 6)}" cy="${n2(hip[1] - 4)}" rx="70" ry="40" fill="${LIM.shorts}" stroke="${LIM.ink}" stroke-width="6"/>`;
  s += limTorsoSide(hip, sh);
  s += limLegSide(hip, ped(cr), false);
  const shA = [sh[0] - 6, sh[1] + 22]; let sipArm = "";
  // the near arm: to the grip (riding), to the bell (ringing), or lifting the kopi to his mouth (stopped)
  if (sip > 0) { const e = eio(clamp(sip / .7)), up = [nk[0] + 2, nk[1] + 88], hd = [lerp(grip[0], up[0], e), lerp(grip[1], up[1], e)], e0 = ik2(shA, grip, 150, 150, 1), el = [lerp(e0[0], shA[0] + 44, e), lerp(e0[1], shA[1] + 112, e)];   // the bag held round its middle, the straw to his mouth
    sipArm = limbL([shA, el, hd], 28, LIM.skin) + sleeveL(shA, el) + TF(hd[0], hd[1] + 10, 1.1, kopiBag(1, 1)) + mittGrip(hd[0], hd[1], .8); }   // drawn over the head (the straw at his lips)
  else { const g = o.ring ? bell : grip, el = ik2(shA, g, 150, 150, 1); s += limbL([shA, el, g], 28, LIM.skin) + sleeveL(shA, el) + mittGrip(g[0], g[1], 1); }
  s += limbL([[sh[0] - 4, sh[1] + 6], nk], 30, LIM.skin);   // the neck
  s += `<g transform="translate(${n2(nk[0] + 4)} ${n2(nk[1] + 16)}) rotate(4) scale(1.12)">${limHead({ look: .9, sip: sip > .75, blink: o.blink, smile: .8 })}</g>`;
  s += sipArm;
  return s; }

/* FACES: none (front view, he never travels in it) */ function limStand(t, o = {}) { const nod = o.nod || 0, sip = o.sip || 0, bob = 2 * Math.sin(t * 2.2); let s = "";
  s += `<ellipse cx="0" cy="4" rx="100" ry="14" fill="#2B2147" opacity=".22"/>`;
  // legs with knees, sandals
  for (const sx of [-1, 1]) { const hipL = [sx * 32, -150], kn = [sx * 34, -80], an = [sx * 33, -16];
    s += limbL([hipL, kn, an], 36, LIM.skin) + `<path d="M${sx * 34 - 10} -86 q10 6 20 0" stroke="${LIM.skin2}" stroke-width="4" fill="none"/>`
      + `<path d="M${sx * 33 - 30} 4 Q${sx * 33 - 30} -14 ${sx * 33} -16 Q${sx * 33 + 30} -14 ${sx * 33 + 30} 4z" fill="${LIM.sandal}" stroke="${LIM.ink}" stroke-width="4"/><path d="M${sx * 33 - 16} -10 h32" stroke="#3A2A22" stroke-width="6"/>`; }
  // khaki shorts with a hem and a fold
  s += `<path d="M-70 -262 L70 -262 L76 -136 L10 -128 L0 -150 L-10 -128 L-76 -136z" fill="${LIM.shorts}" stroke="${LIM.ink}" stroke-width="6" stroke-linejoin="round"/><path d="M-74 -150 L-12 -142 M74 -150 L12 -142 M-40 -250 q4 40 -4 80 M42 -250 q-2 40 6 80" stroke="${LIM.shorts2}" stroke-width="5" fill="none"/>`;
  s += `<g transform="translate(0 ${n2(bob)})">`;
  // the shirt: shoulders, a little belly, checks, the placket and buttons, folds, the collar
  s += `<path d="M-76 -418 Q-86 -330 -78 -256 Q0 -238 78 -256 Q86 -330 76 -418 Q0 -444 -76 -418z" fill="${LIM.shirt}" stroke="${LIM.ink}" stroke-width="6" stroke-linejoin="round"/>`;
  for (let i = -3; i <= 3; i++) s += `<path d="M${i * 22} -432 Q${i * 24} -340 ${i * 22} -252" stroke="#fff" stroke-width="3.5" opacity=".45" fill="none"/>`; for (let j = 0; j < 7; j++) s += `<path d="M-78 ${-404 + j * 24} Q0 ${-398 + j * 24} 78 ${-404 + j * 24}" stroke="${LIM.check}" stroke-width="3" opacity=".35" fill="none"/>`;
  s += `<path d="M-40 -300 q16 20 8 44 M44 -330 q-14 24 -4 50" stroke="${LIM.shirt2}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M0 -406 V-256" stroke="${LIM.shirt2}" stroke-width="4"/>` + [-370, -330, -290].map((y) => `<circle cx="6" cy="${y}" r="4" fill="#fff" stroke="${LIM.ink}" stroke-width="2"/>`).join("");
  s += `<path d="M-30 -430 L0 -396 L30 -430 L18 -440 L0 -420 L-18 -440z" fill="#fff" stroke="${LIM.ink}" stroke-width="5" stroke-linejoin="round"/>`;
  // arms: shoulder -> elbow -> wrist, a short sleeve, a mitten (or an open hand to wave); right = +x
  const arm = (sx, el, wr, hand) => { const shp = [sx * 70, -404]; return limbL([shp, el, wr], 26, LIM.skin) + sleeveL(shp, el, .6, 48) + hand; };
  const L_ = o.wave ? arm(-1, [-120, -470], [-118 + 8 * Math.sin(t * 9), -560], handL(-118 + 8 * Math.sin(t * 9), -556, 1.05, 0, -1)) : arm(-1, [-86, -320], [-88, -240], mittHang(-88, -238, 1, -1));
  const R_ = sip > 0 ? (() => { const e = eio(clamp(sip / .7)), hd = [lerp(88, -16, e), lerp(-240, -380, e)]; return arm(1, [lerp(86, 118, e), lerp(-320, -330, e)], hd, TF(hd[0], hd[1] + 12, .85, kopiBag(1, sip > .75 ? 1 : 0)) + mittGrip(hd[0], hd[1], .95)); })()
    : o.bag ? arm(1, [90, -320], [92, -242], TF(92, -170, .85, kopiBag(1)) + mittGrip(92, -236, .95)) : arm(1, [86, -320], [88, -240], mittHang(88, -238, 1, 1));
  s += limbL([[0, -436], [0, -424]], 40, LIM.skin);   // the neck
  s += L_ + (sip > 0 ? "" : R_);
  s += `<g transform="translate(0 -428) rotate(${n2(nod * 57)})">${limHead({ sip: sip > .75, smile: o.smile, laugh: o.laugh, blink: o.blink || (Math.floor(t * .3 + .4) !== Math.floor(t * .3 + .43)), helmet: o.helmet, look: o.look })}</g>`;
  if (sip > 0) s += R_;   // the sipping hand over his chin (the straw at his lips)
  s += `</g>`;
  return s; }

// head-on (towards the camera) and from behind: the same man, both hands on the grips (mittens), shirt with checks and folds, the seat on the saddle
function limArmsBars(front) { let s = ""; for (const sx of [-1, 1]) { const shp = [sx * 72, -600], g = front ? [sx * 200, -452] : [sx * 188, -394], el = ik2(shp, g, front ? 110 : 124, front ? 110 : 124, sx * (front ? -1 : 1)); s += limbL([shp, el, g], 28, LIM.skin) + sleeveL(shp, el, .55, 50) + mittGrip(g[0], g[1], 1.05); } return s; }
function limTorsoFront(back) { let s = `<path d="M-80 -620 Q-90 -520 -72 -418 Q0 -404 72 -418 Q90 -520 80 -620 Q0 -646 -80 -620z" fill="${LIM.shirt}" stroke="${LIM.ink}" stroke-width="6" stroke-linejoin="round"/>`;
  for (let i = -3; i <= 3; i++) s += `<path d="M${i * 22} -636 Q${i * 24} -520 ${i * 22} -414" stroke="#fff" stroke-width="3.5" opacity=".45" fill="none"/>`; for (let j = 0; j < 7; j++) s += `<path d="M-80 ${-604 + j * 28} Q0 ${-598 + j * 28} 80 ${-604 + j * 28}" stroke="${LIM.check}" stroke-width="3" opacity=".35" fill="none"/>`;
  s += `<path d="M-46 -500 q16 24 6 56 M48 -530 q-14 26 -4 56" stroke="${LIM.shirt2}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  if (!back) s += `<path d="M-30 -634 L0 -600 L30 -634 L18 -644 L0 -624 L-18 -644z" fill="#fff" stroke="${LIM.ink}" stroke-width="5" stroke-linejoin="round"/><path d="M0 -604 V-420" stroke="${LIM.shirt2}" stroke-width="4"/>`;
  else s += `<path d="M-40 -632 Q0 -622 40 -632" stroke="${LIM.shirt2}" stroke-width="6" fill="none"/>`;
  return s; }
/* FACES: camera */ function limFrontRideV2(t, o = {}) { const cr = o.crank || 0, R = 150; let s = "";
  s += `<rect x="-11" y="${-2 * R * .9}" width="22" height="${2 * R * .9}" rx="11" fill="#2E2F33" opacity=".85"/>`;
  // legs: thighs forward from the seat, knees out, shins down to the pedals (up and down, opposite), sandals on the pedals
  for (const [sx, a] of [[-1, cr], [1, cr + Math.PI]]) { const py = -112 + 78 * Math.sin(a), kn = [sx * 78, -270 + 30 * Math.sin(a)], hp = [sx * 40, -410], ft = [sx * 70, py - 6];
    s += limbL([hp, kn], 56, LIM.shorts) + limbL([kn, ft], 34, LIM.skin) + `<path d="M${n2(kn[0] - 26)} ${n2(kn[1] - 12)} l52 0" stroke="${LIM.ink}" stroke-width="5"/>` + `<path d="M${sx * 70 - 28} ${n2(py + 2)} h56 v12 h-56z" fill="${LIM.sandal}" stroke="${LIM.ink}" stroke-width="4"/>`; }
  s += `<rect x="-18" y="${-2 * R}" width="36" height="${2 * R}" rx="18" fill="#2E2F33"/><path d="M-24 ${-2 * R + 10} Q0 ${-2 * R - 16} 24 ${-2 * R + 10} V${-R} H-24z" fill="#16181C"/><circle cx="0" cy="${-R}" r="12" fill="#8C96A2" stroke="#2B2F36" stroke-width="3"/>`;
  s += `<path d="M-34 ${-R} Q-38 -250 -20 -330 M34 ${-R} Q38 -250 20 -330" stroke="#0E0F12" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M-34 ${-R} Q-38 -250 -20 -330 M34 ${-R} Q38 -250 20 -330" stroke="url(#rdFrame)" stroke-width="10" fill="none" stroke-linecap="round"/>`;
  s += `<ellipse cx="0" cy="-420" rx="86" ry="34" fill="${LIM.shorts}" stroke="${LIM.ink}" stroke-width="6"/>` + limTorsoFront(false);
  s += `<path d="M-200 -446 Q-100 -470 0 -460 Q100 -470 200 -446" stroke="#8C96A2" stroke-width="11" fill="none" stroke-linecap="round"/>` + TF(-140, -476, 1.15, bellP4(o.ring || 0, 0));
  s += limArmsBars(true);
  s += `<g transform="translate(0 -360)"><path d="M-110 -50 L110 -50 L96 60 L-96 60z" fill="#C99A5B" stroke="#7A5226" stroke-width="6" stroke-linejoin="round"/>${[0, 1, 2].map((i) => `<path d="M-106 ${-30 + i * 30} H106" stroke="#7A5226" stroke-width="3"/>`).join("")}${[...Array(8)].map((_, i) => `<path d="M${-96 + i * 27} -48 L${-86 + i * 24} 58" stroke="#A8783F" stroke-width="3"/>`).join("")}${o.kopi === false ? "" : TF(60, -40, .7, kopiBag(1))}</g>`;
  s += `<g transform="translate(0 -250)"><path d="M-30 0 h60 l-8 30 h-44z" fill="url(#chrome)" stroke="#2B2F36" stroke-width="3"/><ellipse cx="0" cy="6" rx="22" ry="10" fill="#FFF6C8"/></g>`;
  s += limbL([[0, -640], [0, -626]], 40, LIM.skin) + `<g transform="translate(0 -634)">${limHead({ blink: o.blink, sip: o.sip, smile: .8 })}</g>`;
  return s; }
/* FACES: away */ function limRearRideV2(t, o = {}) { const cr = o.crank || 0; let s = bikeRearV2(t, { crank: cr, col: "url(#rdFrame)", dark: "#0E0F12" });
  for (const [sx, a] of [[-1, cr], [1, cr + Math.PI]]) { const py = -100 + 70 * Math.sin(a), kn = [sx * 74, -250 + 26 * Math.sin(a)], hp = [sx * 38, -420], ft = [sx * 66, py - 4];
    s += limbL([hp, kn], 54, LIM.shorts) + limbL([kn, ft], 32, LIM.skin) + `<path d="M${sx * 66 - 24} ${n2(py)} h48 v12 h-48z" fill="${LIM.sandal}" stroke="${LIM.ink}" stroke-width="4"/>`; }
  s += `<ellipse cx="0" cy="-430" rx="84" ry="36" fill="${LIM.shorts}" stroke="${LIM.ink}" stroke-width="6"/>` + limTorsoFront(true) + limArmsBars(false);
  s += limbL([[0, -640], [0, -626]], 40, LIM.skin) + `<g transform="translate(0 -650)"><ellipse cx="0" cy="-60" rx="58" ry="62" fill="${SKINL}" stroke="${INKL}" stroke-width="5"/><ellipse cx="-56" cy="-56" rx="11" ry="16" fill="${SKINL}" stroke="${INKL}" stroke-width="4"/><ellipse cx="56" cy="-56" rx="11" ry="16" fill="${SKINL}" stroke="${INKL}" stroke-width="4"/><path d="M-60 -86 Q-62 -40 -40 -22 Q-20 -30 0 -26 Q20 -30 40 -22 Q62 -40 60 -86z" fill="#B8BCC4" stroke="#8D929B" stroke-width="3"/>${[-36, -18, 0, 18, 36].map((x) => `<path d="M${x} -80 q${x > 0 ? 4 : -4} 24 ${x > 0 ? 2 : -2} 46" stroke="#9EA3AC" stroke-width="3" fill="none"/>`).join("")}<path d="M-64 -82 Q-66 -150 0 -156 Q66 -150 64 -82 Q0 -70 -64 -82z" fill="url(#helmW)" stroke="${INKL}" stroke-width="5"/><path d="M-30 -150 Q-34 -118 -30 -84 M0 -156 V-72 M30 -150 Q34 -118 30 -84" stroke="#B9C3CF" stroke-width="7" fill="none"/><path d="M-58 -78 Q-56 -40 -36 -20 M58 -78 Q56 -40 36 -20" stroke="#3B4149" stroke-width="5" fill="none"/></g>`;
  return s; }
