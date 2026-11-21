// reuse.js (EP7): drawings copied UNCHANGED from finished episodes, so the old friends look the same here (do not edit; copy again if a source changes).
//   ep06/beasts.js: the water monitor, the fruit bat, EP6's two dare pictures (mouldBread, yeastLoaf) and their gradients (XDEFS8)
//   ep06/gardens.js: the little house lizard, the rain tree · ep06/six.js: small tags (popTag, lineTag, pboard, numPop, motes)
//   ep04/ep4.js: the four group colours, plain-line labels, the photo board, the mushroom (side view), the three bacteria shapes, the chilli plant, the bird's nest fern
//   ep08/canteen.js: EP8's three containers and the pile of sand (the dare; drawn by EP8's artist) and their gradients
/* ---- ep06/beasts.js ---- */
const XDEFS8 = () => `${lg("mlB", [[0, "#2E2C25"], [.55, "#3E3B31"], [1, "#4E4A3C"]])}${lg("mlBelly", [[0, "#B8AE7E"], [1, "#8E8660"]])}${lg("batF", [[0, "#B07A48"], [1, "#7A4E2C"]])}${lg("batW", [[0, "#5E3E30"], [1, "#3E2820"]])}
  ${lg("macF", [[0, "#B8A488"], [1, "#8A7660"]])}${lg("catO", [[0, "#F2B26A"], [1, "#D98A3E"]])}${lg("stSh", [[0, "#8A7A4A"], [1, "#5E5432"]])}${lg("croc", [[0, "#7E8A5A"], [1, "#56603C"]])}${lg("trtl", [[0, "#7A8A4A"], [1, "#4E5A2E"]])}
  ${lg("bread", [[0, "#F2D7A4"], [1, "#E2BA7A"]])}${lg("crust", [[0, "#C9853E"], [1, "#9A5E26"]])}${lg("glass", [[0, "#fff", .55], [.5, "#fff", .15], [1, "#fff", .4]], 1, 0)}
  <filter id="silF" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 .14  0 0 0 0 .1  0 0 0 0 .2  0 0 0 1 0"/></filter>
  <pattern id="mlSc" width="9" height="7.5" patternUnits="userSpaceOnUse"><circle cx="4.5" cy="3.75" r="3.2" fill="#5A5646" opacity=".55"/><circle cx="4.5" cy="3.75" r="3.2" fill="none" stroke="#14120E" stroke-width="1" opacity=".5"/></pattern>
  <pattern id="mlSc2" width="7" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)"><circle cx="3.5" cy="3" r="2.4" fill="#5A5646" opacity=".5"/><circle cx="3.5" cy="3" r="2.4" fill="none" stroke="#14120E" stroke-width=".8" opacity=".45"/></pattern>`;

/* ---------- the Malayan water monitor (Varanus salvator), side view, facing right. origin = the ground under its chest. About 1300 px long at k = 1.
   The teacher's notes (20 Nov): a long, narrow, low head with a pointed snout on a long, thick neck; a heavy, slightly arched body; short, thick
   legs that bend out at the elbow and knee and go down to the ground (a push-up pose) with long curved claws; a very long tail, flattened
   side to side like a paddle; fine bead-like scales; dark grey-brown, with rows of small pale yellow spots.
   o: pose "lie" | "walk" | "swim"; ph (walk phase); tongue (0..1); breath (0..1); t ---------- */
