// bugs.js: EP6's small animals, drawn true (the plan's realism notes): the ant (six legs, ALL joined to the middle part, the thorax; two
// elbowed feelers on the head; head, thorax and a segmented abdomen; a hard, glossy body), the garden spider (a St Andrew's cross spider in
// its web: eight legs, two body parts, no feelers), the grasshopper (two pairs of wings), the Aedes mosquito (one pair of wings), a
// butterfly, a moth, and the pigeon (feathers, two legs). Pure functions of their arguments.
const XDEFS7 = () => `${lg("antG", [[0, "#5C4338"], [.5, "#2E221E"], [1, "#16100E"]])}${lg("antL", [[0, "#6A5248"], [1, "#3A2C26"]])}
  ${lg("hopG", [[0, "#A6DE5A"], [1, "#4E9E2E"]])}${lg("hopW", [[0, "#F8E7C6", .85], [1, "#E8B9A0", .55]])}${lg("pigG", [[0, "#B6BECF"], [1, "#7E879C"]])}${lg("pigN", [[0, "#5FBF8A"], [.5, "#8A6AB8"], [1, "#6A7690"]], 1, 0)}
  ${lg("spCe", [[0, "#F4F4F8"], [1, "#B9BCC8"]])}${lg("bflyW", [[0, "#FFE58A"], [1, "#F2A93A"]])}${lg("mothW", [[0, "#C9A57E"], [1, "#8A6A4E"]])}`;

/* ---------- the ant, side view, facing right. origin = the ground under its thorax. Length about 640 px at k = 1.
   o: glow [6] (each leg 0..1, front to back: 1 near-front, 2 far-front, 3 near-middle, 4 far-middle, 5 near-hind, 6 far-hind),
      parts [3] (head, thorax, abdomen glow), feel (feelers glow), clean (0..1: the near front leg lifts to clean a feeler), walk (phase, radians),
      shine (0..1: a gloss sweeps from head to abdomen), cleanAnt (0..1 the near feeler bends down to be cleaned) ---------- */
const ANT_HIP = [[96, -126], [110, -132], [48, -120], [62, -126], [-4, -120], [10, -126]];
function antLegPts(i, o = {}) { const far = i % 2 === 1, pair = i >> 1, w = o.walk, tri = (i === 0 || i === 3 || i === 4) ? 0 : Math.PI;   // tripod gait
  const base = [[[172, -100], [218, 0]], [[192, -108], [250, -6]], [[78, -74], [64, 0]], [[100, -80], [98, -6]], [[-70, -82], [-150, 0]], [[-44, -88], [-116, -6]]][i];
  let [k, f] = base.map((p) => [...p]); if (w !== undefined) { const s = Math.sin(w + tri), lift = Math.max(0, Math.cos(w + tri)); f[0] += 26 * s; f[1] -= 16 * lift; k[0] += 12 * s; k[1] -= 10 * lift; }
  if (i === 0 && o.clean) { const c = eio(o.clean); k = [lerp(k[0], 214, c), lerp(k[1], -168, c)]; f = [lerp(f[0], 232, c), lerp(f[1], -232, c)]; }
  return { h: ANT_HIP[i], k, f, far }; }
function antLeg(i, o = {}) { const { h, k, f, far } = antLegPts(i, o), g = (o.glow || [])[i] || 0, col = far ? "url(#antL)" : "url(#antG)", w1 = far ? 12 : 15, w2 = far ? 9 : 11;
  const t1 = [lerp(k[0], f[0], .72), lerp(k[1], f[1], .72)];
  return (g > .02 ? `<path d="M${h[0]} ${h[1]} L${n2(k[0])} ${n2(k[1])} L${n2(f[0])} ${n2(f[1])}" fill="none" stroke="${P.sun}" stroke-width="${n2(30 + 10 * g)}" stroke-linecap="round" stroke-linejoin="round" opacity="${n2(.85 * g)}" filter="url(#b4)"/>` : "")
    + `<path d="M${h[0]} ${h[1]} L${n2(k[0])} ${n2(k[1])}" stroke="${col}" stroke-width="${w1}" stroke-linecap="round"/><path d="M${n2(k[0])} ${n2(k[1])} L${n2(t1[0])} ${n2(t1[1])}" stroke="${col}" stroke-width="${w2}" stroke-linecap="round"/>
    <path d="M${n2(t1[0])} ${n2(t1[1])} L${n2(f[0])} ${n2(f[1])}" stroke="${col}" stroke-width="${w2 - 3}" stroke-linecap="round" stroke-dasharray="11 4"/><circle cx="${n2(k[0])}" cy="${n2(k[1])}" r="${w1 * .55}" fill="${far ? "#4A3A32" : "#3A2C26"}"/>
    ${far ? "" : `<path d="M${h[0] + 3} ${h[1] - 2} L${n2(k[0] + 2)} ${n2(k[1] - 3)}" stroke="#A88A78" stroke-width="3" stroke-linecap="round" opacity=".5"/>`}`; }
