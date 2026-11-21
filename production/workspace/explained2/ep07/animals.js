// animals.js: every animal of EP5, redrawn for version 2 (teacher, 21 Nov: "the penguin is not cute and not animated properly").
// The rule (SERIES_FORMAT section 6, "Animals are cute AND alive"): the buddies' warm, rounded, big-eyed look (soft shapes, glossy eyes with a
// highlight, a blush, a little smile) on each animal's TRUE shape, and every animal moves: an idle loop (blink, breathe, small bob) that runs by
// itself wherever the animal is drawn, plus its own action (the penguin waddles and flaps, the ostrich steps and bobs its neck, the kingfisher
// spreads its wings, fish swim, frogs hop, the mudskipper pushes with its front fins).
// AT = the time of the frame being drawn (main.js sets it), so an animal is alive even where a scene passes no time. o.ph = a phase, so two
// animals side by side do not blink together. Everything is still a pure function of t.
let AT = 0;
const ADEFS = () => `${lg("fFrog", [[0, "#9BE86A"], [1, "#43B552"]])}${lg("fToad", [[0, "#D2AC74"], [1, "#96703F"]])}${lg("fKf", [[0, "#45CFEC"], [1, "#1787C2"]])}${lg("fKfD", [[0, "#2496CC"], [1, "#0F68A4"]])}
  ${lg("fFish", [[0, "#8CC3EA"], [.5, "#B4DAF2"], [1, "#F4FAFF"]])}${lg("fMsk", [[0, "#BBA57E"], [.7, "#9C8560"], [1, "#E6D7B4"]])}${lg("aPen", [[0, "#4A4678"], [1, "#2B2850"]])}${lg("aOst", [[0, "#4A4570"], [1, "#2A2748"]])}
  ${lg("aDuckH", [[0, "#3FC06E"], [1, "#1F8A4C"]])}${lg("aDuckB", [[0, "#D9DCE6"], [1, "#A9AFC2"]])}${lg("aStar", [[0, "#FFA05C"], [1, "#F27A3C"]])}${lg("aSal", [[0, "#5A5280"], [1, "#3A3358"]])}${lg("aHen", [[0, "#D08A4C"], [1, "#9A5E2C"]])}`;
const AL = "#2E2A4F";                                                             // the buddies' soft dark outline
const aBlinkAt = (ph = 0) => ((AT + ph * 1.37 + 1.3) % 3.4) < .13;
// a big glossy eye (the buddies' eye): dark, a large highlight top right and a small one bottom left. o: blink, line, ring (iris colour)
function aEye(x, y, r, o = {}) { const ln = o.line || AL;
  if (o.blink) return `<path d="M${n2(x - r)} ${n2(y)} q${n2(r)} ${n2(r * .8)} ${n2(2 * r)} 0" fill="none" stroke="${ln}" stroke-width="${n2(Math.max(3, r * .3))}" stroke-linecap="round"/>`;
  return (o.ring ? `<ellipse cx="${x}" cy="${y}" rx="${n2(r * 1.3)}" ry="${n2(r * 1.36)}" fill="${o.ring}" stroke="${ln}" stroke-width="${n2(Math.max(2, r * .16))}"/>` : "")
    + `<ellipse cx="${x}" cy="${y}" rx="${n2(r)}" ry="${n2(r * 1.08)}" fill="#1F1B3D"/><ellipse cx="${x}" cy="${n2(y + r * .34)}" rx="${n2(r * .7)}" ry="${n2(r * .5)}" fill="#4A3F86" opacity=".7"/>
    <circle cx="${n2(x + r * .32)}" cy="${n2(y - r * .38)}" r="${n2(r * .36)}" fill="#fff"/><circle cx="${n2(x - r * .38)}" cy="${n2(y + r * .4)}" r="${n2(r * .17)}" fill="#fff" opacity=".9"/>`; }
const aBlush = (x, y, r, col = "#FF8FA3", op = .55) => `<ellipse cx="${x}" cy="${y}" rx="${n2(r)}" ry="${n2(r * .62)}" fill="${col}" opacity="${op}"/>`;
// breathe: a soft squash about the feet (y0)
const aBr = (inner, amp = .018, ph = 0, y0 = 0, sp = 2.2) => { const b = amp * Math.sin(AT * sp + ph); return `<g transform="translate(0 ${y0}) scale(${n2((1 - b * .6) * 1000) / 1000} ${n2((1 + b) * 1000) / 1000}) translate(0 ${-y0})">${inner}</g>`; };

/* ---------- the frog. origin = its feet; faces right. o: ext 0..1 (hind legs folded .. stretched), blink, wet (extra shine 0..1), pal, swim, warts (a toad), ph
   True shape: no tail, a wide head with eyes that bulge on top, a wide mouth, long folded hind legs with webbed feet, short front legs, smooth moist skin. ---------- */
const FROGPAL = { fill: "url(#fFrog)", line: "#1F7A3A", belly: "#F2FAC4", web: "#C4F296", leg: "#66CC5C", spot: "#2F9A44", iris: "#FFE98A" },
  TOADPAL = { fill: "url(#fToad)", line: "#6A4A22", belly: "#F4E6C6", web: "#DEC490", leg: "#B8925A", spot: "#7A5A30", iris: "#FFD27A" };