function monitor(o = {}) { const ps = o.pose || "lie", ph = o.ph || 0, br = o.breath || 0, sw = ps === "swim", t = o.t || 0, wk = ps === "walk";
  const tw = sw ? 30 * Math.sin(t * 2.4) : 6 * Math.sin(t * .9), by = wk ? -16 : 0, tg = o.tongue || 0;
  const W2 = (i) => wk ? Math.sin(ph + (i ? Math.PI : 0)) : 0, up = (i) => wk ? Math.max(0, Math.cos(ph + (i ? Math.PI : 0))) : 0;
  const limb = (pts, w, far) => { const c = far ? "#26241D" : "#3A372D", lc = far ? "#1C1A15" : "#24221B", w1 = w[0] * 1.25, w2 = w[0] * .82; let s = "";
    [[pts[0], pts[1], w1], [pts[1], pts[2], w2]].forEach(([a, b2, ww]) => { const d = `M${n2(a[0])} ${n2(a[1])} L${n2(b2[0])} ${n2(b2[1])}`; s += `<path d="${d}" stroke="${lc}" stroke-width="${n2(ww + 7)}" stroke-linecap="round"/>`; });
    [[pts[0], pts[1], w1], [pts[1], pts[2], w2]].forEach(([a, b2, ww]) => { const d = `M${n2(a[0])} ${n2(a[1])} L${n2(b2[0])} ${n2(b2[1])}`; s += `<path d="${d}" stroke="${c}" stroke-width="${n2(ww)}" stroke-linecap="round"/>` + (far ? "" : `<path d="${d}" stroke="url(#mlSc2)" stroke-width="${n2(ww)}" stroke-linecap="round" opacity=".7"/>`); });
    return s; };
  const claws = (f, dir, far) => [-.35, -.1, .15, .4].map((q) => { const a = (dir > 0 ? 0 : 180) + q * 40, r = a * Math.PI / 180, x2 = f[0] + Math.cos(r) * 34, y2 = f[1] + Math.sin(r) * 10 - 2; return `<path d="M${n2(f[0])} ${n2(f[1])} L${n2(x2)} ${n2(y2)}" stroke="${far ? "#1C1A15" : "#2E2C24"}" stroke-width="8" stroke-linecap="round"/><path d="M${n2(x2)} ${n2(y2)} q${dir * 9} 0 ${dir * 12} 7" fill="none" stroke="#14120E" stroke-width="3.5" stroke-linecap="round"/>`; }).join("");
  let farL = "", nearL = "";
  if (!sw) { const fF = [208 + 30 * W2(1), -4 - 12 * up(1)], fH = [-112 + 30 * W2(0), -4 - 12 * up(0)], nF = [150 + 30 * W2(0), -2 - 12 * up(0)], nH = [-176 + 30 * W2(1), -2 - 12 * up(1)];
    farL = limb([[156, by - 66], [190, by - 34], [fF[0] - 8, fF[1] - 4]], [26], true) + claws(fF, 1, true) + limb([[-150, by - 66], [-96, by - 40], [fH[0] - 4, fH[1] - 4]], [28], true) + claws(fH, -1, true);
    nearL = limb([[128, by - 70], [100, by - 30], [nF[0] - 10, nF[1] - 6]], [34], false)  + claws(nF, 1, false)
      + limb([[-180, by - 70], [-126, by - 38], [nH[0] + 6, nH[1] - 6]], [36], false)  + claws(nH, -1, false); }
  else { farL = limb([[156, -64], [110, -54], [60, -50]], [22], true) + limb([[-150, -64], [-220, -52], [-290, -46]], [24], true); nearL = limb([[128, -66], [84, -50], [30, -46]], [28], false) + limb([[-180, -66], [-246, -52], [-316, -44]], [30], false); }
  const T1 = (x, y, k = 1) => `${x} ${n2(y + tw * k)}`;
  const body = `M300 ${by - 106} Q230 ${by - 134} 150 ${by - 146} C70 ${by - 170 - 6 * br} -70 ${by - 182 - 6 * br} -200 ${by - 136} C${T1(-320, by - 104, .3)} ${T1(-480, -68, .7)} ${T1(-620, -46, 1)} Q${T1(-730, -32, 1.3)} ${T1(-860, -22, 1.6)}`
    + ` Q${T1(-730, -14, 1.3)} ${T1(-620, -16, 1)} C${T1(-480, -22, .7)} ${T1(-330, by - 38, .3)} -210 ${by - 48} C-120 ${by - 14 + 4 * br} 40 ${by - 14 + 4 * br} 130 ${by - 34} Q220 ${by - 50} 300 ${by - 64}z`;
  let spots = ""; for (let i = 0; i < 8; i++) { const x = 110 - i * 44; for (let j = 0; j < 4; j++) { const y = by - 152 + j * 22 + Math.abs(x + 40) * .1 - (i % 2) * 4; spots += `<circle cx="${x + (j % 2) * 7}" cy="${n2(y)}" r="${4.2 - j * .4}" fill="#D8CC8A" opacity=".85"/>`; } }
  for (let i = 0; i < 9; i++) { const x = -250 - i * 64, k = .3 + i * .1, yt = -100 + i * 9.5 + tw * Math.min(1.5, k); for (let j = 0; j < 3; j++) spots += `<circle cx="${x + (j % 2) * 6}" cy="${n2(yt + j * (14 - i))}" r="${n2(Math.max(1.6, 3.8 - i * .25))}" fill="#D8CC8A" opacity=".75"/>`; }
  const keel = `<path d="M-200 ${by - 126} C${T1(-320, by - 104, .3)} ${T1(-480, -68, .7)} ${T1(-620, -46, 1)} Q${T1(-730, -32, 1.3)} ${T1(-860, -22, 1.6)}" fill="none" stroke="#1E1C16" stroke-width="5" stroke-dasharray="6 7" opacity=".7"/>`;
  const head = `<path d="M286 ${by - 110} Q340 ${by - 124} 400 ${by - 106} Q448 ${by - 92} 470 ${by - 76} Q442 ${by - 62} 382 ${by - 60} Q330 ${by - 58} 286 ${by - 62}z" fill="#3A372D" stroke="#1E1C16" stroke-width="5"/>
    <path d="M286 ${by - 110} Q340 ${by - 124} 400 ${by - 106} Q448 ${by - 92} 470 ${by - 76} Q442 ${by - 62} 382 ${by - 60} Q330 ${by - 58} 286 ${by - 62}z" fill="url(#mlSc2)"/>${[[330, -112], [360, -110], [392, -102], [420, -94]].map(([x, y]) => `<circle cx="${x}" cy="${by + y}" r="2.6" fill="#D8CC8A" opacity=".8"/>`).join("")}
    <path d="M300 ${by - 70} Q380 ${by - 66} 466 ${by - 74}" fill="none" stroke="#1E1C16" stroke-width="3.5"/><path d="M296 ${by - 64} Q330 ${by - 52} 380 ${by - 60}" fill="#8A8468" opacity=".7"/>
    <path d="M318 ${by - 94} L364 ${by - 92}" stroke="#1E1C16" stroke-width="4" stroke-linecap="round" opacity=".6"/><ellipse cx="342" cy="${by - 98}" rx="7" ry="6" fill="#120F0B" stroke="#C9B870" stroke-width="2.5"/><circle cx="340" cy="${by - 100}" r="2" fill="#fff" opacity=".85"/>
    <ellipse cx="452" cy="${by - 84}" rx="4" ry="3" fill="#120F0B"/><circle cx="304" cy="${by - 88}" r="5" fill="#1E1C16" opacity=".8"/>`
    + (tg > .02 ? `<path d="M466 ${by - 74} L${n2(466 + 96 * tg)} ${by - 76} M${n2(466 + 96 * tg)} ${by - 76} l22 -10 M${n2(466 + 96 * tg)} ${by - 76} l22 8" fill="none" stroke="#B85A8E" stroke-width="5" stroke-linecap="round"/>` : "");
  return (sw ? "" : `<ellipse cx="-160" cy="6" rx="560" ry="22" fill="${P.ink}" opacity=".2" filter="url(#b4)"/>`) + farL
    + `<path d="${body}" fill="url(#mlB)" stroke="#1E1C16" stroke-width="6" stroke-linejoin="round"/><path d="${body}" fill="url(#mlSc)"/><path d="M130 ${by - 40} C40 ${by - 22 + 4 * br} -120 ${by - 22 + 4 * br} -210 ${by - 48}" fill="none" stroke="#8A8468" stroke-width="12" opacity=".55"/>${spots}${keel}
    <path d="M150 ${by - 124} C60 ${by - 136} -60 ${by - 146} -190 ${by - 122}" fill="none" stroke="#fff" stroke-width="6" opacity=".1" stroke-linecap="round"/>` + nearL + head; }
