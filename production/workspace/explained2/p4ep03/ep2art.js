// ep2art.js: P4 EP2 "Help! I'm Wilting!": the guests and the new props/sets (script ../p4/p4_ep02_script.md v2.1, sections 6b and 7).
// CHILLI (the teacher's paintings, 27 Nov 2026; ../characters/chilli/cut_chilli.py): two layers, the PLANT body by story state and the FACE by
//   emotion, one pot (rim 200 local units wide, the base centre at 0,0). CHILLI_PAINTED = false switches back to EP1's code drawing.
// GLITCH (the teacher's paintings: glitch_base + the four arm poses; ../characters/glitch/cut_glitch.py): layers (body, blank screen, wheels,
//   struts), his FACES drawn in code on the screen glass (the painted face is kept for "smug" and the painted happy face for "happy" while
//   he is silent), the wheels turn with the distance rolled, the antenna glows, the GLITCH stutter stays on his own body (<= 3 flashes/s).
P.chilli = "#E8743B"; P.glitch = "#2FA39C"; BNAME.chilli = "Chilli"; BNAME.glitch = "GLITCH";
const CHILLI_PAINTED = true;   // one line: false = EP1's code-drawn Chilli (chilliP4v2) everywhere
const INKG = "#1E2A3A";

/* ================================================================ CHILLI ================================================================ */
// the story state of the plant (the coordinator's two-layer rule, 27 Nov): wilting until the fix is done (the folding screen comes away);
// then the recovery time-lapse grows it wilt -> mid -> upright (green chillies) -> tall with ONE red chilli
function chilliBody(t) { const tF = MK("lapse"); if (!(tF > 0)) return "wilt"; if (t < tF) return "wilt"; if (t < tF + 1.0) return "wilt"; if (t < tF + 1.8) return "mid"; if (t < tF + 2.5) return "tallg"; return "tallr"; }
function chilliFaceBox(x, y, w, h) { return `<rect data-face="chilli" x="${n2(x)}" y="${n2(y)}" width="${n2(w)}" height="${n2(h)}" fill="none" stroke="none"/>`; }   // qa/face_cover_scan.js
const chilliBlink = (t) => { const per = 4.3, k = Math.floor((t + 1.7) / per), tb = k * per - 1.7 + hash(k, 7) * 1.6; return t >= tb && t < tb + .1; };
function chilliMouth(t) { const L = speaking("chilli", t); if (!L) return "closed"; const m = mouthOf("chilli", t); return m >= 2 ? "wide" : m >= 1 ? "half" : "closed"; }
// one painted sprite at local scale (rim 200 units), base centre at 0,0
function chilliUse(name, extra = "") { const S = SPR[name]; if (!S) return null; return `<g transform="scale(${S.scale}) translate(${-S.ax} ${-S.ay})"><use href="#s_${name}"/>${S.face ? chilliFaceBox(...S.face) : ""}</g>` + extra; }
function chilliSpriteName(body, face, t, o = {}) { let st = o.mouth || (o.talk === false ? "closed" : chilliMouth(t));
  const base = `chilli_${body}_${face}`; if (!SPR[`${base}_closed`]) return null;
  if (!SPR[`${base}_${st}`]) st = "closed"; const blink = o.blink === undefined ? chilliBlink(t) : o.blink; return SPR[`${base}_${st}_blink`] && blink ? `${base}_${st}_blink` : `${base}_${st}`; }
// the see-through window on the pot's LOWER half (under the face, which is never covered): soil, roots, the pool and the base; st: "rot" (brown
// mushy roots, a pool of water, NO hole) | "fixed" (fresh soil, firm white roots, three holes with drips) | "grow" (a new white root spreads, u)
const WIN = { y0: -47, y1: -5, x0: 71, x1: 47 };
function potWindow(t, k, st = "rot", u = 1) { if (k <= .01) return ""; const { y0, y1, x0, x1 } = WIN, cy = (y0 + y1) / 2, sx = 1, sy = k;
  const sh = `M${-x0} ${y0} L${x0} ${y0} L${x1} ${y1} L${-x1} ${y1}Z`, id = "pw" + st;
  let in_ = `<rect x="-90" y="${y0 - 2}" width="180" height="${y1 - y0 + 4}" fill="${st === "rot" ? "#3B2A20" : "#4A3524"}"/>`;
  for (let i = 0; i < 26; i++) in_ += `<circle cx="${n2(-70 + hash(i, 3) * 140)}" cy="${n2(y0 + 3 + hash(i, 5) * (y1 - y0 - 6))}" r="${n2(1.6 + hash(i, 9) * 2.4)}" fill="${st === "rot" ? "#2A1D15" : "#5B4330"}" opacity=".8"/>`;
  if (st === "rot") { in_ += `<rect x="-90" y="${y1 - 11}" width="180" height="11" fill="#3E7FB8" opacity=".85"/><path d="M-60 ${y1 - 10.5} H60" stroke="#BFE6F7" stroke-width="1.6" opacity=".8"/>`;   // the pool of water at the bottom
    for (const [x, c] of [[-24, -1], [4, 1], [26, -1]]) in_ += `<path d="M${x} ${y0} q${c * 8} 10 ${c * 2} 20 q${-c * 6} 8 ${c * 4} 14" stroke="#7A4E2A" stroke-width="3.6" fill="none" stroke-linecap="round"/><path d="M${x} ${y0} q${c * 8} 10 ${c * 2} 20" stroke="#5A3A1E" stroke-width="1.2" fill="none" opacity=".7"/>`;   // few, brown, soft roots
    in_ += [0, 1, 2].map((i) => `<path d="M${-30 + 30 * i} ${y0 + 8} q4 -6 0 -10 q-4 -5 0 -9" stroke="#8FAF4A" stroke-width="1.4" fill="none" opacity="${n2(.5 + .3 * Math.sin(t * 3 + i))}"/>`).join(""); }
  else { const rr = st === "grow" ? u : 1; for (const [x, c, l] of [[-28, -1, 1], [-8, 1, .9], [12, -1, 1], [30, 1, .8], [0, -1, rr]]) in_ += `<path d="M${x} ${y0} q${c * 9} ${12 * l} ${c * 3} ${24 * l} q${-c * 5} ${7 * l} ${c * 6} ${12 * l}" stroke="#F4EBD8" stroke-width="2.6" fill="none" stroke-linecap="round"/>`; }
  let s = `<clipPath id="${id}"><path d="${sh}"/></clipPath><g transform="translate(0 ${n2(cy)}) scale(${sx} ${n2(sy)}) translate(0 ${n2(-cy)})"><g clip-path="url(#${id})">${in_}</g><path d="${sh}" fill="none" stroke="${INKG}" stroke-width="3"/>`;
  if (st === "rot") s += `<path d="M${-x1 + 2} ${y1 - 1} H${x1 - 2}" stroke="#D9D1C2" stroke-width="2.4"/>`;
  else s += [-24, 0, 24].map((x) => `<rect x="${x - 4}" y="${y1 - 3}" width="8" height="5" fill="#0C0A08"/>`).join("");
  return s + `<path d="M${-x0 + 6} ${y0 + 3} L${-x0 + 20} ${y0 + 3}" stroke="#fff" stroke-width="2" opacity=".6"/></g>`; }