function frog(o = {}) { const e = clamp(o.ext || 0), c = o.pal || FROGPAL, ph = o.ph || 0, L = (a, b) => [lerp(a[0], b[0], e), lerp(a[1], b[1], e)], hip = [-66, -46], knee = L([-4, -62], [-150, -34]), ank = L([-88, -12], [-236, -26]), toe = L([4, -4], [-318, -30]);
  const seg = (a, b, w) => `<path d="M${n2(a[0])} ${n2(a[1])} L${n2(b[0])} ${n2(b[1])}" stroke="${c.line}" stroke-width="${w + 9}" stroke-linecap="round"/><path d="M${n2(a[0])} ${n2(a[1])} L${n2(b[0])} ${n2(b[1])}" stroke="${c.leg}" stroke-width="${w}" stroke-linecap="round"/>`;
  const dx = toe[0] - ank[0], dy = toe[1] - ank[1], ln = Math.hypot(dx, dy) || 1, ux = dx / ln, uy = dy / ln, sp = lerp(.2, .44, e), tp = [-sp, 0, sp].map((a) => [ank[0] + (ux * Math.cos(a) - uy * Math.sin(a)) * ln, ank[1] + (ux * Math.sin(a) + uy * Math.cos(a)) * ln]);
  const foot = `<path d="M${n2(ank[0])} ${n2(ank[1])} L${tp.map((p) => n2(p[0]) + " " + n2(p[1])).join(" L")}z" fill="${c.web}" stroke="${c.line}" stroke-width="4" stroke-linejoin="round"/>` + tp.map((p) => `<path d="M${n2(ank[0])} ${n2(ank[1])} L${n2(p[0])} ${n2(p[1])}" stroke="${c.leg}" stroke-width="9" stroke-linecap="round"/><circle cx="${n2(p[0])}" cy="${n2(p[1])}" r="8.5" fill="${c.leg}" stroke="${c.line}" stroke-width="3"/>`).join("");
  const front = o.swim ? "" : seg([lerp(58, 70, e), lerp(-58, -70, e)], [lerp(84, 150, e), lerp(-6, -64, e)], 18) + [-13, 0, 13].map((d) => `<circle cx="${n2(lerp(84, 152, e) + d * (1 - e) + 4 * e)}" cy="${n2(lerp(-3, -64, e) + d * e)}" r="8" fill="${c.leg}" stroke="${c.line}" stroke-width="3"/>`).join("");
  const th = .5 + .5 * Math.sin(AT * 5 + ph), wet = o.wet || 0, blink = o.blink === undefined ? aBlinkAt(ph) : o.blink, sq = o.warts ? "scale(1.05 .95)" : "";
  const body = `<g transform="${sq}"><circle cx="100" cy="-132" r="25" fill="${c.fill}" stroke="${c.line}" stroke-width="5"/>
  <path d="M-108 -46 Q-106 -112 -40 -130 Q8 -146 60 -142 Q120 -134 130 -94 Q132 -62 98 -48 Q62 -22 6 -20 Q-70 -12 -108 -46z" fill="${c.fill}" stroke="${c.line}" stroke-width="5" stroke-linejoin="round"/>
  <path d="M-74 -34 Q0 -20 58 -44 Q86 -58 104 -70 Q${n2(118 + 7 * th)} ${n2(-54 + 10 * th)} 88 ${n2(-40 + 9 * th)} Q40 -21 -10 -21 Q-52 -22 -74 -34z" fill="${c.belly}" opacity=".96"/>
  ${o.warts ? [[-50, -86], [-16, -106], [20, -114], [-72, -62], [0, -78], [-36, -64], [-84, -84]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${6 + i % 3}" fill="${c.spot}" opacity=".5"/><circle cx="${x - 2}" cy="${y - 2}" r="2" fill="#fff" opacity=".4"/>`).join("") + `<ellipse cx="14" cy="-128" rx="26" ry="11" fill="${c.spot}" opacity=".4" transform="rotate(-8 14 -128)"/>`
    : [[-62, -98, 15, 9], [-22, -116, 12, 7], [-86, -70, 9, 6], [-34, -82, 7, 5]].map(([x, y, rx, ry]) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${c.spot}" opacity=".3"/>`).join("")
      + `<path d="M-70 -96 Q-34 -122 16 -134" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity="${n2(.5 + .4 * wet)}"/><circle cx="-84" cy="-74" r="5" fill="#fff" opacity="${n2(.5 + .4 * wet)}"/>`}
  <path d="M127 -100 Q102 -70 52 -82" fill="none" stroke="${c.line}" stroke-width="5" stroke-linecap="round"/><path d="M52 -82 q-5 -3 -6 -9" fill="none" stroke="${c.line}" stroke-width="4" stroke-linecap="round"/>
  <circle cx="116" cy="-118" r="2.8" fill="${c.line}"/>${aBlush(78, -100, 14)}
  <circle cx="56" cy="-146" r="35" fill="${c.fill}" stroke="${c.line}" stroke-width="5"/>${blink ? aEye(58, -146, 19, { blink: 1, line: c.line }) : aEye(58, -148, 19, { ring: c.iris, line: c.line })}
  ${o.warts ? "" : `<path d="M32 -168 q14 -10 28 -8" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity="${n2(.5 + .4 * wet)}"/>`}</g>`;
  return `<g>${seg(hip, knee, 31)}${seg(knee, ank, 22)}${foot}${aBr(body, .02, ph, -20)}${front}</g>`; }
const frogBlink = (t) => ((t + 1.3) % 3.4) < .13;
// a salamander: long body, long tail, four short legs, smooth moist skin (the black and yellow fire salamander). origin = its feet; faces right
function salamander(o = {}) { const ph = o.ph || 0, w = Math.sin(AT * 1.6 + ph), ty = -8 + 10 * w, blink = aBlinkAt(ph + 2);
  const leg = (x, d, k) => `<path d="M${x} -16 l${d * 20} ${n2(15 + 2 * k)} h${d * 14}" stroke="#2B2545" stroke-width="17" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M${x} -16 l${d * 20} ${n2(15 + 2 * k)} h${d * 14}" stroke="#4E4672" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  return `<g>${leg(-66, -1, w)}${leg(-18, -1, -w)}${leg(44, 1, w)}${leg(88, 1, -w)}
  <path d="M-198 ${n2(ty)} Q-150 ${n2(-34 - 6 * w)} -84 -36 Q0 -58 78 -50 Q104 -74 138 -62 Q164 -48 160 -28 Q154 -8 122 -8 Q60 -2 0 -6 Q-80 0 -130 ${n2(-8 + 4 * w)} Q-170 ${n2(-2 + 8 * w)} -198 ${n2(ty)}z" fill="url(#aSal)" stroke="#2B2545" stroke-width="5" stroke-linejoin="round"/>
  ${[[-128, -22], [-80, -28], [-34, -36], [14, -40], [58, -38], [-158, -14], [98, -44]].map(([x, y], i) => `<ellipse cx="${x}" cy="${n2(y + (i === 5 ? 5 * w : 0))}" rx="${13 - i % 2 * 3}" ry="7.5" fill="#FFCB3D"/>`).join("")}<ellipse cx="128" cy="-58" rx="13" ry="6" fill="#FFCB3D"/>
  <path d="M-60 -44 Q0 -56 60 -50" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".4"/>
  ${aEye(134, -42, 11, { blink, ring: "#FFF6C8" })}<path d="M158 -24 q-10 9 -24 6" fill="none" stroke="#2B2545" stroke-width="3.5" stroke-linecap="round"/>${aBlush(116, -22, 8)}</g>`; }
// frog eggs: a clear jelly mass with dark dots (they sway a little in the water)
const frogEggs = (n = 16, seed = 5) => { const r = rndm(seed); let s = ""; for (let i = 0; i < n; i++) { const a = i * 2.4, d = 12 * Math.sqrt(i) * 1.5, x = Math.cos(a) * d * 1.3 + 1.5 * Math.sin(AT * 1.5 + i), y = Math.sin(a) * d * .7; s += `<circle cx="${n2(x)}" cy="${n2(y)}" r="15" fill="#fff" opacity=".5" stroke="#DDF4FF" stroke-width="2.5"/><circle cx="${n2(x + 2 * r())}" cy="${n2(y + 2 * r())}" r="5.5" fill="#2B2147"/><circle cx="${n2(x - 5)}" cy="${n2(y - 6)}" r="3" fill="#fff" opacity=".8"/>`; } return `<g>${s}</g>`; };

/* ---------- birds ---------- */
// one wing of the kingfisher: a fan of flight feathers from the shoulder. sd 1 = the near wing, -1 = the far one; sp 0 = folded .. 1 = spread; fl -1..1 = a wing beat
function kfWing(sd, sp, fl) { const N = 8, far = sd < 0; let s = "";
  for (let i = N - 1; i >= 0; i--) { const u = i / (N - 1), a = lerp(60 + 16 * u, 34 - 84 * u - fl * 24 * (.35 + .65 * u), sp), L = lerp(lerp(88, 108, u), lerp(100, 176, Math.sin(u * 1.9)), sp), w = lerp(15, 25, sp);
    s += `<g transform="rotate(${n2(a)})"><path d="M0 ${-w} Q${n2(L * .7)} ${n2(-w * 1.25)} ${n2(L * .96)} ${n2(-w * .5)} Q${n2(L * 1.05)} 0 ${n2(L * .96)} ${n2(w * .5)} Q${n2(L * .7)} ${n2(w * 1.25)} 0 ${w}z" fill="${far ? (i % 2 ? "#1273B0" : "#1A82BE") : i % 2 ? "#1E96D0" : "#2BAEE0"}" stroke="#0F5F92" stroke-width="4" stroke-linejoin="round"/><path d="M10 0 H${n2(L * .84)}" stroke="#DDF7FF" stroke-width="2.5" stroke-linecap="round" opacity=".55"/></g>`; }
  const am = lerp(68, -8 - fl * 14, sp), cl = lerp(70, 100, sp); let sc = ""; for (let i = 0; i < 4; i++) sc += `<path d="M${22 + i * 17} -9 q9 11 0 20" fill="none" stroke="#0F6FA6" stroke-width="3" stroke-linecap="round" opacity=".7"/>`;
  s += `<g transform="rotate(${n2(am)})"><path d="M-10 -24 Q${n2(cl * .7)} -32 ${n2(cl)} 0 Q${n2(cl * .7)} 30 -10 24 Q-20 0 -10 -24z" fill="${far ? "url(#fKfD)" : "url(#fKf)"}" stroke="#0F5F92" stroke-width="4.5" stroke-linejoin="round"/>${sc}</g>`;
  return `<g transform="translate(${sd > 0 ? 30 : -24} -108) scale(${sd} 1)">${s}</g>`; }