// a round close-up of skin. kind: "scaly" (dry, bead-like scales with pale spots, no shine) | "fur" (a bat's soft fur)
function batWing(sd, sp, fl, o = {}) { const up = Math.sin(fl) * 60 * sp, sh = [sd * 40, -160], wr = [sd * lerp(56, 230, sp), lerp(-120, -250 - up, sp)];
  const tips = [[lerp(70, 420, sp), lerp(-50, -160 - up * 1.4, sp)], [lerp(66, 400, sp), lerp(-20, -40 - up * .8, sp)], [lerp(60, 330, sp), lerp(0, 60 - up * .3, sp)], [lerp(56, 220, sp), lerp(10, 100, sp)]].map(([x, y]) => [sd * x, y]);
  const foot = [sd * 26, -20], trail = [tips[0], tips[1], tips[2], tips[3], foot];
  let edge = `M${n2(sh[0])} ${sh[1]} L${n2(wr[0])} ${n2(wr[1])} L${n2(tips[0][0])} ${n2(tips[0][1])}`; for (let i = 1; i < trail.length; i++) { const a = trail[i - 1], b = trail[i], mx = (a[0] + b[0]) / 2 - sd * 30 * sp, my = (a[1] + b[1]) / 2 - 20 * sp; edge += ` Q${n2(mx)} ${n2(my)} ${n2(b[0])} ${n2(b[1])}`; } edge += "z";
  const lit = o.light || 0;
  return `<path d="${edge}" fill="url(#batW)" stroke="#2A1A14" stroke-width="5" stroke-linejoin="round" opacity="${o.thin ? .92 : 1}"/>${lit > .02 ? `<path d="${edge}" fill="#FFB070" opacity="${n2(.35 * lit)}"/>` : ""}
    <path d="M${n2(sh[0])} ${sh[1]} L${n2(wr[0])} ${n2(wr[1])}" stroke="#6E4A36" stroke-width="12" stroke-linecap="round"/>${tips.map((p) => `<path d="M${n2(wr[0])} ${n2(wr[1])} L${n2(p[0])} ${n2(p[1])}" stroke="#6E4A36" stroke-width="6" stroke-linecap="round"/>`).join("")}
    <path d="M${n2(wr[0])} ${n2(wr[1])} l${sd * 4} -22" stroke="#2A1A14" stroke-width="6" stroke-linecap="round"/>`; }
function fruitBat(o = {}) { const sp = o.wings || 0, fl = o.flap || 0, bl = o.blink, by = o.baby || 0;
  const head = `<g transform="translate(0 -232)"><path d="M-26 -26 Q-58 -60 -44 -82 Q-24 -74 -8 -40z M26 -26 Q58 -60 44 -82 Q24 -74 8 -40z" fill="#6A4026" stroke="#2A1A14" stroke-width="5" stroke-linejoin="round"/><path d="M-30 -36 Q-50 -62 -42 -76 M30 -36 Q50 -62 42 -76" fill="none" stroke="#E8D2B8" stroke-width="3" stroke-linecap="round" opacity=".8"/>
    <ellipse cx="0" cy="0" rx="46" ry="42" fill="url(#batF)" stroke="#5E3A22" stroke-width="4"/><path d="M-20 14 Q0 54 20 14 Q10 6 0 6 Q-10 6 -20 14z" fill="#9A6A44" stroke="#5E3A22" stroke-width="4"/><ellipse cx="0" cy="34" rx="10" ry="7" fill="#3A2218"/><circle cx="-4" cy="33" r="2" fill="#000"/><circle cx="4" cy="33" r="2" fill="#000"/>
    ${bl ? `<path d="M-30 -6 q10 6 18 0 M12 -6 q10 6 18 0" stroke="#2A1A14" stroke-width="4" fill="none"/>` : `<circle cx="-20" cy="-6" r="12" fill="#1A100C"/><circle cx="20" cy="-6" r="12" fill="#1A100C"/><circle cx="-16" cy="-11" r="4" fill="#fff"/><circle cx="24" cy="-11" r="4" fill="#fff"/>`}</g>`;
  const baby = by > .02 ? `<g opacity="${n2(Math.min(1, by * 2))}"><g transform="translate(-24 -78) rotate(8)"><ellipse rx="24" ry="40" fill="#B98250" stroke="#3A2218" stroke-width="5"/><path d="M-22 -10 Q-40 20 -26 42 L-10 20z" fill="#4E3226" stroke="#2A1A14" stroke-width="3"/><path d="M-6 36 l-4 14 M8 36 l4 14" stroke="#3A2218" stroke-width="5" stroke-linecap="round"/></g>
    <g transform="translate(-26 -128) rotate(10) scale(.85)"><path d="M-14 -14 Q-34 -34 -22 -46 Q-8 -40 -2 -18z" fill="#8A5A36" stroke="#2A1A14" stroke-width="4"/><circle r="24" fill="#B98250" stroke="#3A2218" stroke-width="5"/><path d="M14 4 Q30 0 32 -10" fill="none" stroke="#3A2218" stroke-width="5" stroke-linecap="round"/><circle cx="6" cy="-6" r="6.5" fill="#1A100C"/><circle cx="8" cy="-8.5" r="2.4" fill="#fff"/></g></g>` : "";
  const body = `<path d="M-10 0 L-14 -30 M10 0 L14 -30" stroke="#3A2218" stroke-width="9" stroke-linecap="round"/><ellipse cx="0" cy="-112" rx="50" ry="84" fill="url(#batF)" stroke="#5E3A22" stroke-width="5"/>
    <path d="M-30 -170 Q0 -150 30 -170 Q26 -110 0 -96 Q-26 -110 -30 -170z" fill="#D2A06A" opacity=".55"/>${Array.from({ length: 14 }, (_, i) => `<path d="M${n2(-36 + (i % 7) * 12)} ${-60 - (i > 6 ? 50 : 0)} q4 -8 0 -16" fill="none" stroke="#6A4024" stroke-width="3" opacity=".5"/>`).join("")}`;
  if (sp < .05) { // folded: the wings wrap round like a cloak, the forearm a ridge down each side, the thumb claw at the top
    const cloak = (sd) => `<path d="M${sd * 30} -176 Q${sd * 82} -150 ${sd * 70} -60 Q${sd * 60} -12 ${sd * 18} -14 Q${sd * 44} -90 ${sd * 30} -176z" fill="url(#batW)" stroke="#2A1A14" stroke-width="5"/><path d="M${sd * 44} -178 Q${sd * 74} -130 ${sd * 62} -40" fill="none" stroke="#7A5440" stroke-width="7" stroke-linecap="round"/><path d="M${sd * 44} -180 l${sd * 4} -16" stroke="#2A1A14" stroke-width="6" stroke-linecap="round"/>`;
    return body + cloak(-1) + cloak(1) + (by > .02 ? `<g transform="translate(-30 -130) scale(1.3) translate(30 130)">${baby}</g>` : "") + head; }
  return batWing(-1, sp, fl, o) + batWing(1, sp, fl, o) + body + head; }