// chilliV3(t, o): o.face (droop, flat, alarmed, shy, tall, tall_happy, smug); o.body (wilt, mid, tallg, tallr; default: the story state);
// o.hop "a" | "b" (the hop frames: the teacher's landing frame and the air frame made from it); o.win (0..1) + o.winSt; o.sparkle (a time);
// o.wob (deg, a gentle wobble about the base); o.mix [body2, u] (the time-lapse growth dissolve); o.talk false; o.shadow false
/* FACES: none (a pot seen from the front; it hops with the pot leading, see chilliHopAt) */
function chilliV3(t, o = {}) {
  let s = o.shadow === false ? "" : `<ellipse cx="0" cy="3" rx="${o.hop === "b" ? 70 : 92}" ry="12" fill="#2B2147" opacity="${o.hop === "b" ? .14 : .22}"/>`;
  let pic = null;
  if (CHILLI_PAINTED) {
    if (o.hop) pic = chilliUse(o.hop === "b" ? "chilli_hop_b_closed" : (chilliBlink(t) && SPR.chilli_hop_a_closed_blink ? "chilli_hop_a_closed_blink" : "chilli_hop_a_closed"));
    else { const body = o.body || chilliBody(t), face = o.face || (body === "wilt" ? "droop" : body === "tallr" ? "tall" : "tall");
      const nm = chilliSpriteName(body, face, t, o) || chilliSpriteName(body, body === "wilt" ? "droop" : "tall", t, o) || chilliSpriteName(body, "tall", t, o) || chilliSpriteName(body, "shy", t, o);
      pic = nm ? chilliUse(nm) : null;
      if (pic && o.mix && o.mix[1] > 0) { const n2_ = chilliSpriteName(o.mix[0], face, t, o) || chilliSpriteName(o.mix[0], "tall", t, o) || chilliSpriteName(o.mix[0], "shy", t, o); if (n2_) pic = OP(1 - o.mix[1], pic) + OP(o.mix[1], chilliUse(n2_)); } } }
  if (!pic) pic = `<g transform="scale(1.04)">${chilliP4v2(t, { droop: o.body === "wilt" || (!o.body && chilliBody(t) === "wilt") ? .95 : 0, look: 0 })}</g>`;   // EP1's code drawing (stand-in)
  s += pic + (o.win ? potWindow(t, o.win, o.winSt || "rot", o.winU === undefined ? 1 : o.winU) : "");
  if (o.sparkle !== undefined && t >= o.sparkle && t < o.sparkle + .8) { const u = (t - o.sparkle) / .8, k = Math.sin(Math.PI * u); s += `<g transform="translate(-58 -118) scale(${n2(k * 1.3)}) rotate(${n2(u * 90)})"><path d="M0 -26 L6 -6 L26 0 L6 6 L0 26 L-6 6 L-26 0 L-6 -6Z" fill="#fff"/></g>`; }
  if (o.wob) s = `<g transform="rotate(${n2(o.wob)})">${s}</g>`;
  return s; }
// a hop path along the floor/desk: positions (x, y offset), the frame (b in the air, a on landing: squash and dust only on landing)
function chilliHopAt(t, t0, pts, d = .42) { const n = pts.length - 1, u = (t - t0) / d; if (u <= 0) return { x: pts[0][0], y: pts[0][1], fr: "a", land: false, dust: 0 };
  if (u >= n) return { x: pts[n][0], y: pts[n][1], fr: "a", land: true, dust: clamp(1 - (u - n) * d / .35), done: true };
  const i = Math.floor(u), f = u - i, [xa, ya] = pts[i], [xb, yb] = pts[i + 1], h = 70 + .3 * Math.max(0, ya - yb);
  const air = f > .12 && f < .9, y = lerp(ya, yb, f) - h * Math.sin(Math.PI * f), x = lerp(xa, xb, eio(f));
  return { x, y, fr: air ? "b" : "a", land: !air, dust: f < .12 ? 1 - f / .12 : 0, sq: f < .12 ? 1 - f / .12 : f > .9 ? (f - .9) / .1 : 0 }; }
const dustPuffs = (k) => k <= .01 ? "" : OP(k, [-1, 1].map((sd) => `<g transform="translate(${sd * 90} -8) scale(${n2(.7 + .5 * (1 - k))})"><circle r="16" fill="#E6E1D8"/><circle cx="${sd * 16}" cy="4" r="12" fill="#E6E1D8"/><circle cx="${sd * -10}" cy="6" r="10" fill="#E6E1D8"/></g>`).join(""));