function antFeeler(far, o = {}) { const c = o.cleanAnt || 0, b = far ? [188, -212] : [206, -210], e = far ? [228, -322] : [250, -318];
  const tip = far ? [332, -300] : [lerp(366, 262, c), lerp(-280, -216, c)], mid = far ? [290, -320] : [lerp(320, 268, c), lerp(-312, -270, c)];
  const g = o.feel || 0, d = `M${b[0]} ${b[1]} L${e[0]} ${e[1]} Q${n2(mid[0])} ${n2(mid[1])} ${n2(tip[0])} ${n2(tip[1])}`;
  return (g > .02 ? `<path d="${d}" fill="none" stroke="${P.sun}" stroke-width="${n2(26 + 8 * g)}" stroke-linecap="round" stroke-linejoin="round" opacity="${n2(.85 * g)}" filter="url(#b4)"/>` : "")
    + `<path d="${d}" fill="none" stroke="${far ? "#4A3A32" : "#2A201C"}" stroke-width="${far ? 7 : 9}" stroke-linecap="round" stroke-linejoin="round"/>` + `<circle cx="${n2(tip[0])}" cy="${n2(tip[1])}" r="${far ? 6 : 8}" fill="${far ? "#4A3A32" : "#2A201C"}"/>`; }
function antBig(o = {}) { const p = o.parts || [0, 0, 0], sh = o.shine === undefined ? -1 : o.shine, gl = (x) => sh < 0 ? 0 : Math.exp(-Math.pow((x - lerp(260, -330, sh)) / 70, 2));
  const pg = (cx, cy, rx, ry, a, rot = 0) => a > .02 ? `<ellipse cx="${cx}" cy="${cy}" rx="${n2(rx + 26)}" ry="${n2(ry + 26)}" fill="${P.sun}" opacity="${n2(.75 * a)}" filter="url(#b10)" transform="rotate(${rot} ${cx} ${cy})"/>` : "";
  let s = `<ellipse cx="20" cy="4" rx="300" ry="16" fill="${P.ink}" opacity=".22" filter="url(#b4)"/>`;
  s += [1, 3, 5].map((i) => antLeg(i, o)).join("") + antFeeler(true, o);
  s += pg(-200, -150, 128, 90, p[2], 10) + pg(40, -150, 90, 50, p[1]) + pg(186, -168, 72, 60, p[0]);
  // abdomen (gaster) in segments, the waist (petiole), the thorax, the head
  s += `<g transform="rotate(10 -200 -150)"><ellipse cx="-200" cy="-150" rx="128" ry="90" fill="url(#antG)"/>${[-130, -190, -250].map((x, i) => `<path d="M${x} ${-226 + i * 6} Q${x - 26} -150 ${x} ${-74 - i * 6}" fill="none" stroke="#120C0A" stroke-width="5" opacity=".55"/><path d="M${x + 4} ${-222 + i * 6} Q${x - 18} -186 ${x - 14} -168" fill="none" stroke="#9A7E70" stroke-width="3" opacity=".35"/>`).join("")}
    <ellipse cx="-190" cy="-200" rx="70" ry="22" fill="#fff" opacity="${n2(.18 + .55 * gl(-200))}" transform="rotate(-8 -190 -200)"/></g>
  <ellipse cx="-62" cy="-140" rx="22" ry="28" fill="url(#antG)"/><path d="M-80 -130 Q-62 -110 -40 -128" fill="none" stroke="#120C0A" stroke-width="4" opacity=".5"/>
  <path d="M-46 -130 Q-34 -180 30 -186 Q100 -188 120 -160 Q124 -126 84 -116 Q12 -108 -42 -114z" fill="url(#antG)"/><path d="M-20 -164 Q30 -184 96 -176" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity="${n2(.16 + .55 * gl(40))}"/>
  <path d="M112 -150 Q130 -160 140 -150" fill="none" stroke="#2E221E" stroke-width="16" stroke-linecap="round"/>
  <ellipse cx="186" cy="-168" rx="72" ry="60" fill="url(#antG)" transform="rotate(-8 186 -168)"/><ellipse cx="206" cy="-186" rx="17" ry="21" fill="#0E0A08"/><ellipse cx="200" cy="-194" rx="6" ry="7" fill="#fff" opacity=".7"/>
  <ellipse cx="170" cy="-206" rx="34" ry="12" fill="#fff" opacity="${n2(.16 + .55 * gl(186))}" transform="rotate(-14 170 -206)"/>
  <path d="M248 -150 Q282 -146 290 -122 Q270 -130 250 -126z M240 -134 Q270 -120 272 -98 Q252 -110 236 -118z" fill="#3A2C26" stroke="#120C0A" stroke-width="3" stroke-linejoin="round"/>`;
  s += [0, 2, 4].map((i) => antLeg(i, o)).join("") + antFeeler(false, o);
  return s; }