// the collared kingfisher (the one children see at Sungei Buloh): a big head, a long heavy dark beak, a blue head, back, wings and tail, a white collar and
// front, short legs. origin = its feet on the perch; faces left. o: spread 0..1 (both wings opened wide), beat -1..1 (a wing beat), flap (old: 0..1), fish, bob, ph
function kingfisher(o = {}) { const ph = o.ph || 0, sp = clamp(Math.max(o.spread || 0, (o.flap || 0) * .8)), bt = o.beat || 0, blink = aBlinkAt(ph + 1), tilt = 3 * Math.sin(AT * 1.1 + ph) - 6 * sp, tl = 5 * Math.sin(AT * 2.3 + ph);
  const head = `<g transform="rotate(${n2(tilt)} -6 -112)"><circle cx="-10" cy="-160" r="56" fill="url(#fKf)"/>
  <path d="M-64 -150 Q-38 -132 -4 -138 Q24 -142 44 -154 Q42 -106 -10 -104 Q-58 -108 -64 -150z" fill="#FFFDF5"/><circle cx="-10" cy="-160" r="56" fill="none" stroke="#0F5F92" stroke-width="5"/>
  <path d="M-52 -208 q10 -16 22 -6 q10 -14 22 0" fill="url(#fKf)" stroke="#0F5F92" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="M-58 -180 L-160 -160 Q-168 -155 -160 -150 L-58 -138 Q-48 -158 -58 -180z" fill="#3A3350" stroke="${AL}" stroke-width="5" stroke-linejoin="round"/><path d="M-60 -152 L-156 -155" stroke="${AL}" stroke-width="3" stroke-linecap="round"/><path d="M-62 -146 L-110 -148 L-64 -141z" fill="#F2C9A0" opacity=".85"/>
  <path d="M-58 -168 Q-30 -182 8 -162" fill="none" stroke="#124A70" stroke-width="10" stroke-linecap="round" opacity=".45"/><circle cx="-52" cy="-182" r="6" fill="#FFFDF5"/>
  ${aEye(-28, -168, 16, { blink })}${aBlush(-20, -136, 11)}<path d="M-30 -214 q20 -6 38 6" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".35"/>
  ${o.fish ? `<g transform="translate(-152 -150) rotate(${n2(80 + 6 * Math.sin(AT * 9))}) scale(.2)">${fishG({ scales: false })}</g>` : ""}</g>`;
  return `<g transform="rotate(${n2(o.bob || 0)})">${sp > .04 ? OP(clamp(sp * 3), kfWing(-1, sp, bt)) : ""}
  <path d="M-8 -12 v12 M12 -12 v12" stroke="#8A5A48" stroke-width="7" stroke-linecap="round"/><path d="M-16 2 h16 M4 2 h16" stroke="#8A5A48" stroke-width="6" stroke-linecap="round"/>
  <g transform="rotate(${n2(tl)} 34 -30)"><path d="M30 -44 Q78 -26 108 12 Q84 18 62 8 Q40 -4 26 -22z" fill="url(#fKfD)" stroke="#0F5F92" stroke-width="5" stroke-linejoin="round"/></g>
  ${aBr(`<path d="M-48 -78 Q-54 -8 4 -6 Q54 -8 58 -68 Q56 -126 4 -132 Q-36 -128 -48 -78z" fill="#FFFDF5" stroke="#0F5F92" stroke-width="5"/><path d="M12 -131 Q60 -122 60 -66 Q58 -34 38 -16 Q50 -62 34 -98 Q26 -118 12 -131z" fill="url(#fKf)"/>
  ${[[-22, -50], [0, -40], [-12, -70]].map(([x, y]) => `<path d="M${x - 7} ${y} q7 8 14 0" fill="none" stroke="#C9D6E8" stroke-width="3" stroke-linecap="round"/>`).join("")}`, .02, ph, -6)}
  ${kfWing(1, sp, bt)}${head}</g>`; }