// hanging upside down from a leaf: feet at the origin, head down
const hangBat = (o = {}) => `<g transform="rotate(180)">${fruitBat(o)}</g>`;

/* ---------- the long-tailed macaque, sitting, side view facing right (a long tail on the ground behind). origin = the ground under it ---------- */
const mouldBread = () => `<path d="M-150 120 V-40 Q-170 -150 -60 -160 Q0 -200 60 -160 Q170 -150 150 -40 V120z" fill="url(#crust)"/><path d="M-130 106 V-36 Q-148 -130 -54 -140 Q0 -176 54 -140 Q148 -130 130 -36 V106z" fill="url(#bread)"/>
  ${[[-60, -60, 34], [40, -20, 26], [-20, 50, 30], [70, 70, 18], [-80, 40, 14]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#8AA88A" opacity=".85"/><circle cx="${x}" cy="${y}" r="${r * .6}" fill="#5E7A6A"/>${[0, 1, 2, 3, 4, 5].map((i) => `<circle cx="${n2(x + Math.cos(i) * r * .9)}" cy="${n2(y + Math.sin(i) * r * .9)}" r="4" fill="#C8D8C0"/>`).join("")}`).join("")}`;
const yeastLoaf = () => `<path d="M-230 80 Q-250 -60 -120 -90 Q0 -130 120 -90 Q250 -60 230 80z" fill="url(#crust)" stroke="#7A4A1E" stroke-width="6"/><path d="M-140 -60 q20 30 0 60 M-40 -84 q20 30 0 60 M60 -84 q20 30 0 60" fill="none" stroke="#F2D7A4" stroke-width="8" stroke-linecap="round"/>
  <g transform="translate(250 60) rotate(6)"><rect x="-70" y="-100" width="140" height="120" rx="10" fill="#FFF3DC" stroke="#C8A070" stroke-width="5"/><rect x="-70" y="-100" width="140" height="30" rx="8" fill="#E8B84A"/>${T(0, -26, "yeast", 34, P.ink, { w: 700 })}<circle cx="0" cy="0" r="6" fill="#E2BA7A"/><circle cx="-20" cy="2" r="4" fill="#E2BA7A"/><circle cx="18" cy="-2" r="5" fill="#E2BA7A"/></g>`;

/* ---- ep06/gardens.js ---- */
function rainTree(r, s = 1, dark = 0) { let under = "", c = "", hi = "";
  const cols = dark ? ["#2F5E48", "#3A6E50", "#244E3E"] : ["#4E9E52", "#5DB05C", "#43904C"];
  for (let i = 0; i < 70; i++) { const a = r(), x = (-640 + a * 1280) * s, y = (-600 - 150 * Math.sin(Math.PI * a) + r() * 70) * s, rr = (44 + r() * 46) * s;
    under += `<circle cx="${n2(x)}" cy="${n2(y + 46 * s)}" r="${n2(rr)}" fill="${dark ? "#1E3E30" : "#2F6E40"}"/>`; c += `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(rr)}" fill="${cols[i % 3]}"/>`;
    if (i % 2 === 0) hi += `<circle cx="${n2(x - rr * .3)}" cy="${n2(y - rr * .4)}" r="${n2(rr * .5)}" fill="${dark ? "#4F7E5E" : "#8ED676"}" opacity=".6"/>`; }
  const tr = dark ? "#3A2E28" : "url(#gdTrunk)", bc = dark ? "#3A2E28" : "#5E4632";
  return `<path d="M${-46 * s} 0 Q${-30 * s} ${-260 * s} ${-80 * s} ${-460 * s} L${-48 * s} ${-476 * s} Q${10 * s} ${-300 * s} ${46 * s} 0z" fill="${tr}"/><path d="M${-20 * s} ${-60 * s} Q${-10 * s} ${-260 * s} ${-50 * s} ${-420 * s}" fill="none" stroke="#fff" stroke-width="${6 * s}" opacity="${dark ? 0 : .15}"/>
    <path d="M${-70 * s} ${-430 * s} Q${-300 * s} ${-500 * s} ${-480 * s} ${-560 * s}" fill="none" stroke="${bc}" stroke-width="${28 * s}" stroke-linecap="round"/><path d="M${-60 * s} ${-450 * s} Q${160 * s} ${-530 * s} ${420 * s} ${-570 * s}" fill="none" stroke="${bc}" stroke-width="${26 * s}" stroke-linecap="round"/>
    <path d="M${-70 * s} ${-460 * s} Q${-60 * s} ${-560 * s} ${-20 * s} ${-640 * s}" fill="none" stroke="${bc}" stroke-width="${20 * s}" stroke-linecap="round"/><path d="M${-300 * s} ${-500 * s} Q${-360 * s} ${-560 * s} ${-330 * s} ${-620 * s} M${200 * s} ${-530 * s} Q${260 * s} ${-600 * s} ${240 * s} ${-650 * s}" fill="none" stroke="${bc}" stroke-width="${14 * s}" stroke-linecap="round"/>${under}${c}${hi}`; }