// the leg tips and knees (for numbers and labels), in ant coordinates
const antLegTip = (i, o = {}) => antLegPts(i, o).f, antLegKnee = (i, o = {}) => antLegPts(i, o).k;
// a small walking ant (the line of ants along the path): k = scale, ph = walk phase
const antSmall = (ph) => antBig({ walk: ph });

/* ---------- the garden spider (a St Andrew's cross spider), seen from the front/top, head up. origin = where its two body parts meet.
   o: glow [8] legs (1-4 on its left, top to bottom; 5-8 on its right), parts [2] (head-and-body part, abdomen), id (for the clip) ---------- */
const SP_DIR = [[-122, -26], [-150, -14], [165, 14], [128, 24]];   // [first segment angle, bend] for the legs on its left (mirrored on the right)
function spiderLegPts(i) { const sd = i < 4 ? -1 : 1, j = i % 4, [a0, bend] = SP_DIR[j], hip = [sd * 40, -86 + j * 20];
  const a = (sd < 0 ? a0 : 180 - a0) * Math.PI / 180, b = (sd < 0 ? a0 + bend : 180 - a0 - bend) * Math.PI / 180, L1 = [150, 150, 140, 150][j], L2 = [190, 170, 150, 180][j];
  const k = [hip[0] + Math.cos(a) * L1, hip[1] + Math.sin(a) * L1 - 30], f = [k[0] + Math.cos(b) * L2, k[1] + Math.sin(b) * L2 + (j < 2 ? 10 : 20)];
  return { h: hip, k, f }; }