/* ================================================================ GLITCH ================================================================ */
const GM = window.GLITCHM || null;
function glitchFaceBox(x, y, w, h) { return `<rect data-face="glitch" x="${n2(x)}" y="${n2(y)}" width="${n2(w)}" height="${n2(h)}" fill="none" stroke="none"/>`; }   // qa/face_cover_scan.js
// a code face on the screen (box x, y, w, h in the layer's px): the painting's line style (dark rounded strokes, white catch-lights)
function glitchFace(face, x, y, w, h, t, o = {}) { const cx = x + w / 2, ey = y + h * .44, dx = w * .22, er = w * .075, sw = w * .032, my = y + h * .7, mw = w * .2;
  const eye = (ex, kind) => { if (kind === "slit") return `<rect x="${n2(ex - er * 1.2)}" y="${n2(ey - er * .2)}" width="${n2(er * 2.4)}" height="${n2(er * .42)}" rx="${n2(er * .2)}" fill="${INKG}"/><circle cx="${n2(ex + er * .5)}" cy="${n2(ey - er * .02)}" r="${n2(er * .12)}" fill="#fff"/>`;
    if (kind === "arc") return `<path d="M${n2(ex - er)} ${n2(ey + er * .3)} Q${n2(ex)} ${n2(ey - er * 1.1)} ${n2(ex + er)} ${n2(ey + er * .3)}" stroke="${INKG}" stroke-width="${n2(sw)}" fill="none" stroke-linecap="round"/>`;
    if (kind === "spiral") { let d = ""; for (let i = 0; i <= 40; i++) { const a = i * .42 + t * 9, r = er * 1.1 * i / 40; d += `${i ? "L" : "M"}${n2(ex + r * Math.cos(a))} ${n2(ey + r * Math.sin(a))} `; } return `<path d="${d}" stroke="${INKG}" stroke-width="${n2(sw * .8)}" fill="none" stroke-linecap="round"/>`; }
    const big = kind === "big" ? 1.35 : 1, s_ = `<ellipse cx="${n2(ex)}" cy="${n2(ey)}" rx="${n2(er * big)}" ry="${n2(er * 1.15 * big)}" fill="${INKG}"/><circle cx="${n2(ex + er * .35 * big)}" cy="${n2(ey - er * .4 * big)}" r="${n2(er * .32 * big)}" fill="#fff"/><circle cx="${n2(ex - er * .3)}" cy="${n2(ey + er * .45)}" r="${n2(er * .12)}" fill="#fff"/>`;
    if (kind === "half") return s_ + `<path d="M${n2(ex - er * 1.3)} ${n2(ey - er * 1.4)} H${n2(ex + er * 1.3)} V${n2(ey - er * .15)} Q${n2(ex)} ${n2(ey - er * .45)} ${n2(ex - er * 1.3)} ${n2(ey - er * .15)}Z" fill="#CFEFE0"/><path d="M${n2(ex - er * 1.15)} ${n2(ey - er * .2)} Q${n2(ex)} ${n2(ey - er * .5)} ${n2(ex + er * 1.15)} ${n2(ey - er * .2)}" stroke="${INKG}" stroke-width="${n2(sw * .8)}" fill="none" stroke-linecap="round"/>`;
    if (kind === "grump") return s_ + `<path d="M${n2(ex - er * 1.3)} ${n2(ey - er * 1.5)} L${n2(ex + er * 1.3)} ${n2(ey - er * 1.5)} L${n2(ex + er * 1.3)} ${n2(ey - er * .1)} Z" fill="#CFEFE0" transform="${ex < cx ? "" : `translate(${n2(2 * ex)} 0) scale(-1 1)`}"/>`;
    return s_; };
  const brow = (ex, tilt) => `<path d="M${n2(ex - er * 1.1)} ${n2(ey - er * 1.9 + tilt * er)} Q${n2(ex)} ${n2(ey - er * 2.4)} ${n2(ex + er * 1.1)} ${n2(ey - er * 1.9 - tilt * er)}" stroke="${INKG}" stroke-width="${n2(sw * .85)}" fill="none" stroke-linecap="round"/>`;
  const talk = o.mouth || 0; let m = "";
  const openM = (op, wide = 1) => `<path d="M${n2(cx - mw * .5 * wide)} ${n2(my - op * .2)} Q${n2(cx)} ${n2(my + op * 1.2)} ${n2(cx + mw * .5 * wide)} ${n2(my - op * .2)} Q${n2(cx)} ${n2(my - op * .45)} ${n2(cx - mw * .5 * wide)} ${n2(my - op * .2)}Z" fill="#5A2230" stroke="${INKG}" stroke-width="${n2(sw * .8)}"/>`;
  let s = "";
  if (face === "smug") { s = eye(cx - dx, "half") + eye(cx + dx, "half") + brow(cx - dx, 0) + brow(cx + dx, .5); m = talk ? openM(w * .03 * (talk + 1)) : `<path d="M${n2(cx - mw * .45)} ${n2(my)} Q${n2(cx)} ${n2(my + h * .07)} ${n2(cx + mw * .5)} ${n2(my - h * .03)}" stroke="${INKG}" stroke-width="${n2(sw)}" fill="none" stroke-linecap="round"/>`; }
  else if (face === "happy") { s = eye(cx - dx, "arc") + eye(cx + dx, "arc"); m = openM(w * (.07 + .02 * talk), 1.2) + `<ellipse cx="${n2(cx)}" cy="${n2(my + w * .045)}" rx="${n2(mw * .22)}" ry="${n2(w * .02)}" fill="#F08A9A"/>`; }
  else if (face === "error") { s = eye(cx - dx, "spiral") + eye(cx + dx, "spiral") + T(x + w * .86, y + h * .26, "?", w * .16, INKG); m = `<path d="M${n2(cx - mw * .5)} ${n2(my)} q${n2(mw * .125)} ${n2(-h * .04)} ${n2(mw * .25)} 0 t${n2(mw * .25)} 0 t${n2(mw * .25)} 0 t${n2(mw * .25)} 0" stroke="${INKG}" stroke-width="${n2(sw * .8)}" fill="none" stroke-linecap="round"/>`; if (talk) m = openM(w * .03 * (talk + 1), .8); }
  else if (face === "surprised") { s = eye(cx - dx, "big") + eye(cx + dx, "big") + brow(cx - dx, -.2) + brow(cx + dx, .2); m = `<ellipse cx="${n2(cx)}" cy="${n2(my + h * .02)}" rx="${n2(mw * .18)}" ry="${n2(h * .05 * (1 + .3 * talk))}" fill="#5A2230" stroke="${INKG}" stroke-width="${n2(sw * .8)}"/>`; }
  else if (face === "grumpy") { s = eye(cx - dx, "grump") + eye(cx + dx, "grump") + `<path d="M${n2(cx - dx - er * 1.2)} ${n2(ey - er * 2)} L${n2(cx - dx + er * 1.1)} ${n2(ey - er * 1.3)} M${n2(cx + dx + er * 1.2)} ${n2(ey - er * 2)} L${n2(cx + dx - er * 1.1)} ${n2(ey - er * 1.3)}" stroke="${INKG}" stroke-width="${n2(sw)}" stroke-linecap="round"/>`; m = talk ? openM(w * .025 * (talk + 1), .8) : `<path d="M${n2(cx - mw * .4)} ${n2(my + h * .03)} Q${n2(cx)} ${n2(my - h * .05)} ${n2(cx + mw * .4)} ${n2(my + h * .03)}" stroke="${INKG}" stroke-width="${n2(sw)}" fill="none" stroke-linecap="round"/>`; }
  else if (face === "acquired" || face === "narrow") { s = eye(cx - dx, "slit") + eye(cx + dx, "slit"); m = talk ? `<rect x="${n2(cx - mw * .3)}" y="${n2(my - h * .012 * (1 + talk))}" width="${n2(mw * .6)}" height="${n2(h * .024 * (1 + talk))}" rx="${n2(h * .01)}" fill="${INKG}"/>` : `<path d="M${n2(cx - mw * .28)} ${n2(my)} H${n2(cx + mw * .28)}" stroke="${INKG}" stroke-width="${n2(sw * .8)}" stroke-linecap="round"/>`; }
  else if (face === "brb") { s = eye(cx - dx, "arc") + eye(cx + dx, "arc") + T(cx, y + h * .26, "BRB", w * .13, INKG); m = `<path d="M${n2(cx - mw * .35)} ${n2(my)} Q${n2(cx)} ${n2(my + h * .06)} ${n2(cx + mw * .35)} ${n2(my)}" stroke="${INKG}" stroke-width="${n2(sw)}" fill="none" stroke-linecap="round"/>`; }
  else { s = eye(cx - dx) + eye(cx + dx); m = talk ? openM(w * .03 * (talk + 1)) : `<path d="M${n2(cx - mw * .45)} ${n2(my)} Q${n2(cx)} ${n2(my + h * .07)} ${n2(cx + mw * .45)} ${n2(my)}" stroke="${INKG}" stroke-width="${n2(sw)}" fill="none" stroke-linecap="round"/>`; }
  return s + m; }