// a penguin, seen from the front: upright, a black back, head and flippers, a white face and belly, an orange beak and feet.
// origin = its feet. o: walk (a phase: it waddles, rocking from foot to foot), flap 0..1 (both flippers lifted), ph
function penguin(o = {}) { const ph = o.ph || 0, wk = o.walk, wa = wk !== undefined, rock = wa ? 8 * Math.sin(wk) : 1.4 * Math.sin(AT * 1.4 + ph), fl = clamp((o.flap || 0) + (wa ? .12 + .1 * Math.sin(wk * 2) : .05 + .05 * Math.sin(AT * 2 + ph))), blink = aBlinkAt(ph + .6);
  const foot = (s) => { const up = wa ? 13 * Math.max(0, s * -Math.sin(wk)) : 0; return `<g transform="translate(${s * 40} ${n2(-7 - up)}) rotate(${n2(s * 12 - (wa ? s * up : 0))})"><path d="M-30 4 Q-32 -12 0 -13 Q32 -12 30 4 Q30 12 14 10 L8 4 L0 12 L-8 4 L-14 10 Q-30 12 -30 4z" fill="#FFA63D" stroke="#C4650F" stroke-width="4.5" stroke-linejoin="round"/></g>`; };
  const flip = (s) => `<g transform="translate(${s * 82} -168) rotate(${n2(-s * (8 + 68 * fl))})"><path d="M0 -14 Q${s * 36} 28 ${s * 16} 112 Q${s * 4} 126 ${-s * 8} 112 Q${-s * 18} 50 0 -14z" fill="url(#aPen)" stroke="#1B1836" stroke-width="5" stroke-linejoin="round"/><path d="M${s * 8} 20 Q${s * 18} 60 ${s * 8} 100" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".18"/></g>`;
  const body = `${flip(-1)}${flip(1)}<path d="M0 -274 C64 -274 98 -214 100 -128 C102 -50 64 -8 0 -8 C-64 -8 -102 -50 -100 -128 C-98 -214 -64 -274 0 -274z" fill="url(#aPen)" stroke="#1B1836" stroke-width="5"/>
  <path d="M-4 -216 C12 -246 60 -240 60 -198 C60 -178 54 -166 60 -128 C66 -62 44 -24 0 -24 C-48 -24 -70 -62 -64 -128 C-58 -166 -66 -178 -66 -198 C-66 -240 -20 -246 -4 -216z" fill="#FFFDF5"/>
  <ellipse cx="-2" cy="-152" rx="46" ry="15" fill="#FFD75A" opacity=".5"/>
  ${[[-30, -74], [0, -60], [28, -74], [-14, -102], [14, -102]].map(([x, y]) => `<path d="M${x - 8} ${y} q8 9 16 0" fill="none" stroke="#D5DCEC" stroke-width="3" stroke-linecap="round"/>`).join("")}
  ${aEye(-36, -202, 15, { blink })}${aEye(28, -202, 15, { blink })}${aBlush(-52, -178, 13)}${aBlush(44, -178, 13)}
  <path d="M-22 -186 Q-4 -198 14 -186 Q8 -164 -4 -160 Q-16 -164 -22 -186z" fill="#FFA63D" stroke="#C4650F" stroke-width="4" stroke-linejoin="round"/><path d="M-19 -182 Q-4 -174 11 -182" fill="none" stroke="#C4650F" stroke-width="3" stroke-linecap="round"/>
  <path d="M-52 -252 q30 -16 62 -8" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".22"/>`;
  return `<g>${foot(-1)}${foot(1)}<g transform="rotate(${n2(rock)}) translate(${n2(wa ? 5 * Math.sin(wk) : 0)} ${n2(wa ? -4 * Math.abs(Math.sin(wk)) : 0)})">${aBr(body, .014, ph, -10, 2.4)}</g></g>`; }