// a palm: a tall ringed trunk and a crown of fronds. type 0 = a feather palm (arching fronds with drooping leaflets), 1 = a fan palm. origin = the foot
const houseLiz = (o = {}) => { const c = o.col || "#D8C7A6", ln = o.line || "#7A6A52", w = 2 * Math.sin((o.t || 0) * 5);
  return `<g filter="url(#rimS)"><path d="M0 26 Q${n2(-10 + w)} 60 ${n2(6 + w * 2)} 92 Q${n2(16 + w * 2)} 110 ${n2(4 + w * 3)} 124" fill="none" stroke="${ln}" stroke-width="15" stroke-linecap="round"/><path d="M0 26 Q${n2(-10 + w)} 60 ${n2(6 + w * 2)} 92 Q${n2(16 + w * 2)} 110 ${n2(4 + w * 3)} 124" fill="none" stroke="${c}" stroke-width="10" stroke-linecap="round"/>
  ${[[-1, -14, -1], [1, -14, 1], [-1, 20, -1], [1, 20, 1]].map(([sd, y, k]) => `<path d="M${sd * 12} ${y} q${sd * 18} ${y < 0 ? -4 : 6} ${sd * 24} ${y < 0 ? -18 : 16}" fill="none" stroke="${ln}" stroke-width="10" stroke-linecap="round"/><path d="M${sd * 12} ${y} q${sd * 18} ${y < 0 ? -4 : 6} ${sd * 24} ${y < 0 ? -18 : 16}" fill="none" stroke="${c}" stroke-width="6" stroke-linecap="round"/>${[-1, 0, 1].map((q) => `<circle cx="${n2(sd * 36 + q * 5)}" cy="${n2(y + (y < 0 ? -18 : 16) + (y < 0 ? -4 : 4) + Math.abs(q) * 2)}" r="3.4" fill="${c}" stroke="${ln}" stroke-width="1.5"/>`).join("")}`).join("")}
  <ellipse cx="0" cy="4" rx="15" ry="30" fill="${c}" stroke="${ln}" stroke-width="3"/><ellipse cx="0" cy="-34" rx="17" ry="16" fill="${c}" stroke="${ln}" stroke-width="3"/><circle cx="-8" cy="-38" r="3.6" fill="${P.ink}"/><circle cx="8" cy="-38" r="3.6" fill="${P.ink}"/><circle cx="-7" cy="-39.5" r="1.3" fill="#fff"/><circle cx="9" cy="-39.5" r="1.3" fill="#fff"/>
  <ellipse cx="-3" cy="-2" rx="5" ry="16" fill="#fff" opacity=".3"/></g>`; };

/* ---- ep06/six.js ---- */
const motes = (t, n = 24, seed = 4, col = "#FFF6D8") => { let s = ""; for (let i = 0; i < n; i++) { const x = (hash(i, seed) * 1920 + t * (8 + 10 * hash(i, seed + 1))) % 1920, y = 80 + hash(i, seed + 2) * 700 + 20 * Math.sin(t * .7 + i), a = .25 + .45 * Math.abs(Math.sin(t * .9 + i * 1.3)); s += `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(2 + 3 * hash(i, seed + 3))}" fill="${col}" opacity="${n2(a)}"/>`; } return s; };

/* ---------- close-up worlds: soft garden bokeh behind, the paved path as a ground plane (for the ant), or a web among leaves (for the spider) ---------- */
const pboard = (inner, w, h, id, lab, size = 34, bgc = "#EAF6E8") => wboard(`<rect x="-300" y="-300" width="600" height="600" fill="${bgc}"/>` + inner, w, h, id, lab ? { lab, size } : {});
// a little tag joined to a point by one plain line (style 7.8)
const lineTag = (t, t0, tx, ty, px, py, txt, size = 32, fill = "#fff", ink = P.ink) => t < t0 ? "" : OP(ramp(t, t0, .2), `<path d="M${tx} ${ty} L${n2(px)} ${n2(py)}" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="${n2(px)}" cy="${n2(py)}" r="7" fill="#fff"/>`) + TF(tx, ty, spring(t, t0, .4), tpill(0, 0, txt, size, fill, ink, { w: 700 }));
// a number popping beside a leg as it is counted
const numPop = (t, t0, x, y, n, k = 1) => t < t0 ? "" : TF(x, y, k * spring(t, t0, .4) * (1 + .15 * pulse(t, t0, .02, .3)), `<g filter="url(#dropS)"><circle r="40" fill="url(#gSun)"/><circle r="40" fill="none" stroke="#fff" stroke-width="4"/></g>${T(0, 17, n, 50, P.ink)}`);
const popTag = (t, t0, x, y, txt, size = 40, fill = P.sun, ink = P.ink, t1 = 1e9) => t < t0 || t > t1 + .3 ? "" : TF(x, y, spring(t, t0, .4) * (1 - ramp(t, t1, .25)), tpill(0, 0, txt, size, fill, ink, { w: 700 }));
const greyX = (t, t0, x, y, r = 46) => t < t0 ? "" : TF(x, y, spring(t, t0, .4), `<circle r="${r}" fill="#EDEAF2" stroke="#8D87A0" stroke-width="5"/><path d="M${-r * .4} ${-r * .4} L${r * .4} ${r * .4} M${r * .4} ${-r * .4} L${-r * .4} ${r * .4}" stroke="#8D87A0" stroke-width="9" stroke-linecap="round"/>`);