const glitchMouth = (t) => { const L = speaking("glitch", t); if (!L) return 0; return mouthOf("glitch", t); };
// glitchV3(t, o): o.pose base | jug | crossed | up | down; o.face (smug, happy, error, surprised, grumpy, acquired, narrow, brb, plain);
// o.roll (distance rolled, local units: the wheels turn); o.stutter [t0, t1] (the GLITCH: band offsets + silver/teal/white tint, on his own
// body only, <= 3 flashes a second); o.dim (0..1 the screen glow lower); o.scr (extra svg on the screen, in screen-unit coords 0..1);
// o.mirror (the caller mirrors him: screen text is drawn mirrored back). Units: the base painting's px; origin: screen centre x, the ground.
/* FACES: right (painted in a 3/4 view facing the picture's right; travelling left he is mirrored with a negative x scale only) */
function glitchV3(t, o = {}) { if (!GM) return "";
  const pose = o.pose || "base", P_ = pose === "base" ? null : GM.poses[pose], pre = pose === "base" ? "glitch_" : `glitch_${pose}_`;
  const sc = P_ ? P_.scale : 1, ox = P_ ? P_.ox : GM.cx, oy = P_ ? P_.oy : GM.ground, scr = P_ ? P_.screen : GM.screen;
  const talk = o.talk === false ? 0 : glitchMouth(t), face = o.face || "smug";
  const painted = !talk && ((face === "smug" && ["base", "jug", "crossed"].includes(pose)) || (face === "happy" && ["up", "down"].includes(pose)));
  const wheels = P_ ? P_.wheels.map((w, i) => ({ ...w, k: i ? "B" : "F" })) : [{ ...GM.wheelF, k: "F" }, { ...GM.wheelB, k: "B" }];
  const ang = (o.roll || 0) / 40 * 180 / Math.PI;
  let L = `<use href="#s_${pre}body"/>` + (pose === "base" ? `<use href="#s_glitch_armL"/><use href="#s_glitch_armR"/>` : "");
  for (const w of wheels) { const r = w.ry / w.rx; L += `<g transform="translate(${w.cx} ${w.cy}) scale(1 ${n2(r)}) rotate(${n2(ang)}) scale(1 ${n2(1 / r)}) translate(${-w.cx} ${-w.cy})"><use href="#s_${pre}wheel${w.k}"/></g>`;
    if (SPR[`${pre}strut${w.k}`]) L += `<use href="#s_${pre}strut${w.k}"/>`; }
  if (pose === "base") L += `<use href="#s_glitch_hubF"/>`;
  // the screen: the blank glass + a code face (or the painted face, kept), a soft glow, extra content
  const gl = 1 - (o.dim || 0) * .6;
  let S = "";
  if (!painted) S += `<use href="#s_${pre}screen"/>` + `<g>${o.mirror && typeof unflipText === "function" ? unflipText(glitchFace(face, scr.x, scr.y, scr.w, scr.h, t, { mouth: talk })) : glitchFace(face, scr.x, scr.y, scr.w, scr.h, t, { mouth: talk })}</g>`   /* P4 EP3 v2: his "?" never reads mirrored */;
  S += `<rect x="${scr.x + 6}" y="${scr.y + 6}" width="${scr.w - 12}" height="${scr.h - 12}" rx="30" fill="#E8FFD8" opacity="${n2(.08 * gl)}"/>`;
  if (o.dim) S += `<rect x="${scr.x}" y="${scr.y}" width="${scr.w}" height="${scr.h}" rx="34" fill="#0B1A2A" opacity="${n2(o.dim * .35)}"/>`;
  if (o.scr) S += `<g transform="translate(${scr.x} ${scr.y}) scale(${scr.w} ${scr.h})${o.mirror ? " translate(.5 0) scale(-1 1) translate(-.5 0)" : ""}">${o.scr}</g>`;
  L += S + glitchFaceBox(scr.x, scr.y, scr.w, scr.h);
  // the GLITCH stutter (his signature): horizontal bands of his own picture jump sideways; silver / teal / white tints in at most 3 windows a second
  if (o.stutter && t >= o.stutter[0] && t < o.stutter[1]) { const fr = Math.floor(t * 30), u = t - o.stutter[0], bh = (P_ ? P_.h : GM.h) / 7, id = "gs" + pose + fr;
    const flashOn = [[0, .1], [.34, .43], [.68, .77]].some(([a, b]) => (u % 1) >= a && (u % 1) < b);
    let bands = `<defs>${[...Array(7)].map((_, i) => `<clipPath id="${id}b${i}"><rect x="-200" y="${n2(i * bh)}" width="2000" height="${n2(bh + .5)}"/></clipPath>`).join("")}<filter id="${id}f"><feColorMatrix type="matrix" values="0 0 0 0 ${["0.85", "0.18", "1"][fr % 3]} 0 0 0 0 ${["0.9", "0.72", "1"][fr % 3]} 0 0 0 0 ${["0.95", "0.7", "1"][fr % 3]} 0 0 0 1 0"/></filter></defs>`;
    for (let i = 0; i < 7; i++) { const off = (hash(fr * 7 + i, 13) - .5) * 60 * (hash(fr + i, 3) > .45 ? 1 : 0); bands += `<g clip-path="url(#${id}b${i})"><g transform="translate(${n2(off)} 0)">${L}</g></g>`;
      if (flashOn && hash(fr * 3 + i, 17) > .55) bands += `<g clip-path="url(#${id}b${i})" opacity=".55"><g transform="translate(${n2(off + 10)} 0)" filter="url(#${id}f)">${L}</g></g>`; }
    L = bands; }
  // the antenna's soft glow (it pulses gently; steady and brighter in the sting)
  const b = GM.bulb; let glow = "";
  if (pose === "base") glow = `<circle cx="${b.x}" cy="${b.y}" r="70" fill="url(#glGlow)" opacity="${n2((o.glow === undefined ? .75 + .2 * Math.sin(t * 3) : o.glow) * gl)}"/>`;
  else { const bx = P_.ox + (b.x - GM.cx) * 0 , by_ = 0; glow = ""; }
  const pre2 = `<defs><radialGradient id="glGlow"><stop offset="0" stop-color="#FFF6B0" stop-opacity=".95"/><stop offset=".4" stop-color="#FFE27A" stop-opacity=".45"/><stop offset="1" stop-color="#FFE27A" stop-opacity="0"/></radialGradient></defs>`;
  const shadow = o.shadow === false ? "" : `<ellipse cx="0" cy="2" rx="190" ry="20" fill="#2B2147" opacity=".22"/>`;
  return pre2 + shadow + `<g transform="scale(${sc}) translate(${-ox} ${-oy})">${L}${pose === "base" ? glow : glitchPoseGlow(t, pose, o, gl)}</g>`; }