// an ostrich: a small head on a long bare neck, a big round body of loose black feathers with white plumes, long bare legs with two toes.
// origin = its feet; faces left. o: step (a phase: it walks on the spot and its neck bobs), ph
function ostrich(o = {}) { const ph = o.ph || 0, st = o.step, wa = st !== undefined, sw = wa ? Math.sin(st) : 0, nb = wa ? Math.sin(st * 2) : .5 * Math.sin(AT * 1.3 + ph), by = wa ? -7 * Math.abs(Math.cos(st)) : 2.5 * Math.sin(AT * 2.1 + ph), blink = aBlinkAt(ph + 2.2);
  const leg = (sg, hx) => { const fx = hx - sg * 44 * sw - 4, lift = wa ? 30 * Math.max(0, sg * Math.cos(st)) : 0, fy = -6 - lift, kx = (hx + fx) / 2 + 24 + lift * .3, ky = (-150 + by + fy) / 2 - lift * .3, d = `M${hx} ${n2(-156 + by)} L${n2(kx)} ${n2(ky)} L${n2(fx)} ${n2(fy)}`;
    return `<path d="${d}" fill="none" stroke="#B9806E" stroke-width="21" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#F6C9B4" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${n2(kx)}" cy="${n2(ky)}" r="10" fill="#F6C9B4" stroke="#B9806E" stroke-width="4"/>
    <path d="M${n2(fx + 6)} ${n2(fy + 2)} h-42 M${n2(fx)} ${n2(fy)} l-22 -9" stroke="#B9806E" stroke-width="15" stroke-linecap="round"/><path d="M${n2(fx + 6)} ${n2(fy + 2)} h-42 M${n2(fx)} ${n2(fy)} l-22 -9" stroke="#F6C9B4" stroke-width="8" stroke-linecap="round"/>`; };
  const hx = -106 - 20 * nb, hy = -404 + by + 8 * Math.abs(nb), nk = `M-60 ${n2(-232 + by)} Q${n2(-30 - 14 * nb)} ${n2(-330 + by)} ${n2(hx + 8)} ${n2(hy + 20)}`;
  const fluff = [[14, -208, 112, 80], [-70, -196, 44, 46], [-40, -150, 40, 30], [20, -138, 46, 28], [78, -150, 44, 32], [112, -196, 36, 44]].map(([x, y, rx, ry]) => [x, y + by, rx, ry]);
  return `<g>${leg(-1, 28)}
  <g transform="rotate(${n2(-4 + 3 * Math.sin(AT * 1.7 + ph))} 110 ${n2(-210 + by)})">${[[150, -232, 24], [164, -204, 4], [150, -178, -18]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${n2(y + by)}" rx="40" ry="17" fill="#FFFDF5" stroke="#9AA3BC" stroke-width="4" transform="rotate(${r} ${x} ${n2(y + by)})"/>`).join("")}</g>
  ${fluff.map(([x, y, rx, ry]) => `<ellipse cx="${x}" cy="${n2(y)}" rx="${rx + 5}" ry="${ry + 5}" fill="#1B1836"/>`).join("")}${fluff.map(([x, y, rx, ry]) => `<ellipse cx="${x}" cy="${n2(y)}" rx="${rx}" ry="${ry}" fill="url(#aOst)"/>`).join("")}
  ${[[-44, -226], [-6, -238], [34, -232], [-26, -196], [14, -202], [54, -196], [-60, -168], [84, -224]].map(([x, y]) => `<path d="M${x - 13} ${n2(y + by)} q13 15 26 0" fill="none" stroke="#7A759E" stroke-width="3.5" stroke-linecap="round"/>`).join("")}
  ${[[-4, -146, 10], [30, -138, 0], [64, -144, -12]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${n2(y + by)}" rx="26" ry="12" fill="#FFFDF5" stroke="#9AA3BC" stroke-width="3.5" transform="rotate(${r} ${x} ${n2(y + by)})"/>`).join("")}
  ${leg(1, -2)}
  <path d="${nk}" fill="none" stroke="#B9806E" stroke-width="32" stroke-linecap="round"/><path d="${nk}" fill="none" stroke="#F6C9B4" stroke-width="23" stroke-linecap="round"/>
  <ellipse cx="-62" cy="${n2(-236 + by)}" rx="30" ry="15" fill="#FFFDF5" stroke="#9AA3BC" stroke-width="3.5" transform="rotate(-24 -62 ${n2(-236 + by)})"/>
  <g transform="translate(${n2(hx)} ${n2(hy)}) rotate(${n2(-5 * nb)})"><path d="M-10 -34 l-6 -16 M4 -37 l0 -18 M18 -33 l8 -15" stroke="#E8D9C8" stroke-width="5" stroke-linecap="round"/>
  <path d="M-24 -8 Q-72 -8 -80 6 Q-76 20 -24 18z" fill="#F0A070" stroke="#A8643C" stroke-width="4.5" stroke-linejoin="round"/><path d="M-76 7 Q-50 10 -26 6" fill="none" stroke="#A8643C" stroke-width="3" stroke-linecap="round"/>
  <circle r="37" fill="#F6C9B4" stroke="#B9806E" stroke-width="5"/>${blink ? "" : `<path d="M-22 -24 l-7 -9 M-12 -29 l-3 -11 M-1 -30 l2 -11" stroke="${AL}" stroke-width="3.5" stroke-linecap="round"/>`}${aEye(-10, -8, 16, { blink })}${aBlush(8, 18, 10)}
  <path d="M-30 20 q8 7 18 4" fill="none" stroke="#A8643C" stroke-width="3" stroke-linecap="round"/></g></g>`; }
// a mallard duck swimming. origin = the water line under it; faces right. It paddles: a bob, a tail wag, ripples
function duck(t) { const tt = t === undefined ? AT : t, bob = 3 * Math.sin(tt * 2), blink = aBlinkAt(3.1), wag = 8 * Math.sin(tt * 6) * (Math.sin(tt * .9) > .5 ? 1 : .15);
  return `<g transform="translate(0 ${n2(bob)}) rotate(${n2(1.5 * Math.sin(tt * 2 + 1))})"><g transform="rotate(${n2(wag)} -118 -56)"><path d="M-112 -40 Q-160 -62 -156 -92 Q-126 -84 -100 -72z" fill="#5A4A3E" stroke="${AL}" stroke-width="5" stroke-linejoin="round"/></g>
  <path d="M-122 -34 Q-140 -78 -90 -84 Q-30 -96 30 -88 Q84 -80 92 -44 Q76 -4 0 -2 Q-92 -2 -122 -34z" fill="url(#aDuckB)" stroke="${AL}" stroke-width="5" stroke-linejoin="round"/>
  <path d="M40 -86 Q92 -78 92 -44 Q84 -18 50 -8 Q30 -40 40 -86z" fill="#9A5E3A"/><path d="M-122 -34 Q-140 -78 -90 -84 Q-30 -96 30 -88 Q84 -80 92 -44 Q76 -4 0 -2 Q-92 -2 -122 -34z" fill="none" stroke="${AL}" stroke-width="5" stroke-linejoin="round"/>
  <path d="M-84 -66 Q-30 -90 30 -68 Q0 -30 -64 -40z" fill="#C2C7D6" stroke="#7E86A0" stroke-width="4" stroke-linejoin="round"/>${[[-54, -60], [-26, -64], [2, -60], [-40, -48], [-12, -50]].map(([x, y]) => `<path d="M${x - 10} ${y} q10 11 20 0" fill="none" stroke="#7E86A0" stroke-width="3" stroke-linecap="round"/>`).join("")}<path d="M-70 -44 l34 -4" stroke="#3A6FD0" stroke-width="8" stroke-linecap="round"/>
  <path d="M44 -74 Q40 -118 70 -138" fill="none" stroke="#17703E" stroke-width="46" stroke-linecap="round"/><path d="M44 -74 Q40 -118 70 -138" fill="none" stroke="#2FA65A" stroke-width="37" stroke-linecap="round"/>
  <circle cx="82" cy="-146" r="40" fill="url(#aDuckH)" stroke="#17703E" stroke-width="5"/><path d="M34 -84 q22 12 46 0" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round"/>
  <path d="M112 -156 Q164 -152 172 -140 Q162 -126 114 -128 Q122 -142 112 -156z" fill="#FFC83A" stroke="#C98200" stroke-width="4.5" stroke-linejoin="round"/><path d="M120 -141 Q146 -138 166 -140" fill="none" stroke="#C98200" stroke-width="3" stroke-linecap="round"/>
  ${aEye(94, -156, 14, { blink })}${aBlush(98, -128, 10, "#FFB0A0", .5)}<path d="M58 -176 q16 -8 30 -2" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".35"/></g>
  <path d="M-150 0 q20 -10 40 0 M90 0 q20 -10 40 0 M-40 6 q30 -8 60 0" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity="${n2(.5 + .25 * Math.sin(tt * 2))}" transform="translate(${n2(6 * Math.sin(tt * 2))} 0)"/>`; }
// a hen (an animal that lives only on land): a round body, a small wing, a red comb and wattle, a short beak, two legs. origin = its feet; faces right. o: sit, bob
function hen(o = {}) { const sit = o.sit || 0, ph = o.ph || 0, pk = Math.max(0, Math.sin(AT * 1.5 + ph)) ** 6, bob = (o.bob || 0) + pk * 1.6, blink = aBlinkAt(ph + 1.5);
  return `<g transform="translate(0 ${n2(sit * 36)})">${sit > .7 ? "" : `<path d="M-20 -40 V0 l-16 7 M-20 0 l14 8 M26 -40 V0 l-16 7 M26 0 l14 8" stroke="#E0A030" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`}
  <g transform="rotate(${n2(4 * Math.sin(AT * 2.2 + ph))} -100 -100)"><path d="M-92 -112 Q-176 -214 -150 -112 Q-196 -132 -152 -78 Q-120 -62 -88 -76z" fill="#7A4A2A" stroke="#5A3218" stroke-width="5" stroke-linejoin="round"/></g>
  ${aBr(`<path d="M-114 -100 Q-114 -28 -20 -28 H40 Q114 -32 114 -124 Q112 -176 66 -186 Q40 -152 -20 -152 Q-94 -152 -114 -100z" fill="url(#aHen)" stroke="#5A3218" stroke-width="5" stroke-linejoin="round"/><ellipse cx="40" cy="-70" rx="50" ry="34" fill="#F2D2A4" opacity=".55"/>
  <path d="M-74 -112 Q-20 -154 44 -112 Q12 -46 -54 -64z" fill="#A86A36" stroke="#5A3218" stroke-width="4" stroke-linejoin="round"/><path d="M-44 -102 q24 -14 48 0 M-36 -84 q20 -10 40 0" stroke="#5A3218" stroke-width="3" fill="none" opacity=".6"/>`, .016, ph, -28)}
  <g transform="translate(86 -192) rotate(${n2(bob * 14)})"><path d="M-26 -34 q4 -30 20 -8 q8 -30 22 -4 q18 -18 14 12z" fill="#F0425F" stroke="#A81F3C" stroke-width="4" stroke-linejoin="round"/><circle r="44" fill="url(#aHen)" stroke="#5A3218" stroke-width="5"/>
  <path d="M38 -8 l34 12 l-34 12z" fill="#F7B531" stroke="#C98200" stroke-width="4" stroke-linejoin="round"/><path d="M26 24 q12 26 -6 24 q-8 -8 6 -24z" fill="#F0425F" stroke="#A81F3C" stroke-width="3"/>${aEye(12, -8, 14, { blink })}${aBlush(6, 20, 10)}</g></g>`; }
// one feather (a quill with soft barbs). origin = its middle
const feather = (col = "#3CC6E8", dk = "#157FB8") => `<g transform="rotate(${n2(3 * Math.sin(AT * 1.8))})"><path d="M-120 60 Q-60 -40 60 -70 Q120 -78 130 -60 Q110 10 0 50 Q-60 68 -120 60z" fill="${col}" stroke="${dk}" stroke-width="5" stroke-linejoin="round"/><path d="M-150 80 Q-40 20 124 -62" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>${[-80, -50, -20, 10, 40, 70].map((x) => `<path d="M${x} ${n2(42 - (x + 80) * .58)} l14 -34 M${x} ${n2(42 - (x + 80) * .58)} l26 12" stroke="${dk}" stroke-width="3" stroke-linecap="round" opacity=".7"/>`).join("")}</g>`;

/* ---------- fish ---------- */
// a fish. origin = its middle; faces right. It always swims (its tail and fins beat). o: wag (a time; default AT), pal {body, line, fin, finLine, scale},
// scales (false hides them), spots, barbel, bigTail, gill (the red of the gills showing 0..1), cod (three fins on its back), fancy (a guppy's patterned tail), ph
const FISHPAL = { body: "url(#fFish)", line: "#34608A", fin: "#FFB648", finLine: "#B8741A", scale: "#5E90BC" };
function fishG(o = {}) { const c = o.pal || FISHPAL, tt = (o.wag === undefined ? AT : o.wag) + (o.ph || 0), wg = 13 * Math.sin(tt * 7), tk = o.bigTail || 1, blink = aBlinkAt((o.ph || 0) + 4); let sc = "";
  if (o.scales !== false) for (let r = 0; r < 7; r++) for (let i = 0; i < 9; i++) { const x = -112 + i * 22 + (r % 2) * 11, y = -42 + r * 14, hh = 60 * Math.sqrt(Math.max(0, 1 - Math.pow((x + 14) / 126, 2))); if (Math.abs(y) < hh - 12 && x < 56) sc += `<path d="M${x} ${y - 6} q8 10 0 20" fill="none" stroke="${c.scale || c.line}" stroke-width="2.6" stroke-linecap="round" opacity=".7"/>`; }
  const dorsal = o.cod ? [[-96, 44], [-40, 50], [22, 44]].map(([x, w]) => `<path d="M${x} -50 Q${x + w * .5} ${-96} ${x + w} -52z" fill="${c.fin}" stroke="${c.finLine}" stroke-width="5" stroke-linejoin="round"/>`).join("") + `<path d="M-80 52 Q-56 84 -30 56z M-14 56 Q8 84 30 52z" fill="${c.fin}" stroke="${c.finLine}" stroke-width="5" stroke-linejoin="round"/>`
    : `<path d="M-58 -54 Q-10 -118 64 -52z" fill="${c.fin}" stroke="${c.finLine}" stroke-width="5" stroke-linejoin="round"/><path d="M-30 -62 l8 -22 M-6 -64 l10 -26 M20 -60 l8 -20" stroke="${c.finLine}" stroke-width="3" opacity=".6" stroke-linecap="round"/><path d="M-40 52 Q-22 90 16 56z" fill="${c.fin}" stroke="${c.finLine}" stroke-width="5" stroke-linejoin="round"/>`;
  return `<g transform="rotate(${n2(-wg * .12)})"><g transform="translate(-124 0) rotate(${n2(wg)}) scale(${tk})"><path d="M8 0 L-74 -68 Q-90 -64 -84 -44 Q-62 0 -84 44 Q-90 64 -74 68z" fill="${c.fin}" stroke="${c.finLine}" stroke-width="5" stroke-linejoin="round"/><path d="M-10 0 L-62 -36 M-10 0 L-66 0 M-10 0 L-62 36" stroke="${c.finLine}" stroke-width="3" opacity=".6" stroke-linecap="round"/>
  ${o.fancy ? [[-48, -28, 8], [-56, 6, 9], [-44, 34, 7], [-30, -4, 6]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#FFE27A" stroke="${c.finLine}" stroke-width="2.5"/>`).join("") : ""}</g>
  ${dorsal}
  <path d="M-136 0 Q-76 -76 34 -62 Q120 -48 154 -4 Q120 46 34 62 Q-76 76 -136 0z" fill="${c.body}" stroke="${c.line}" stroke-width="5" stroke-linejoin="round"/>${sc}
  ${o.spots ? [[-80, -10], [-40, -30], [0, -8], [-60, 22], [-10, 26], [30, -30]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="${c.line}" opacity=".4"/>`).join("") : ""}
  <path d="M-96 -22 Q-20 -52 60 -40" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".45"/>
  <path d="M78 -46 Q54 0 78 44" fill="none" stroke="${c.line}" stroke-width="5" stroke-linecap="round"/><path d="M86 -40 Q66 0 86 38" fill="none" stroke="#E86A6A" stroke-width="5" stroke-linecap="round" opacity="${o.gill === undefined ? 0 : n2(o.gill)}"/>
  <g transform="translate(44 16) rotate(${n2(24 + wg * 1.3)})"><path d="M0 0 Q-34 6 -52 36 Q-14 36 0 0z" fill="${c.fin}" stroke="${c.finLine}" stroke-width="4" stroke-linejoin="round"/></g>
  ${blink ? aEye(112, -12, 17, { blink: 1, line: c.line }) : `<circle cx="112" cy="-12" r="23" fill="#fff" stroke="${c.line}" stroke-width="4"/>` + aEye(115, -12, 16)}${aBlush(110, 22, 11)}
  <path d="M152 4 q-10 14 -26 8" fill="none" stroke="${c.line}" stroke-width="4.5" stroke-linecap="round"/>
  ${o.barbel ? `<path d="M134 24 q5 16 -4 26" fill="none" stroke="${c.line}" stroke-width="4" stroke-linecap="round"/>` : ""}</g>`; }
const CODPAL = { body: "#C2B284", line: "#6A5A32", fin: "#B09C68", finLine: "#6A5A32", scale: "#7A6A40" }, GUPPAL = { body: "#A6D8EE", line: "#2C6F92", fin: "#FF8A4C", finLine: "#C0501C", scale: "#3F86AC" };
// the mudskipper (the giant mudskipper of Sungei Buloh): a long body that tapers to the tail, a blunt head, two big eyes close together ON TOP of its head,
// a wide mouth, strong front fins it props itself up and "walks" on, a tall back fin, mud-brown skin with pale blue speckles.
// origin = its belly on the mud; faces left. o: prop 0..1 (pushed up on its fins), push 0..1 (the front fin swept back: a hop), blink, fin (back fin raised 0..1), ph
function mudskipper(o = {}) { const ph = o.ph || 0, pr = o.prop === undefined ? 1 : o.prop, up = 14 * pr, df = (o.fin === undefined ? 1 : o.fin) * (.9 + .1 * Math.sin(AT * 2.6 + ph)), blink = o.blink === undefined ? aBlinkAt(ph + .4) : o.blink, pu = o.push || 0, tw_ = 8 * Math.sin(AT * 3.1 + ph), ch = .5 + .5 * Math.sin(AT * 3.4 + ph); let sp = "", sc = "";
  for (let i = 0; i < 11; i++) sp += `<circle cx="${n2(-56 + i * 19)}" cy="${n2(-52 + 9 * Math.sin(i * 2.1) + i * 2.2)}" r="3.4" fill="#8CE0F0" opacity=".95"/>`;
  for (let r = 0; r < 2; r++) for (let i = 0; i < 8; i++) sc += `<path d="M${-40 + i * 22 + r * 11} ${n2(-62 + r * 13 + i * 3)} q-7 8 0 16" fill="none" stroke="#5E4E34" stroke-width="2.2" stroke-linecap="round" opacity=".45"/>`;
  const eye = (x, r) => `<g transform="translate(${x} -98) scale(1 ${blink ? .7 : 1})"><circle r="${r + 7}" fill="url(#fMsk)" stroke="#5E4E34" stroke-width="5"/>${blink ? aEye(-1, 2, r - 2, { blink: 1, line: "#5E4E34" }) : aEye(-2, -2, r - 3, { ring: "#FFF0B8", line: "#5E4E34" })}</g>`;
  return `<g transform="rotate(${n2(-5 * pr - 4 * pu)})"><g transform="translate(0 ${n2(-up)})">
  <g transform="rotate(${n2(tw_)} 150 -26)"><path d="M146 -34 L210 -70 Q226 -62 218 -34 Q212 -16 222 0 Q200 6 146 -18z" fill="#A8926C" stroke="#5E4E34" stroke-width="5" stroke-linejoin="round"/><path d="M160 -28 L204 -52 M160 -24 L208 -18" stroke="#5E4E34" stroke-width="3" opacity=".5" stroke-linecap="round"/></g>
  <path d="M60 -62 Q100 -84 142 -40 L70 -56z" fill="#C8AE7E" stroke="#5E4E34" stroke-width="4.5" stroke-linejoin="round"/>
  <g transform="translate(-36 -78) scale(1 ${n2(.22 + .78 * df)})"><path d="M0 0 Q14 -76 56 -84 Q104 -66 116 14z" fill="#D2B886" stroke="#5E4E34" stroke-width="5" stroke-linejoin="round"/><path d="M22 -6 L44 -72 M52 -2 L70 -70 M82 6 L92 -52" stroke="#5E4E34" stroke-width="3" opacity=".45" stroke-linecap="round"/>${[[30, -40], [56, -56], [82, -40], [58, -24], [96, -14]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5.5" fill="#3A8DFF" opacity=".85"/>`).join("")}</g>
  <path d="M-160 -48 Q-162 -98 -104 -100 Q-36 -96 44 -72 Q112 -52 158 -34 Q152 -12 60 -8 Q-60 0 -130 -8 Q-160 -18 -160 -48z" fill="url(#fMsk)" stroke="#5E4E34" stroke-width="5" stroke-linejoin="round"/>
  <path d="M-124 -15 Q-20 -5 120 -18" fill="none" stroke="#F4E9CC" stroke-width="9" stroke-linecap="round" opacity=".6"/>${sc}${sp}
  <path d="M-66 -34 Q-52 -60 -60 -84" fill="none" stroke="#5E4E34" stroke-width="4" stroke-linecap="round" opacity=".75"/><ellipse cx="-92" cy="-46" rx="${n2(15 + 3 * ch)}" ry="${n2(10 + 2 * ch)}" fill="#FF8FA3" opacity=".5"/>
  <path d="M-158 -46 Q-132 -22 -96 -30" fill="none" stroke="#5E4E34" stroke-width="5" stroke-linecap="round"/><path d="M-96 -30 q5 -4 5 -10" fill="none" stroke="#5E4E34" stroke-width="4" stroke-linecap="round"/>
  ${eye(-84, 21)}${eye(-126, 22)}</g>
  <g transform="translate(-40 ${n2(-34 - up)}) rotate(${n2(-16 * pr + 46 * pu)})"><path d="M-12 -4 Q-16 ${n2(16 + up * .5)} -10 ${n2(22 + up)} L-46 ${n2(34 + up)} Q-22 ${n2(48 + up)} 22 ${n2(34 + up)} Q14 ${n2(14 + up * .5)} 14 -4z" fill="#D2B886" stroke="#5E4E34" stroke-width="5" stroke-linejoin="round"/><path d="M-4 ${n2(22 + up)} L-28 ${n2(36 + up)} M2 ${n2(24 + up)} L-6 ${n2(40 + up)} M8 ${n2(22 + up)} L14 ${n2(36 + up)}" stroke="#5E4E34" stroke-width="3" opacity=".5" stroke-linecap="round"/></g></g>`; }
// a sea star (a starfish): five arms, a bumpy skin, no scales, no gills. origin = its middle. Its arm tips curl a little
function seaStar(o = {}) { const ph = o.ph || 0, blink = aBlinkAt(ph + 5); let d = ""; for (let i = 0; i < 10; i++) { const a = (i * 36 - 90 + (i % 2 ? 0 : 5 * Math.sin(AT * 1.6 + i + ph))) * Math.PI / 180, r = i % 2 ? 46 : 112 + 4 * Math.sin(AT * 1.6 + i * 2 + ph); d += (i ? "L" : "M") + n2(Math.cos(a) * r) + " " + n2(Math.sin(a) * r); }
  return `<path d="${d}z" fill="#F27A3C" stroke="#B84A18" stroke-width="24" stroke-linejoin="round"/><path d="${d}z" fill="url(#aStar)" stroke="#FF9550" stroke-width="13" stroke-linejoin="round"/>${[0, 1, 2, 3, 4].map((i) => { const a = (i * 72 - 90) * Math.PI / 180; return [58, 80, 100].map((r) => `<circle cx="${n2(Math.cos(a) * r)}" cy="${n2(Math.sin(a) * r)}" r="5" fill="#FFD9B8"/>`).join(""); }).join("")}
  ${aEye(-17, -8, 11, { blink })}${aEye(17, -8, 11, { blink })}${aBlush(-34, 10, 9)}${aBlush(34, 10, 9)}<path d="M-9 12 q9 9 18 0" fill="none" stroke="#B84A18" stroke-width="4" stroke-linecap="round"/>`; }
// an ant (three body parts, SIX legs on the middle part, two feelers) and a spider (two body parts, EIGHT legs), seen from above. origin = the middle. The legs and feelers move
function ant(o = {}) { const w = Math.sin(AT * 5), blink = aBlinkAt(6);
  const lg2 = (sx, sy, k) => `<path d="M${sx * 10} 0 L${n2(sx * 44 + k * 5)} ${sy * 50} L${n2(sx * 70 + k * 9)} ${sy * 30}"/>`, lgm = (sy, k) => `<path d="M0 0 L${n2(k * 4)} ${sy * 62} L${n2(-14 + k * 8)} ${sy * 84}"/>`;
  return `<g stroke="#3A2418" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">${lg2(-1, -1, w)}${lg2(1, -1, -w)}${lg2(-1, 1, -w)}${lg2(1, 1, w)}${lgm(-1, -w)}${lgm(1, w)}<path d="M92 -12 Q${n2(120 + 4 * w)} ${n2(-46 + 5 * w)} ${n2(148 + 5 * w)} ${n2(-40 + 8 * w)} M92 12 Q${n2(120 - 4 * w)} ${n2(46 + 5 * w)} ${n2(148 - 5 * w)} ${n2(40 + 8 * w)}" stroke-width="5.5"/></g>
  <ellipse cx="-68" cy="0" rx="48" ry="34" fill="#8A4F2A" stroke="#3A2418" stroke-width="5"/><ellipse cx="-78" cy="-10" rx="20" ry="9" fill="#fff" opacity=".2"/><ellipse cx="0" cy="0" rx="28" ry="21" fill="#A0602F" stroke="#3A2418" stroke-width="5"/><circle cx="64" cy="0" r="33" fill="#8A4F2A" stroke="#3A2418" stroke-width="5"/>
  ${aEye(74, -14, 10, { blink })}${aEye(74, 14, 10, { blink })}<path d="M94 -7 q7 7 0 14" fill="none" stroke="#3A2418" stroke-width="3.5" stroke-linecap="round"/>`; }
function spider(o = {}) { const w = Math.sin(AT * 4), blink = aBlinkAt(7);
  return `<g stroke="#2B2147" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">${[-1, 1].map((s) => [[-20, -70, -64, -96], [-6, -84, -30, -122], [10, -84, 34, -122], [24, -70, 70, -96]].map(([a, b, c2, d], i) => { const k = (i % 2 ? 1 : -1) * s * w * 6; return `<path d="M${a * .6 + 26} 0 L${n2(a + 26 + k * .5)} ${s * -b * .8} L${n2(c2 + 26 + k)} ${s * -d * .86}"/>`; }).join("")).join("")}</g>
  <ellipse cx="-44" cy="0" rx="58" ry="48" fill="#5A527E" stroke="#2B2147" stroke-width="5"/><path d="M-72 -16 q26 -16 52 0" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".3"/><ellipse cx="34" cy="0" rx="38" ry="32" fill="#6E6696" stroke="#2B2147" stroke-width="5"/>
  ${aEye(50, -13, 10, { blink })}${aEye(50, 13, 10, { blink })}<path d="M68 -7 q7 7 0 14" fill="none" stroke="#2B2147" stroke-width="3.5" stroke-linecap="round"/>${aBlush(36, -22, 6)}${aBlush(36, 22, 6)}`; }