/* ---- ep04/ep4.js ---- */
const GROUPS = [["PLANTS", "#2FA65A", "#1F8A4C"], ["ANIMALS", "#F08A24", "#C0620C"], ["FUNGI", "#A05A2C", "#7A3E18"], ["BACTERIA", "#3A8DFF", "#1F5FD0"]];
const lab4 = (x, y, txt, px, py, k = 1, size = 32) => k < .02 ? "" : OP(Math.min(1, k), `<path d="M${x} ${y} L${px} ${py}" stroke="${P.ink}" stroke-width="4" stroke-linecap="round"/><circle cx="${px}" cy="${py}" r="6" fill="${P.ink}"/>`) + TF(x, y, Math.min(1.06, k), tpill(0, 0, txt, size, "#fff", P.ink, { w: 700 }));
// a photo board standing on the ground: origin = the middle of its base; inner is drawn about the middle of its window
function board(inner, w, h, id, o = {}) { return `<ellipse cx="0" cy="4" rx="${w * .5}" ry="13" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M-70 0 L-46 -44 H46 L70 0z" fill="url(#fWood)" stroke="#8A5E34" stroke-width="4" stroke-linejoin="round"/>
  <g filter="url(#drop)"><rect x="${-w / 2}" y="${-h - 30}" width="${w}" height="${h}" rx="24" fill="url(#gPaper)"/></g><defs><clipPath id="${id}"><rect x="${-w / 2 + 16}" y="${-h - 14}" width="${w - 32}" height="${h - 32 - (o.lab ? 60 : 0)}" rx="14"/></clipPath></defs>
  <g clip-path="url(#${id})"><rect x="${-w / 2}" y="${-h - 30}" width="${w}" height="${h}" fill="${o.fill || "#DDF1D2"}"/><g transform="translate(0 ${n2(-h / 2 - 30 - (o.lab ? 30 : 0))})">${inner}</g></g>${o.lab ? T(0, -52, o.lab, o.size || 38, o.ink || P.ink) : ""}`; }