function spiderBig(o = {}) { const id = o.id || "sp", p = o.parts || [0, 0]; let legs = "";
  for (let i = 0; i < 8; i++) { const { h, k, f } = spiderLegPts(i), g = (o.glow || [])[i] || 0, d = `M${n2(h[0])} ${n2(h[1])} L${n2(k[0])} ${n2(k[1])} L${n2(f[0])} ${n2(f[1])}`;
    legs += (g > .02 ? `<path d="${d}" fill="none" stroke="${P.sun}" stroke-width="${n2(32 + 8 * g)}" stroke-linecap="round" stroke-linejoin="round" opacity="${n2(.85 * g)}" filter="url(#b4)"/>` : "")
      + `<path d="${d}" fill="none" stroke="#2A2220" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#E8C24A" stroke-width="8" stroke-linecap="butt" stroke-linejoin="round" stroke-dasharray="26 18"/><circle cx="${n2(k[0])}" cy="${n2(k[1])}" r="8" fill="#2A2220"/>`; }
  const pg = (cy, rx, ry, a) => a > .02 ? `<ellipse cx="0" cy="${cy}" rx="${rx + 26}" ry="${ry + 26}" fill="${P.sun}" opacity="${n2(.75 * a)}" filter="url(#b10)"/>` : "";
  return legs + pg(-60, 50, 56, p[0]) + pg(100, 86, 108, p[1])
    + `<clipPath id="ab_${id}"><ellipse cx="0" cy="100" rx="86" ry="108"/></clipPath><ellipse cx="0" cy="100" rx="86" ry="108" fill="#F4D23A" stroke="#3A2E1E" stroke-width="5"/>
    <g clip-path="url(#ab_${id})">${[30, 70, 112, 152, 190].map((y, i) => `<path d="M-100 ${y} Q0 ${y + 24} 100 ${y}" fill="none" stroke="${i % 2 ? "#F8F4E8" : "#2A2220"}" stroke-width="${i % 2 ? 12 : 16}"/>`).join("")}<ellipse cx="-30" cy="60" rx="24" ry="40" fill="#fff" opacity=".3"/></g>
    <ellipse cx="0" cy="-60" rx="50" ry="56" fill="url(#spCe)" stroke="#5A5A66" stroke-width="5"/><path d="M0 -104 V-20 M-26 -70 Q0 -52 26 -70" fill="none" stroke="#8A8A98" stroke-width="5" stroke-linecap="round"/>
    ${[[-12, -96], [12, -96], [-22, -86], [22, -86]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#1A1416"/>`).join("")}<path d="M-12 -112 q-4 12 2 18 M12 -112 q4 12 -2 18" fill="none" stroke="#3A2E2A" stroke-width="7" stroke-linecap="round"/>`; }
const spiderLegTip = (i) => spiderLegPts(i).f;
// the web: radial threads, a spiral, and the white zig-zag cross the St Andrew's cross spider is named for. origin = the hub
function spiderWeb(R = 330, t = 0, o = {}) { let s = "", sp = ""; const N = 18, op = o.op || .75;
  for (let i = 0; i < N; i++) { const a = i / N * Math.PI * 2 + .1, rr = R * (.86 + .14 * hash(i, 5)); s += `<path d="M0 0 L${n2(Math.cos(a) * rr)} ${n2(Math.sin(a) * rr)}"/>`; }
  for (let k = 0; k < 13 * N; k++) { const a = k / N * Math.PI * 2 + .1, rr = 50 + (R - 70) * k / (13 * N); sp += `${k ? "L" : "M"}${n2(Math.cos(a) * rr)} ${n2(Math.sin(a) * rr + 2 * Math.sin(t * 1.3 + k))}`; }
  let zz = ""; for (const a of [-135, -45, 45, 135]) { const r = a * Math.PI / 180, nx = -Math.sin(r), ny = Math.cos(r); let d = ""; for (let j = 0; j <= 14; j++) { const u = 60 + j * 14, w = (j % 2 ? 12 : -12); d += `${j ? "L" : "M"}${n2(Math.cos(r) * u + nx * w)} ${n2(Math.sin(r) * u + ny * w)}`; } zz += `<path d="${d}"/>`; }
  return `<g fill="none" stroke="#fff" stroke-width="${o.w || 2.4}" opacity="${op}">${s}<path d="${sp}"/></g><g fill="none" stroke="#fff" stroke-width="${(o.w || 2.4) * 2.6}" stroke-linejoin="round" opacity="${n2(op * .95)}">${zz}</g>`; }

/* ---------- the grasshopper, side view, facing right. origin = the ground under its middle. o: spread (0 folded .. 1 wings open: two pairs) ---------- */
function grasshopper(o = {}) { const sp = o.spread || 0;
  const fw = sp > .02 ? `<g transform="translate(-10 -150) rotate(${n2(-42 * sp)})"><path d="M0 0 Q-120 -40 -280 -20 Q-150 10 0 12z" fill="#7DB84A" stroke="#3E7A2A" stroke-width="4" opacity=".95"/>${[-60, -130, -200].map((x) => `<path d="M0 4 Q${x / 2} -10 ${x} -14" fill="none" stroke="#3E7A2A" stroke-width="2" opacity=".6"/>`).join("")}</g>
    <g transform="translate(-14 -146) rotate(${n2(-18 * sp)})"><path d="M0 0 Q-60 -150 -250 -150 Q-280 -60 -250 0 Q-130 30 0 4z" fill="url(#hopW)" stroke="#C88A6A" stroke-width="3" opacity="${n2(sp)}"/>${[-.5, -.8, -1.1, -1.4, -1.7].map((a) => `<path d="M0 0 L${n2(Math.cos(Math.PI + a * .5) * 250)} ${n2(Math.sin(Math.PI + a * .5) * 150)}" stroke="#C88A6A" stroke-width="2" opacity="${n2(.6 * sp)}"/>`).join("")}</g>` : "";
  return `<ellipse cx="0" cy="4" rx="230" ry="12" fill="${P.ink}" opacity=".22" filter="url(#b4)"/>
  <path d="M-60 -120 L-40 -250 L-180 -40 L-196 0" fill="none" stroke="#4E9E2E" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" opacity=".55"/>
  ${fw}
  <path d="M60 -110 L80 -60 L100 0 M30 -110 L20 -60 L40 0" fill="none" stroke="#5EA634" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M-220 -120 Q-200 -170 -60 -168 Q60 -170 110 -150 Q140 -120 110 -104 Q-60 -86 -200 -104 Q-226 -108 -220 -120z" fill="url(#hopG)" stroke="#3E7A2A" stroke-width="5"/>${[-170, -130, -90, -50].map((x) => `<path d="M${x} -160 Q${x - 8} -130 ${x} -100" fill="none" stroke="#3E7A2A" stroke-width="3" opacity=".5"/>`).join("")}
  ${sp > .02 ? "" : `<path d="M-10 -166 Q-120 -190 -250 -136 Q-120 -150 -10 -148z" fill="#6FAE40" stroke="#3E7A2A" stroke-width="4"/>`}
  <path d="M20 -170 Q60 -186 110 -168 L120 -128 Q60 -118 20 -128z" fill="#8CCB4A" stroke="#3E7A2A" stroke-width="4"/>
  <path d="M110 -170 Q190 -200 200 -120 Q190 -86 140 -96 Q110 -110 110 -170z" fill="url(#hopG)" stroke="#3E7A2A" stroke-width="5"/><ellipse cx="168" cy="-150" rx="14" ry="18" fill="#3A2E1A"/><circle cx="164" cy="-156" r="4" fill="#fff"/>
  <path d="M170 -184 Q230 -260 300 -270 M156 -186 Q200 -260 260 -290" fill="none" stroke="#4E8E2E" stroke-width="5" stroke-linecap="round"/>
  <path d="M-30 -130 L-60 -260 L-170 -10" fill="none" stroke="#3E7A2A" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/><path d="M-30 -130 L-60 -260 L-170 -10" fill="none" stroke="#8CCB4A" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>${[0, 1, 2, 3].map((i) => `<path d="M${-38 - i * 6} ${-160 - i * 24} l14 8 l-14 8" fill="none" stroke="#3E7A2A" stroke-width="3"/>`).join("")}<path d="M-170 -10 L-200 0" stroke="#3E7A2A" stroke-width="8" stroke-linecap="round"/>
  <path d="M80 -112 L120 -60 L136 0 M44 -112 L50 -56 L70 0" fill="none" stroke="#3E7A2A" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/><path d="M80 -112 L120 -60 L136 0 M44 -112 L50 -56 L70 0" fill="none" stroke="#8CCB4A" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`; }

/* ---------- the Aedes mosquito (black with white bands), side view, facing right. origin = the ground under it ---------- */
function mosquito(o = {}) { const fl = o.flap || 0, wa = -22 + 14 * Math.sin(fl * 40);
  const leg = (x, kx, ky, fx) => `<path d="M${x} -150 Q${kx} ${ky} ${fx} 0" fill="none" stroke="#1E1A1C" stroke-width="7" stroke-linecap="round"/><path d="M${x} -150 Q${kx} ${ky} ${fx} 0" fill="none" stroke="#fff" stroke-width="7" stroke-dasharray="6 26" stroke-dashoffset="-14"/>`;
  return `<ellipse cx="0" cy="4" rx="230" ry="10" fill="${P.ink}" opacity=".2" filter="url(#b4)"/>
  ${leg(36, 70, -250, 140)}${leg(20, 10, -230, -40)}${leg(6, -120, -260, -230)}
  <g transform="translate(10 -176) rotate(${n2(wa)})"><path d="M0 0 Q-120 -70 -250 -40 Q-150 10 0 6z" fill="#E8F4FF" opacity=".7" stroke="#9AB0C8" stroke-width="3"/>${[-70, -140, -200].map((x) => `<path d="M0 2 Q${x / 2} -24 ${x} -30" fill="none" stroke="#9AB0C8" stroke-width="2"/>`).join("")}</g>
  <path d="M-10 -160 Q-120 -168 -200 -128 Q-210 -116 -190 -114 Q-110 -134 -10 -142z" fill="#2A2426"/>${[-50, -90, -130, -170].map((x) => `<path d="M${x} -160 L${x + 4} -134" stroke="#fff" stroke-width="6" opacity=".9"/>`).join("")}
  <ellipse cx="20" cy="-164" rx="40" ry="30" fill="#2A2426"/><path d="M8 -190 Q20 -172 34 -186 M16 -176 v18" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>
  <circle cx="74" cy="-170" r="22" fill="#2A2426"/><circle cx="82" cy="-174" r="9" fill="#5A4A50"/><path d="M92 -164 L200 -126" stroke="#2A2426" stroke-width="5" stroke-linecap="round"/>
  <path d="M84 -186 Q120 -230 150 -236 M80 -188 Q104 -240 120 -256" fill="none" stroke="#3A3236" stroke-width="3"/>${[0, 1, 2, 3].map((i) => `<path d="M${n2(96 + i * 12)} ${n2(-202 - i * 10)} l-8 -10 m8 10 l10 -6" stroke="#3A3236" stroke-width="2"/>`).join("")}
  ${leg(56, 120, -230, 190).replace(/-150/g, "-156")}${leg(36, 40, -220, 10).replace(/-150/g, "-150")}${leg(20, -80, -240, -170)}`; }

/* ---------- a butterfly perched on a flower, side view, wings up (two pairs: the front wings and the back wings); six legs ---------- */
function butterfly(o = {}) { const fl = o.flap === undefined ? 0 : .5 + .5 * Math.sin(o.flap * 5), sq = lerp(1, .55, fl);
  const legs = [[30, 70, 110], [10, 20, 40], [-10, -40, -60]].map(([h, k, f], i) => `<path d="M${h} -128 L${k} -90 L${f} -56" fill="none" stroke="#3A2E2A" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M${h + 12} -132 L${k + 18} -96 L${f + 22} -60" fill="none" stroke="#6A5A54" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`).join("");
  return `<path d="M0 0 Q10 -30 0 -50" stroke="#3E8E4A" stroke-width="8" fill="none"/><g transform="translate(0 -52)">${[0, 60, 120, 180, 240, 300].map((a) => `<ellipse cx="${n2(Math.cos(a * Math.PI / 180) * 24)}" cy="${n2(Math.sin(a * Math.PI / 180) * 10)}" rx="24" ry="12" fill="#FF8FB1" stroke="#D9608A" stroke-width="3"/>`).join("")}<circle r="12" fill="#FFD75A"/></g>
  <g transform="translate(10 -140) scale(${n2(sq)} 1)"><path d="M0 0 Q-60 -240 120 -300 Q190 -250 150 -120 Q90 -40 0 0z" fill="url(#bflyW)" stroke="#2A2220" stroke-width="7"/><path d="M0 0 Q-40 -150 112 -284 M0 0 Q40 -160 150 -200 M0 0 Q70 -80 150 -120" fill="none" stroke="#2A2220" stroke-width="5"/><path d="M120 -300 Q190 -250 150 -120" fill="none" stroke="#2A2220" stroke-width="20"/>${[[150, -250], [158, -200], [150, -150]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#fff"/>`).join("")}
    <path d="M0 0 Q-80 -110 -10 -180 Q80 -150 100 -60 Q60 -10 0 0z" fill="#F7B54A" stroke="#2A2220" stroke-width="6" opacity=".96"/><path d="M0 0 Q20 -100 0 -160 M0 0 Q50 -90 80 -100" fill="none" stroke="#2A2220" stroke-width="4"/></g>
  ${legs}<path d="M-60 -132 Q-30 -150 40 -138 Q50 -126 40 -118 Q-30 -112 -60 -124z" fill="#3A2E2A"/><circle cx="56" cy="-136" r="17" fill="#3A2E2A"/><circle cx="62" cy="-140" r="5" fill="#8A7A70"/><path d="M60 -150 Q90 -230 120 -250 M54 -152 Q70 -230 96 -256" fill="none" stroke="#3A2E2A" stroke-width="4"/><circle cx="121" cy="-252" r="7" fill="#3A2E2A"/><circle cx="97" cy="-258" r="7" fill="#3A2E2A"/><path d="M66 -126 q16 10 8 22 q-8 6 -12 -2" fill="none" stroke="#3A2E2A" stroke-width="3"/>`; }

/* ---------- a moth resting flat (top view), feathery feelers. origin = its middle ---------- */
const moth = (t = 0) => `<g transform="rotate(${n2(2 * Math.sin(t * 3))})"><path d="M0 -10 Q-70 -30 -110 40 Q-60 60 0 30z M0 -10 Q70 -30 110 40 Q60 60 0 30z" fill="url(#mothW)" stroke="#5E4632" stroke-width="4"/><path d="M-20 4 Q-60 0 -84 30 M20 4 Q60 0 84 30" fill="none" stroke="#5E4632" stroke-width="3" opacity=".6"/><circle cx="-52" cy="18" r="7" fill="#5E4632" opacity=".6"/><circle cx="52" cy="18" r="7" fill="#5E4632" opacity=".6"/>
  <ellipse cx="0" cy="12" rx="10" ry="30" fill="#7A5E44"/><circle cx="0" cy="-20" r="10" fill="#7A5E44"/><path d="M-4 -26 Q-24 -60 -40 -64 M4 -26 Q24 -60 40 -64" fill="none" stroke="#7A5E44" stroke-width="4"/>${[0, 1, 2, 3].map((i) => `<path d="M${n2(-10 - i * 8)} ${n2(-36 - i * 7)} l-8 4 M${n2(10 + i * 8)} ${n2(-36 - i * 7)} l8 4" stroke="#7A5E44" stroke-width="2"/>`).join("")}</g>`;

/* ---------- the pigeon (a rock pigeon), side view, facing right: grey feathers, a shiny green-and-purple neck, two dark wing bars, two pink legs ---------- */
function pigeon(o = {}) { const b = o.bob || 0;
  return `<ellipse cx="0" cy="4" rx="140" ry="12" fill="${P.ink}" opacity=".22" filter="url(#b4)"/>
  <path d="M-10 -60 L-20 -14 L-34 0 M-20 -14 L-6 0 M-20 -14 L-24 2 M30 -60 L36 -14 L22 0 M36 -14 L50 0 M36 -14 L34 2" fill="none" stroke="#E86A7A" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M-190 -120 L-120 -100 L-110 -130z" fill="#5E667A"/><path d="M-190 -120 L-150 -110" stroke="#2A2E3A" stroke-width="10"/>
  <ellipse cx="0" cy="-100" rx="120" ry="64" fill="url(#pigG)"/><path d="M-120 -110 Q-40 -170 70 -130 Q20 -90 -120 -96z" fill="#9AA2B6" stroke="#6E7690" stroke-width="3"/><path d="M-60 -126 l44 -8 M-50 -112 l44 -8" stroke="#2E3240" stroke-width="9" stroke-linecap="round"/>
  ${[0, 1, 2, 3].map((i) => `<path d="M${-80 + i * 30} -128 q14 8 26 0" fill="none" stroke="#6E7690" stroke-width="3" opacity=".7"/>`).join("")}
  <g transform="translate(0 ${n2(b)})"><path d="M70 -130 Q80 -190 110 -200 Q140 -196 136 -160 Q130 -120 100 -100z" fill="url(#pigN)"/><circle cx="118" cy="-196" r="34" fill="#6A7690"/><circle cx="128" cy="-202" r="8" fill="#F28A2A"/><circle cx="129" cy="-203" r="3.5" fill="${P.ink}"/>
  <path d="M148 -196 L176 -188 L148 -182z" fill="#3A3A44"/><ellipse cx="150" cy="-196" rx="7" ry="5" fill="#F0EEE8"/></g>`; }