// the antenna bulb of the sheet poses: found once from the painting (the yellow disc near the top), glow drawn there
function glitchPoseGlow(t, pose, o, gl) { const P_ = GM.poses[pose]; const bx = P_.bulb ? P_.bulb.x : P_.ox, by = P_.bulb ? P_.bulb.y : 22, r = P_.bulb ? P_.bulb.r : 12;
  return `<circle cx="${bx}" cy="${by}" r="${n2(70 / P_.scale)}" fill="url(#glGlow)" opacity="${n2((o.glow === undefined ? .75 + .2 * Math.sin(t * 3) : o.glow) * gl)}"/>`; }
// the screen-content helpers (unit square, 0..1 = the screen box)
const scrClock = (txt = "07:00") => `<rect x=".06" y=".06" width=".34" height=".16" rx=".04" fill="#0E3A3A" opacity=".85"/><text x=".23" y=".185" font-family="Fredoka" font-weight="700" font-size=".11" text-anchor="middle" fill="#9FFFE0">${txt}</text>`
  + `<g transform="translate(.82 .14) scale(.0016)"><path d="M-40 -30 h60 q20 0 20 20 v40 h-80z M20 -10 l40 -20" fill="#7FC6E8" stroke="#0E3A3A" stroke-width="10"/></g>`;
const scrBar = (u, txt = "UPDATING...") => `<rect x=".1" y=".8" width=".8" height=".1" rx=".05" fill="#0E3A3A" opacity=".85"/><rect x=".12" y=".82" width="${n2(.76 * clamp(u))}" height=".06" rx=".03" fill="#3FE0B0"/>`
  + `<text x=".5" y=".765" font-family="Fredoka" font-weight="700" font-size=".07" text-anchor="middle" fill="#0E3A3A">${u >= 1 ? "100%" : txt}</text>`;
const scrScan = (u) => `<rect x=".08" y="${n2(.1 + .78 * (u % 1))}" width=".84" height=".03" fill="#3FE0B0" opacity=".7"/><text x=".5" y=".95" font-family="Fredoka" font-weight="700" font-size=".07" text-anchor="middle" fill="#0E3A3A">SCANNING...</text>`;

/* ================================================================ the chest display: GLITCH's evidence / knowledge-log panel ================================================================ */
// a second, LOWER screen that slides out of his chest panel on a short arm, beside him (never over a face): the evidence pictures one at a
// time (each held), then the KNOWLEDGE LOG folder (the card slides in; the entry counter ticks 0 -> 1)
function chestPanel(t, k, inner, o = {}) { if (k <= .01) return ""; const W = o.w || 560, H = o.h || 380;
  return TF(0, 0, k, `<path d="M${-W / 2 - 60} ${H * .1} L${-W / 2} ${H * .1}" stroke="#8C96A2" stroke-width="16" stroke-linecap="round"/><g filter="url(#drop)"><rect x="${-W / 2 - 16}" y="${-H / 2 - 16}" width="${W + 32}" height="${H + 32}" rx="34" fill="#BFD0CF" stroke="${INKG}" stroke-width="8"/></g>`
    + `<rect x="${-W / 2}" y="${-H / 2}" width="${W}" height="${H}" rx="22" fill="#DDF5EC" stroke="${INKG}" stroke-width="5"/><clipPath id="cpn${W}"><rect x="${-W / 2}" y="${-H / 2}" width="${W}" height="${H}" rx="22"/></clipPath><g clip-path="url(#cpn${W})">${inner}</g>`
    + `<path d="M${-W / 2 + 20} ${-H / 2 + 14} h${W * .3}" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".6"/>`); }