const mushroom = () => `<rect x="-13" y="-58" width="26" height="60" rx="11" fill="#FFF3DC" stroke="#B9A27E" stroke-width="5"/><path d="M-66 -52 Q-58 -124 0 -124 Q58 -124 66 -52z" fill="#E8A05A" stroke="#A8642A" stroke-width="6" stroke-linejoin="round"/><path d="M-60 -54 H60" stroke="#F6D9B0" stroke-width="6"/><circle cx="-22" cy="-90" r="8" fill="#FFF3DC" opacity=".8"/><circle cx="20" cy="-80" r="7" fill="#FFF3DC" opacity=".8"/><circle cx="2" cy="-106" r="5" fill="#FFF3DC" opacity=".8"/>`;
// bacteria: rod, sphere, spiral shapes only (no faces, no legs); origin = the middle
const BCOL = [["#8FE0CC", "#3E9A8A"], ["#FFB8CE", "#D9608A"], ["#D2B8FF", "#8B5CF6"]];
const bRod = (c = BCOL[0]) => `<rect x="-48" y="-17" width="96" height="34" rx="17" fill="${c[0]}" stroke="${c[1]}" stroke-width="4"/><rect x="-36" y="-10" width="44" height="8" rx="4" fill="#fff" opacity=".45"/>`;
const bRound = (c = BCOL[1]) => `<circle r="25" fill="${c[0]}" stroke="${c[1]}" stroke-width="4"/><ellipse cx="-8" cy="-9" rx="8" ry="5" fill="#fff" opacity=".45"/>`;
const bSpiral = (c = BCOL[2]) => `<path d="M-60 0 q15 -30 30 0 t30 0 t30 0 t30 0" fill="none" stroke="${c[1]}" stroke-width="22" stroke-linecap="round"/><path d="M-60 0 q15 -30 30 0 t30 0 t30 0 t30 0" fill="none" stroke="${c[0]}" stroke-width="14" stroke-linecap="round"/>`;
const bact3 = (s = 1) => TF(-40, -30, s, `<g transform="rotate(-20)">${bRod()}</g>`) + TF(44, -40, s, bRound()) + TF(4, 34, s * .8, bSpiral());
const chilli = (len = 70, col = "#B4E24A", dk = "#4E8A1A") => len < 4 ? "" : `<path d="M0 -6 V8" stroke="${dk}" stroke-width="6" stroke-linecap="round"/><path d="M-${n2(Math.min(10, len * .2))} 8 Q-${n2(Math.min(15, len * .25))} ${n2(len * .6)} 4 ${n2(len)} Q${n2(Math.min(11, len * .2))} ${n2(len * .6)} ${n2(Math.min(10, len * .2))} 8z" fill="${col}" stroke="${dk}" stroke-width="4" stroke-linejoin="round"/><path d="M-${n2(Math.min(11, len * .2))} 9 q${n2(Math.min(11, len * .2))} -8 ${n2(Math.min(22, len * .4))} 0" stroke="${dk}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
const CSITE = [104, -236];
// o.flower 0..1 (the bud opens), o.drop 0..1 (the petals fall), o.fruit 0..1 (the new chilli grows)
function chilliPlant(t, o = {}) { const lf = (x, y, r, s = 1) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><path d="M0 0 Q30 -30 88 0 Q30 30 0 0z" fill="url(#gLeaf)" stroke="#1F7F47" stroke-width="3.5" stroke-linejoin="round"/><path d="M0 0 H72" stroke="#1F7F47" stroke-width="2" opacity=".6"/></g>`;
  let s = `<path d="M0 0 Q-6 -120 0 -250 M0 -110 Q-60 -150 -110 -200 M0 -140 Q60 -180 ${CSITE[0]} ${CSITE[1]} M0 -200 Q-40 -250 -60 -300 M0 -230 Q40 -280 50 -320" fill="none" stroke="#3E9A57" stroke-width="9" stroke-linecap="round"/>`;
  for (const [x, y, r, k] of [[-20, -80, -150, 1], [18, -70, -30, 1], [-70, -168, -160, 1], [-110, -200, -110, 1.1], [-96, -196, 160, .9], [50, -170, -40, 1], [104, -236, -60, 1.05], [96, -230, 10, .9], [-60, -300, -120, 1], [-52, -296, -60, .9], [50, -320, -80, 1], [44, -316, -20, .9], [0, -250, -100, .9], [-4, -252, -70, .8]]) s += lf(x, y, r, k);
  for (const [x, y, L] of [[-88, -176, 104], [-30, -240, 90], [34, -262, 96], [60, -156, 86], [-8, -128, 92]]) s += TF(x, y, 1.25, chilli(L));
  const fl = o.flower || 0, dr = o.drop || 0, fr = o.fruit || 0;
  if (fr > 0) s += TF(CSITE[0] + 4, CSITE[1] + 4, 1.25, chilli(92 * fr));
  if (fl > 0 && dr < 1) { let pt = ""; for (let i = 0; i < 5; i++) { const a = i * 72 - 90, fall = dr > 0 ? eio(clamp(dr * 1.5 - i * .1)) : 0; pt += `<g transform="translate(${n2((i - 2) * 16 * fall)} ${n2(150 * fall * fall)}) rotate(${n2(a + 70 * fall * (i % 2 ? 1 : -1))})" opacity="${n2(1 - .9 * fall)}"><ellipse cx="${n2(15 * fl)}" cy="0" rx="${n2(15 * fl)}" ry="${n2(8 * fl)}" fill="#fff" stroke="#C9D2E8" stroke-width="2.5"/></g>`; }
    s += TF(CSITE[0] + 4, CSITE[1] + 14, 1, pt + `<circle r="${n2(6 * fl)}" fill="#E8D36A" stroke="#B9A23A" stroke-width="2" opacity="${n2(1 - dr)}"/>`); }
  return `<ellipse cx="0" cy="6" rx="130" ry="14" fill="${P.ink}" opacity=".18" filter="url(#b4)"/>` + s; }
// a terracotta pot with a plant in it: origin = the ground under the pot; the plant's base is at (0, -150)
const nfLeaf = (L, w, col = "url(#mLeafA)", ln = "#2C8F4B", rib = "#5A4A2A") => `<path d="M0 0 Q${n2(-w)} ${n2(-L * .3)} ${n2(-w * .9)} ${n2(-L * .6)} Q${n2(-w * .5)} ${n2(-L * .9)} 0 ${-L} Q${n2(w * .5)} ${n2(-L * .9)} ${n2(w * .9)} ${n2(-L * .6)} Q${w} ${n2(-L * .3)} 0 0z" fill="${col}" stroke="${ln}" stroke-width="4" stroke-linejoin="round"/><path d="M0 0 V${n2(-L * .96)}" stroke="${rib}" stroke-width="5" stroke-linecap="round"/>`;
function nestFern(o = {}) { let s = ""; [-82, -58, 70, 46, -34, 24, -12, 4].forEach((a, i) => { s += `<g transform="rotate(${a}) scale(${n2(1 - Math.abs(a) / 400)})">${nfLeaf(250 - (i % 3) * 24, 36)}</g>`; });
  return s + `<ellipse cx="0" cy="0" rx="60" ry="30" fill="#6E4A26" stroke="#4A3220" stroke-width="5"/><path d="M-40 -4 q20 -16 40 -2 q20 -12 38 4" fill="none" stroke="#8A6A4A" stroke-width="4"/>`; }
// the underside of one leaf (along -y from the origin): brown spore bags in neat rows, slanting out from the middle rib
/* ---- ep08/canteen.js ---- */
const bisc = (x, y, k = .5, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${k})"><circle r="44" fill="url(#hBis)" stroke="#A8742E" stroke-width="6"/><g fill="#7A4A2B"><circle cx="-16" cy="-12" r="6"/><circle cx="12" cy="-20" r="5"/><circle cx="18" cy="12" r="6"/><circle cx="-8" cy="18" r="5"/></g></g>`;
// the plastic snack box: a pink body and a clear clip-on lid, biscuits inside (seen from a little above)
function plasticBox() { return `<ellipse cx="0" cy="4" rx="150" ry="13" fill="${P.ink}" opacity=".22" filter="url(#b4)"/>
  <path d="M-128 -86 H128 L122 -14 Q120 0 104 0 H-104 Q-120 0 -122 -14z" fill="url(#cPink)" stroke="#B93A68" stroke-width="5" stroke-linejoin="round"/><path d="M-112 -66 L-108 -18" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".45"/>
  <path d="M-118 -132 H118 Q134 -132 136 -116 L138 -92 H-138 L-136 -116 Q-134 -132 -118 -132z" fill="#F9B6CC"/>${bisc(-70, -108, .36, -10)}${bisc(-6, -112, .36, 14)}${bisc(60, -108, .36, -4)}
  <path d="M-118 -136 H118 Q136 -136 138 -118 L140 -86 Q140 -80 134 -80 H-134 Q-140 -80 -140 -86 L-138 -118 Q-136 -136 -118 -136z" fill="#EAF7FF" opacity=".42" stroke="#F4FAFF" stroke-width="5" stroke-linejoin="round"/>
  <path d="M-100 -124 H40" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".8"/><path d="M64 -124 H92" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".6"/>
  ${[-148, 124].map((x) => `<rect x="${x}" y="-112" width="24" height="46" rx="8" fill="#E86A96" stroke="#B93A68" stroke-width="4"/>`).join("")}`; }
// the stainless-steel snack box: brushed metal, a domed lid with two clips, a bright streak
function metalBox() { return `<ellipse cx="0" cy="4" rx="150" ry="13" fill="${P.ink}" opacity=".22" filter="url(#b4)"/>
  <path d="M-128 -86 H128 L124 -14 Q122 0 106 0 H-106 Q-122 0 -124 -14z" fill="url(#cSteelH)" stroke="#6E7A88" stroke-width="5" stroke-linejoin="round"/>${[-70, -54, -38, -22].map((y) => `<path d="M-116 ${y} H116" stroke="#fff" stroke-width="2" opacity=".35"/>`).join("")}
  <path d="M-120 -140 H120 Q138 -140 139 -120 L140 -90 Q140 -80 130 -80 H-130 Q-140 -80 -140 -90 L-139 -120 Q-138 -140 -120 -140z" fill="url(#cSteel)" stroke="#6E7A88" stroke-width="5" stroke-linejoin="round"/>
  <path d="M-104 -126 H30" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".95"/><path d="M52 -126 H84" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".7"/><path d="M60 -66 L40 -16 M84 -66 L64 -16" stroke="#fff" stroke-width="12" opacity=".4"/>
  ${[-150, 124].map((x) => `<rect x="${x}" y="-110" width="26" height="54" rx="7" fill="url(#cSteel)" stroke="#6E7A88" stroke-width="4"/><path d="M${x + 6} -84 h14" stroke="#6E7A88" stroke-width="3"/>`).join("")}`; }
// the glass biscuit jar with its metal lid. o.empty = no biscuits; o.glow = the glass glows (0..1)
function glassJar(o = {}) { const body = `M-92 -196 Q-100 -214 -78 -222 H78 Q100 -214 92 -196 Q104 -180 104 -150 V-26 Q104 0 78 0 H-78 Q-104 0 -104 -26 V-150 Q-104 -180 -92 -196z`;
  return `<ellipse cx="0" cy="4" rx="124" ry="13" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="${body}" fill="#EAF6FF" opacity=".4"/>
  ${o.empty ? "" : bisc(-46, -30, .42, 8) + bisc(34, -34, .42, -12) + bisc(-10, -74, .42, 20) + bisc(-56, -104, .42, -16) + bisc(42, -108, .42, 10) + bisc(-4, -146, .42, -6)}
  <path d="${body}" fill="url(#cGlass)" stroke="#F4FAFF" stroke-width="6" stroke-linejoin="round"/><path d="${body}" fill="none" stroke="#8FB9D4" stroke-width="2" opacity=".7"/>
  <path d="M-80 -168 Q-88 -100 -82 -32" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity=".85"/><path d="M78 -150 Q84 -90 80 -40" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".55"/><ellipse cx="0" cy="-9" rx="84" ry="7" fill="#fff" opacity=".35"/>
  <rect x="-88" y="-256" width="176" height="40" rx="9" fill="url(#cSteelH)" stroke="#6E7A88" stroke-width="4"/><g stroke="#6E7A88" stroke-width="2.5" opacity=".55">${Array.from({ length: 10 }, (_, i) => `<path d="M${-72 + i * 16} -248 V-222"/>`).join("")}</g><ellipse cx="0" cy="-257" rx="88" ry="15" fill="url(#cSteel)" stroke="#6E7A88" stroke-width="4"/><ellipse cx="-24" cy="-260" rx="40" ry="5" fill="#fff" opacity=".85"/>`; }
// the metal spoon, lying on the table (bowl at the right, handle to the left). origin = the middle
function sandPile(k = 1) { const r = rndm(31); let d = ""; for (let i = 0; i < 46; i++) { const u = r(), x = (r() - .5) * 170 * (1 - u * .8), y = -4 - u * 66 * (1 - Math.abs(x) / 100); d += `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(1.6 + r() * 1.8)}" fill="${i % 3 ? "#C9A45E" : "#FFF6D8"}"/>`; }
  return `<ellipse cx="0" cy="3" rx="${110 * k}" ry="10" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M-100 0 Q-62 -8 -30 -52 Q-8 -80 14 -58 Q52 -14 100 0z" fill="url(#cSand)" stroke="#B8944E" stroke-width="4" stroke-linejoin="round"/><path d="M-24 -50 Q-6 -70 10 -54" fill="none" stroke="#FFF6D8" stroke-width="5" stroke-linecap="round" opacity=".8"/>${d}${[[-118, -2], [112, -3], [-96, 4], [126, 3], [84, 5]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#D9BC78"/>`).join("")}`; }
// the noodle stall's ceramic bowl: white glaze, a blue rim and a blue line, a foot ring (origin = base middle); o.noodles