const evRoots = () => `<g transform="scale(1.33 1.27)"><rect x="-210" y="-150" width="420" height="300" fill="#3B2A20"/>` + [[-90, -1], [-20, 1], [60, -1]].map(([x, c]) => `<path d="M${x} -150 q${c * 40} 60 ${c * 10} 120 q${-c * 30} 40 ${c * 20} 70" stroke="#7A4E2A" stroke-width="18" fill="none" stroke-linecap="round"/>`).join("") + `<path d="M-160 -100 q10 -20 0 -40 M100 -90 q10 -20 0 -40" stroke="#8FAF4A" stroke-width="6" fill="none"/></g>`;
const evPool = () => `<g transform="scale(1.33 1.27)"><rect x="-210" y="-150" width="420" height="300" fill="#3B2A20"/><rect x="-210" y="40" width="420" height="110" fill="#3E7FB8"/><path d="M-200 44 H200" stroke="#BFE6F7" stroke-width="6"/>` + [[-120, 90], [0, 110], [110, 80]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="none" stroke="#BFE6F7" stroke-width="3"/>`).join("") + `</g>`;
const evNoHole = () => `<g transform="scale(1.33 1.27)"><rect x="-210" y="-150" width="420" height="300" fill="#E8F3FF"/><path d="M-170 -60 L170 -60 L130 80 L-130 80Z" fill="#E8743B" stroke="${INKG}" stroke-width="8"/><path d="M-130 80 H130" stroke="${INKG}" stroke-width="12"/><circle cx="0" cy="96" r="44" fill="none" stroke="#E5484D" stroke-width="10"/><path d="M-30 66 L30 126" stroke="#E5484D" stroke-width="10"/></g>`;
function logCard(t, u, cnt) { const fy = lerp(-60, -8, eio(clamp(u))); return `<rect x="-280" y="-190" width="560" height="380" fill="#DDF5EC"/>` + T(0, -146, "KNOWLEDGE LOG", 44, INKG, { ls: 2 })
  + `<path d="M-230 -100 h150 l26 26 h284 v230 h-460z" fill="#F4C76B" stroke="${INKG}" stroke-width="6"/>` + `<g transform="translate(0 ${n2(fy)})"><rect x="-226" y="-82" width="452" height="170" rx="12" fill="#fff" stroke="${INKG}" stroke-width="5"/>${T(0, -34, "ROOTS NEED AIR", 42, INKG)}${T(0, 18, "DRAINAGE HOLES:", 40, INKG)}${T(0, 66, "REQUIRED", 40, INKG)}</g>`
  + `<path d="M-230 104 h460 v52 h-460z" fill="#E9B04F" stroke="${INKG}" stroke-width="6"/>` + tpill(0, 130, `ENTRY ${cnt}`, 40, INKG, "#9FFFE0", { w: 700 }); }

/* ================================================================ props ================================================================ */
// the Science Help Desk (EP1's outro desk, bigger): a folding table, the chrome desk bell, the sign in THREE handwritings (Basil teal big,
// Pip purple small, Momo coral); o.cross (0..1 FAST crossed out), o.proper (0..1 PROPERLY written in teal above it), o.ding (0..1 bell press)
// local: the table top's centre at 0,0, width 600; the sign stands at the left part of the desk, the bell at the right end
function helpSign(o = {}) { const cr = o.cross || 0, pr = o.proper || 0;
  let s = `<g filter="url(#dropS)"><rect x="-170" y="-126" width="340" height="168" rx="12" fill="#FFF8EA" stroke="${P.ink}" stroke-width="5"/></g>`
    + T(0, -94, "SCIENCE HELP DESK", 22, P.ink, { ls: 2 })
    + `<g transform="rotate(-2)">${T(-4, -50, "ALL PROBLEMS", 34, "#0F9E8E", { w: 700 })}${T(-38, -8, "FIXED", 34, "#0F9E8E", { w: 700 })}${T(66, -8, "FAST!", 34, "#0F9E8E", { w: 700 })}</g>`
    + `<g transform="translate(-60 24) rotate(3) skewX(-12)">${T(0, 0, "(carefully)", 22, "#7C3AED", { w: 500 })}</g><g transform="translate(78 26) rotate(-5)">${T(0, 0, "(but WHY?)", 23, "#F0533F", { w: 600 })}</g>`;
  if (cr > 0) s += `<path d="M28 -18 L${n2(28 + 82 * clamp(cr))} ${n2(-18 + 8 * clamp(cr))}" stroke="#0F9E8E" stroke-width="7" stroke-linecap="round"/><path d="M28 -6 L${n2(28 + 82 * clamp(cr * 1.4 - .4))} ${n2(-6 - 6 * clamp(cr * 1.4 - .4))}" stroke="#0F9E8E" stroke-width="6" stroke-linecap="round" opacity="${cr > .3 ? 1 : 0}"/>`;
  if (pr > 0) { const cl = `prc${Math.round(pr * 100)}`; s += `<clipPath id="${cl}"><rect x="10" y="-46" width="${n2(140 * clamp(pr))}" height="30"/></clipPath><g clip-path="url(#${cl})"><g transform="translate(78 -24) rotate(-6)">${T(0, 0, "PROPERLY", 24, "#0F9E8E", { w: 700 })}</g></g>`; }
  return s; }
function deskV3(t, o = {}) { const ding = o.ding || 0;
  return `<rect x="-300" y="0" width="600" height="28" rx="7" fill="url(#deskTop)" stroke="#A39B8C" stroke-width="4"/>`
    + (o.skirt === false ? `<path d="M-270 28 L-292 190 M270 28 L292 190 M-250 120 H250" stroke="#8C96A2" stroke-width="10"/>` : `<path d="M-300 26 H300 L292 190 H-292Z" fill="#2E8C85" stroke="${P.ink}" stroke-width="5"/><path d="M-292 172 H292" stroke="#5CC2B8" stroke-width="8"/>`)
    + `<g transform="translate(232 0)"><rect x="-38" y="-12" width="76" height="14" rx="5" fill="#59616B"/><path d="M-29 -12 Q-29 -46 0 -46 Q29 -46 29 -12z" fill="url(#chrome)" stroke="#2B2F36" stroke-width="3"/><rect x="-4.5" y="${n2(-60 + 7 * ding)}" width="9" height="14" rx="3" fill="#2B2F36"/></g>`
    + (o.noSign || o.skirt === false ? "" : `<g transform="translate(0 112) scale(.92)">${helpSign(o)}</g>`); }   // the sign hangs on the desk's cloth: never in front of anyone behind the desk
// a green watering can (FACES: right, the spout leads); o.tilt (deg), o.pour (0..1 stream), o.cap (the spout cap pops off: blooper)
/* FACES: right */ function canV3(t, o = {}) { const tl = o.tilt || 0;
  let s = `<g transform="rotate(${n2(tl)})"><path d="M-70 -90 Q-70 -110 -50 -110 H40 Q60 -110 60 -90 V0 H-70z" fill="#3FA35B" stroke="${P.ink}" stroke-width="6"/><path d="M-50 -110 Q-10 -170 30 -110" stroke="${P.ink}" stroke-width="12" fill="none"/>`
    + `<path d="M55 -40 L150 -110 L160 -98 L66 -24z" fill="#3FA35B" stroke="${P.ink}" stroke-width="6"/>` + (o.cap ? "" : `<g transform="translate(156 -106) rotate(-36)"><rect x="-10" y="-22" width="22" height="44" rx="6" fill="#2F8A49" stroke="${P.ink}" stroke-width="5"/></g>`)
    + `<path d="M-60 -74 H50" stroke="#fff" stroke-width="5" opacity=".35"/></g>`;
  return s; }
// a falling stream from the spout tip at (x0,y0) to (x1,y1), wobbling; k = flow
const streamV3 = (t, x0, y0, x1, y1, k, w = 16) => k <= .02 ? "" : `<path d="M${x0} ${y0} Q${n2((x0 + x1) / 2 + 20 * Math.sin(t * 9))} ${n2(y0 + 10)} ${x1} ${y1}" stroke="#5CB8F0" stroke-width="${n2(w * k)}" fill="none" stroke-linecap="round" opacity=".9"/><path d="M${x0} ${y0} Q${n2((x0 + x1) / 2 + 20 * Math.sin(t * 9))} ${n2(y0 + 10)} ${x1} ${y1}" stroke="#BFE6F7" stroke-width="${n2(w * k * .3)}" fill="none" stroke-linecap="round"/>`;
// Pip's purple lunchbox (open), the four neat curry-puff quarters (on the soil, by the scene)
const lunchboxV3 = (o = {}) => `<rect x="-80" y="-44" width="160" height="56" rx="12" fill="#8B5CF6" stroke="${P.ink}" stroke-width="5"/><rect x="-70" y="-36" width="140" height="38" rx="8" fill="#F1E9FF"/>`
  + (o.empty ? (o.feather ? `<g transform="translate(0 -20) rotate(70)">${featherV2(.7)}</g>` : "") : [-45, -15, 15, 45].map((x) => puffQ(x, -18, .7)).join("")) + `<path d="M-80 -44 L-90 -110 L70 -110 L80 -44" fill="#A78BFA" stroke="${P.ink}" stroke-width="5" opacity=".95"/>`;
const puffQ = (x, y, k = 1) => `<g transform="translate(${x} ${y}) scale(${k})"><path d="M-16 8 Q-18 -14 0 -16 Q18 -14 16 8z" fill="#E8B45A" stroke="#9A6A22" stroke-width="3"/><path d="M-10 -6 l4 4 M-2 -10 l4 4 M6 -6 l4 4" stroke="#9A6A22" stroke-width="2"/></g>`;
const tweezersV3 = () => `<path d="M0 0 L70 -8 M0 0 L70 6" stroke="#B9C1CB" stroke-width="6" stroke-linecap="round"/><circle r="6" fill="#8C96A2"/>`;
const towelV3 = () => `<path d="M-40 -10 Q0 -20 40 -10 L36 50 Q0 42 -36 50z" fill="#7FD3E8" stroke="${P.ink}" stroke-width="4"/><path d="M-36 30 Q0 22 36 30" stroke="#fff" stroke-width="4" opacity=".7"/>`;
// the folding screen (three panels, a wooden frame, cream cloth): hides the desk while the adult works; k = 0..1 unfolded
function foldScreenV3(k) { if (k <= .01) return ""; const W = 260 * k; let s = "";
  for (let i = -1; i <= 1; i++) { const x = i * W, sk = i ? (i < 0 ? 8 : -8) * k : 0; s += `<g transform="translate(${n2(x)} 0) skewY(${n2(sk)})"><rect x="${n2(-W / 2)}" y="-420" width="${n2(W)}" height="420" fill="#F4E6CC" stroke="#8A6A3E" stroke-width="12"/><path d="M${n2(-W / 2 + 20)} -380 V-40 M${n2(W / 2 - 20)} -380 V-40" stroke="#E2CFA8" stroke-width="5"/></g>`; }
  return `<g filter="url(#dropS)">${s}</g>`; }
const drillV3 = () => `<path d="M-40 -20 H50 V20 H-40z" fill="#F2A93B" stroke="${P.ink}" stroke-width="5"/><path d="M-10 20 L-20 80 H10 L18 20" fill="#3A3F48" stroke="${P.ink}" stroke-width="5"/><path d="M50 -4 H100" stroke="#B9C1CB" stroke-width="8"/><path d="M60 -10 l6 12 l6 -12 l6 12 l6 -12 l6 12" stroke="#59616B" stroke-width="3" fill="none"/>`;
const scissorsV3 = () => `<circle cx="-40" cy="-16" r="18" fill="none" stroke="#E5484D" stroke-width="9"/><circle cx="-40" cy="20" r="18" fill="none" stroke="#E5484D" stroke-width="9"/><path d="M-24 -10 L70 12 M-24 14 L70 -8" stroke="#B9C1CB" stroke-width="9" stroke-linecap="round"/><circle cx="14" cy="2" r="5" fill="#59616B"/>`;
const saucerV3 = (k = 1) => `<ellipse cx="0" cy="-4" rx="${120 * k}" ry="${18 * k}" fill="#D9672E" stroke="${INKG}" stroke-width="5"/><ellipse cx="0" cy="-10" rx="${100 * k}" ry="${11 * k}" fill="#B8521F"/>`;
// the stethoscope (Momo's, round her neck in the look-closer: a small cute touch drawn with her)
const stethV3 = () => `<path d="M-36 -10 Q-40 40 0 50 Q40 40 36 -10" stroke="#3A3F48" stroke-width="6" fill="none"/><circle cx="0" cy="58" r="12" fill="#B9C1CB" stroke="#3A3F48" stroke-width="4"/>`;
// the charging dock (a low teal pad, a cable to the wall)
const dockV3 = (glow = 1) => `<ellipse cx="0" cy="6" rx="260" ry="30" fill="#0A1420" opacity=".5"/><rect x="-230" y="-26" width="460" height="40" rx="20" fill="#2C6E6A" stroke="#0E2A2A" stroke-width="6"/><rect x="-200" y="-22" width="400" height="10" rx="5" fill="#59E0C8" opacity="${n2(.35 + .3 * glow)}"/><path d="M230 -6 Q330 -6 340 -120 T420 -300" stroke="#1C2A33" stroke-width="12" fill="none"/>`;
// the mystery leaf (a hibiscus leaf: oval, pointed tip, toothed edge, net veins, a leaf stalk) — clearly NOT a chilli leaf
function hibiscusLeaf() { let edge = ""; const N = 22; for (let i = 0; i <= N; i++) { const a = Math.PI * i / N, r = 1 + (i % 2 ? .06 : 0), x = 150 * Math.cos(a) * -1, y = -95 * Math.sin(a) * r; edge += `${i ? "L" : "M"}${n2(x * (1 - .25 * (1 - Math.sin(a))))} ${n2(y)} `; }
  let low = ""; for (let i = N; i >= 0; i--) { const a = Math.PI * i / N, r = 1 + (i % 2 ? .06 : 0), x = 150 * Math.cos(a) * -1, y = 85 * Math.sin(a) * r; low += `L${n2(x * (1 - .25 * (1 - Math.sin(a))))} ${n2(y)} `; }
  return `<path d="M-150 0 L-210 6" stroke="#4F8A2E" stroke-width="8" stroke-linecap="round"/><path d="${edge}L170 0 ${low}Z" fill="#4FA23A" stroke="#2F6A1E" stroke-width="5"/><path d="M-150 0 L160 0" stroke="#2F6A1E" stroke-width="4"/>`
    + [-90, -30, 30, 90].map((x) => `<path d="M${x} 0 L${x + 50} -60 M${x} 0 L${x + 50} 56" stroke="#2F6A1E" stroke-width="2.5" opacity=".8"/>`).join(""); }
// the evidence-recap thumbnails of the Mark Sentence card
const recapThumb = (t, kind) => kind === "over" ? `<g transform="scale(.42)">${chilliV3(t, { body: "wilt", face: "droop", talk: false, shadow: false })}</g><path d="M-40 -64 q-8 30 -2 60" stroke="#5CB8F0" stroke-width="8" fill="none"/>`
  : kind === "roots" ? `<g transform="scale(.9) translate(0 26)">${potWindow(t, 1, "rot")}</g>` : `<g transform="scale(.36)">${chilliV3(t, { body: "tallr", face: "tall_happy", talk: false, shadow: false })}</g>`;

/* ================================================================ the cut-away (x602): wet soil vs healthy soil, side by side ================================================================ */
function cutawayV3(t, u, o = {}) { const pot = (wet, sc) => { let s = `<path d="M-170 -230 L170 -230 L130 120 L-130 120z" fill="#7A5A3F" stroke="${INKG}" stroke-width="8"/>`, gr = "";
    for (let i = 0; i < 30; i++) { const x = -130 + (i % 6) * 52 + (Math.floor(i / 6) % 2) * 26, y = -190 + Math.floor(i / 6) * 60; if (Math.abs(x) > 150 - (y + 230) * .12) continue; gr += `<circle cx="${x}" cy="${y}" r="24" fill="#A07A52" stroke="#6E4E2E" stroke-width="3"/>`; }
    s += `<clipPath id="cw${wet ? 1 : 0}"><path d="M-160 -222 L160 -222 L124 112 L-124 112z"/></clipPath><g clip-path="url(#cw${wet ? 1 : 0})">` + (wet ? `<rect x="-200" y="-230" width="400" height="360" fill="#3E7FB8" opacity=".9"/>` : `<rect x="-200" y="-230" width="400" height="360" fill="#F5F1E8"/>`)
      + (wet ? "" : [...Array(30)].map((_, i) => `<circle cx="${-130 + (i % 6) * 52 + (Math.floor(i / 6) % 2) * 26}" cy="${-190 + Math.floor(i / 6) * 60}" r="29" fill="#9FD4F0" opacity=".55"/>`).join(""))
      + gr + (wet ? [[-30, -1], [30, 1]].map(([x, c]) => `<path d="M${x} -230 q${c * 30} 90 ${c * 10} 170 q${-c * 20} 40 ${c * 16} 90" stroke="#7A4E2A" stroke-width="16" fill="none" stroke-linecap="round"/>`).join("")
        : [[-50, -1], [-10, 1], [30, -1], [60, 1]].map(([x, c]) => `<path d="M${x} -230 q${c * 34} 80 ${c * 12} 160 q${-c * 18} 40 ${c * 22} 100" stroke="#F4EBD8" stroke-width="12" fill="none" stroke-linecap="round"/>`).join("")) + `</g>`;
    return TF(0, 0, sc, s); };
  return TF(-330, 40, 1, pot(true, 1.12)) + TF(330, 60, 1, pot(false, .86)); }

/* ================================================================ sets: the HDB corridor, the void-deck science lab corner ================================================================ */
// the HDB corridor in the sun (the recovery, the time-lapse): the cream wall, a door, the railing, the sky and blocks beyond, potted plants
function corridorV3(t, light = 1) { let s = `<rect width="1920" height="1080" fill="#BFE3F7"/><rect y="0" width="1920" height="420" fill="#9ED4F3"/>`;
  for (let i = 0; i < 5; i++) s += `<rect x="${120 + i * 360}" y="${200 + (i % 2) * 40}" width="240" height="${380 - (i % 2) * 40}" fill="${i % 2 ? "#E9D9C2" : "#F1E3CC"}"/>` + [...Array(6)].map((_, j) => `<rect x="${140 + i * 360 + (j % 3) * 70}" y="${230 + (i % 2) * 40 + Math.floor(j / 3) * 80}" width="44" height="40" fill="#8FB8D0"/>`).join("");
  s += `<rect x="0" y="560" width="1920" height="520" fill="#EFE6D6"/><rect x="0" y="560" width="1920" height="26" fill="#D8CDB8"/><rect x="0" y="840" width="1920" height="240" fill="#CFC2AA"/>`;
  for (let x = 30; x < 1920; x += 70) s += `<rect x="${x}" y="600" width="14" height="240" fill="#B9AE98"/>`;
  s += `<rect x="0" y="600" width="1920" height="16" fill="#A79C86"/><rect x="0" y="826" width="1920" height="16" fill="#A79C86"/>`;
  s += `<rect width="1920" height="1080" fill="#FFF2C4" opacity="${n2(.18 * light)}"/>`; return s; }
function labCornerV3(t, k = 1) { return `<rect width="1920" height="1080" fill="#0B1420"/><rect x="1260" y="160" width="420" height="520" fill="#1E3346"/><rect x="1280" y="180" width="380" height="480" fill="#2D4A63" opacity=".8"/><path d="M1470 180 V660 M1280 420 H1660" stroke="#0B1420" stroke-width="10"/>`
  + `<rect x="0" y="760" width="1920" height="320" fill="#121D2A"/><rect x="160" y="300" width="560" height="22" fill="#24344A"/>` + [220, 320, 430, 560, 640].map((x, i) => `<path d="M${x} 300 v-${60 + (i % 3) * 30} h${30 + (i % 2) * 10} v${60 + (i % 3) * 30}" fill="#1C2C40" stroke="#2E4660" stroke-width="4"/>`).join("")
  + `<path d="M1260 680 L860 1080 H1500 L1680 680z" fill="#2D4A63" opacity=".18"/>`; }
