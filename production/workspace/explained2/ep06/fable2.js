// fable2.js: the Fable redraw of EP6, PART 2, on ep06's own voices and timeline (loaded after p2.js: a scene defined here replaces that one).
//   The calm recap (2 or 3 pictures under Heart's "Last time" line; rulebook section 2), the goals read by Pip, BE A HAIR (the fruit bat seen from
//   its own back; the YOU magnifier window; the AIR thermometer falls while the BAT thermometer stays the same; the baby bat drinking milk),
//   warm-blooded with the moving and the steady thermometers, the NEXT TIME dare card, the read-along with pictures, the outro with the group tags.
if (PART === 2) { (() => {
const ALL6 = { 3: -1, 4: -1, 5: -1 };
const ROOST = [[400, 262], [560, 276], [720, 250]], HB = [560, 276, .4];
function palmViewF(t, o = {}, cam = [1, 960, 540]) { let s = bg("palmvalley") + dusks(t, 20, 5);
  ROOST.forEach(([x, y], i) => { if (o.hide && o.hide.includes(i)) return; s += TF(x, y, .4, `<g transform="rotate(${n2(2.5 * Math.sin(t * .9 + i))})">${hangBat({ t: t + i * 1.3, ph: i * 1.1, baby: i === 1 ? (o.baby || 0) : 0 })}</g>`); });
  s += TF(PV.lamp[0], PV.lamp[1], 1, lampPost(1, 420)) + TF(PV.lamp[0] + 70 + 16 * Math.sin(t * 2.3), PV.lamp[1] - 360 + 12 * Math.sin(t * 3.1), .42, moth(t));
  s += o.items || "";
  return CAM(s, cam[0], cam[1], cam[2]); }

/* ============ 1-2 · the calm recap: three pictures from Part 1, one at a time, each held, each with one short label; Heart's "Last time" plays over them ============ */
const RA = "f201", RB = "f202", tR2 = W(RA, "and") - .45, tR3 = LT(RB) - .35, tREnd = SCN.lasttime.t1;
const recapPic = (t, i, a, b, inner, label, tLab) => { const o = ss(a - .01, a + .5, t) * (1 - ss(b, b + .5, t)); if (o <= 0) return ""; const z = 1 + .05 * clamp((t - a) / (b + .5 - a));
  return OP(i === 0 ? 1 - ss(b, b + .5, t) : o, `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)">${inner}</g>` + (t >= tLab ? TF(960, 930, spring(t, tLab, .5), `<g filter="url(#drop)"><rect x="${n2(-tw(label, 64, 700) / 2 - 56)}" y="-62" width="${n2(tw(label, 64, 700) + 112)}" height="124" rx="62" fill="${P.ink}"/></g>${T(0, 22, label, 64, "#fff")}`) : "")); };
function calmRecap(t) { const AX = 960, AY = 760, AK = 1.0;
  const p1 = macroBg(t, { gy: AY - 10 }) + TF(AX, AY, AK, antBig({ glow: [.5, .5, .5, .5, .5, .5], t, feel: .3 })) + [0, 1, 2, 3, 4, 5].map((k) => { const f = antLegTip(k); return numPop(t, -1, AX + f[0] * AK, AY + 76 + (k % 2) * 80, k + 1, .9); }).join("");
  const p2 = lakeView(t, { mon: { x: 760, y: 760, k: .62, tongue: tongueAt(t, .4, 2.6) }, web: false, hop: false, ants: false }, [1.25, 900, 600]) + TF(1500, 400, 1, skinDisc("scaly", 170, t));
  const cheer = [[LT(RB) + .1, 40], [LE(RB) + .2, 30]];
  const p3 = bg("daystage") + `<circle cx="1500" cy="200" r="520" fill="url(#fSun)" opacity=".9"/>` + buddy("basil", 700, 880, 520, t, { aura: true, tag: false, poses: [[0, "cheer"]], jump: cheer, still: false })
    + thermoF(1240, 640, .2 + .6 * (.5 + .5 * Math.sin((t - tR3) * 1.6 - 1.2)), "PLACE", { H: 300 }) + thermoF(1420, 640, .2 + .6 * (.5 + .5 * Math.sin((t - tR3) * 1.6 - 1.9)), "BASIL", { H: 300, fill: P.basil }) + say(RB, 760, 150, t, { size: 52, tail: -40 });
  return `<rect width="1920" height="1080" fill="#DDF0D6"/>` + recapPic(t, 0, 0, tR2, p1, "Insects: 6 legs", W(RA, "insects") - .2) + recapPic(t, 1, tR2, tR3, p2, "Reptiles: dry, scaly skin", W(RA, "reptiles") - .15) + recapPic(t, 2, tR3, tREnd + 9, p3, "Reptiles: cold-blooded", LT(RB) - .1)
    + TF(190, 70, 1, tpill(0, 0, "Last time: Part 1", 36, P.ink, P.sun, { w: 700 })); }
const THUMB2 = (t) => `<rect width="1920" height="1080" fill="url(#gdSkyN)"/>` + bg("palmvalley").replace("<use", '<use opacity=".9"') + `<circle cx="1420" cy="250" r="560" fill="url(#fWarm)" opacity=".8"/><circle cx="1420" cy="250" r="150" fill="#FFF3C9"/>` + dusks(1, 16, 3)
  + TF(760, 760, 1.25, `<g transform="rotate(-6)">${fruitBatF({ wings: 1, flap: 1.1, t: 1, light: 1 })}</g>`) + buddy("basil", 200, 1030, 250, t, { aura: true, tag: false, pose: "surprised", still: true }) + logo(t);
SC.recap = (t, s) => location.search.includes("thumb") ? THUMB2(t) : calmRecap(t);
SC.lasttime = (t, s) => calmRecap(t) + OP(ramp(t, tR3 + .4, .4), HUD(t));

/* ============ 3 · today's goals, read aloud by Pip ============ */
SC.goals = (t, s) => goalsRead(t, s, [["How to spot a mammal", TF(0, -40, .2, hangBat({ t }))], ["Which one does not belong", TF(-70, 56, .16, catSit(t)) + TF(10, 56, .14, macaque(t)) + TF(110, 46, .06, monitor({ t }))], ["Same and different, with a reason", TF(-60, 40, .1, fruitBat({ wings: 1, flap: t * 4, t })) + TF(70, 50, .2, kingfisher({ bob: 0 }))]], "pip", ["f3g0", "f3g1", "f3g2", "f3g3"]);

/* ============ 5 · BE A HAIR ============ */
const td = MK("dive"), tW = MK("wings"), tF = MK("fly"), tB = MK("back"), tThin = W("f503", "thin") - .1, tNoF = W("f503", "no") - .1, tAir = W("f504", "air") - .2, tCoolW = W("f504", "cool") - .1, tWarm = W("f504", "warm") - .2, tBaby = W("f505", "baby") - .3, tMilk = W("f505", "milk") - .2;
const tOut = W("f502", "fruit") - .5;                          // the camera pulls back from your hair to the bat's whole back
const flyK = (t) => ss(tF, tF + .7, t) * (1 - ss(tB - .5, tB, t)), wingU = (t) => eio((t - tW) / 1.5), backK = (t) => ss(tB - .25, tB + .35, t);
// the AIR: warm at dusk under the leaf, cool out in the night. The BAT: the same all the time (warm-blooded: the book's word comes later)
const airT = (t) => .6 - .36 * ss(tF + .4, tCoolW + .6, t) + .1 * ss(tB, tB + 1.5, t), batT = (t) => .64 + .008 * Math.sin(t * 3);
// soft fur seen very close: hairs standing up from warm skin, like a forest. wind 0..1 lays them flat. Drawn around (0, 0) to fill a box of half-size R
function furClose(t, wind, R, n, seed = 1) { let hs = [], s = `<rect x="${-R * 1.3}" y="${-R * 1.3}" width="${R * 2.6}" height="${R * 2.6}" fill="#5A3A22"/><ellipse cx="0" cy="${n2(R * 1.05)}" rx="${n2(R * 1.5)}" ry="${n2(R * .7)}" fill="url(#fWarm)"/>`;
  for (let i = 0; i < n; i++) { const d = Math.pow(hash(i, 41 + seed), .75); hs.push({ d, x: (hash(i, 43 + seed) * 2.6 - 1.3) * R, i }); } hs.sort((a, b) => a.d - b.d);
  for (const h of hs) { const y0 = lerp(.2, 1.25, h.d) * R, len = lerp(.55, 1.9, h.d) * R * (.8 + .4 * hash(h.i, 49)), w = lerp(.02, .11, h.d) * R, lean = .3 * (hash(h.i, 47) - .5) + .07 * Math.sin(t * 1.3 + h.i * .7) * (1 - wind) + wind * (-1.05 - .07 * Math.sin(t * 15 + h.i * 3)), tx = h.x + Math.sin(lean) * len, ty = y0 - Math.cos(lean) * len, cx = h.x + Math.sin(lean * .45) * len * .55, cy = y0 - Math.cos(lean * .45) * len * .55;
    const col = hexL(hexL("#E6B880", "#7A4A28", h.d * .75 + .25 * hash(h.i, 53)), "#3B2A6C", (1 - h.d) * .45);
    s += `<path d="M${n2(h.x - w)} ${n2(y0)} Q${n2(cx - w * .6)} ${n2(cy)} ${n2(tx)} ${n2(ty)} Q${n2(cx + w * .6)} ${n2(cy)} ${n2(h.x + w)} ${n2(y0)}z" fill="${col}"/>` + (h.d > .55 ? `<path d="M${n2(h.x)} ${n2(y0 - w)} Q${n2(cx - w * .2)} ${n2(cy)} ${n2(tx)} ${n2(ty)}" fill="none" stroke="#FBE3BC" stroke-width="${n2(w * .22)}" opacity=".5"/>` : ""); }
  // you: one hair in the middle, rimmed in sun yellow
  const L = R * 1.75, ls = .05 * Math.sin(t * 1.1) * (1 - wind) - 1.0 * wind - .05 * wind * Math.sin(t * 16), by = R * 1.2, tx = Math.sin(ls) * L, ty = by - Math.cos(ls) * L, cx = Math.sin(ls * .45) * L * .55, cy = by - Math.cos(ls * .45) * L * .55, w = R * .075;
  const d = `M${n2(-w)} ${n2(by)} Q${n2(cx - w * .6)} ${n2(cy)} ${n2(tx)} ${n2(ty)} Q${n2(cx + w * .6)} ${n2(cy)} ${n2(w)} ${n2(by)}z`;
  return s + `<path d="${d}" fill="none" stroke="${P.sun}" stroke-width="${n2(R * .1)}" stroke-linejoin="round" opacity=".6" filter="url(#b10)"/><path d="${d}" fill="#C9884A" stroke="${P.sun}" stroke-width="${n2(R * .028)}" stroke-linejoin="round"/><path d="M0 ${n2(by - w)} Q${n2(cx - w * .2)} ${n2(cy)} ${n2(tx)} ${n2(ty)}" fill="none" stroke="#fff" stroke-width="${n2(w * .3)}" opacity=".6"/>`; }
const palmSil = (x, y, k, col, sw = 0) => `<g transform="translate(${n2(x)} ${n2(y)}) scale(${n2(k)})"><path d="M-9 0 Q-2 -200 8 -400 L22 -400 Q16 -200 13 0z" fill="${col}"/>${[-150, -110, -60, -20, 30, 80, 130].map((a, i) => `<path d="M14 -400 Q${n2(Math.cos(a * Math.PI / 180) * 110 + sw)} ${n2(-400 + Math.sin(a * Math.PI / 180) * 110 - 70)} ${n2(Math.cos(a * Math.PI / 180) * 230 + sw * 2)} ${n2(-400 + Math.sin(a * Math.PI / 180) * 200 + 40)}" stroke="${col}" stroke-width="${i % 2 ? 22 : 28}" stroke-linecap="round" fill="none"/>`).join("")}</g>`;
const HZB = 430, yOfB = (rel) => HZB + 240 / rel;
/* ---- the micro-world: the camera rides on the fruit bat's back, between its shoulders, looking forward over the back of its head.
   A fruit bat from behind: a round furry head with two pale-rimmed ears; a rusty collar across the shoulders; a furry back; the arms go out from the
   shoulders to the wrists (a small thumb claw on each); from each wrist four long thin finger bones spread like the ribs of an umbrella, and
   thin skin is stretched between them and down to the ankles. No feathers anywhere. YOU are one hair on its back. ---- */
function povBat(t) { const fly = flyK(t), u = wingU(t) * (1 - .0 * fly), flap = fly * Math.sin((t - tF) * 7.2), fl2 = fly * Math.sin((t - tF) * 7.2 - .7), d = integ((x) => .9 * flyK(x), tF, Math.max(tF, t)), bank = 5 * fly * Math.sin((t - tF) * .9), bob = -14 * flap * fly, wind = fly, br = Math.sin(t * 2.4);
  // --- the world. At the roost the bat hangs head down, so the world is upside down; in the air it turns the right way up.
  const flip = 1 - ss(tF - .1, tF + .7, t);
  let roost = ""; if (flip > 0) roost = `<g transform="rotate(180 960 540)"><g filter="url(#b4)">${bg("palmvalley")}</g></g><rect width="1920" height="1080" fill="#3B2A8C" opacity=".2"/><path d="M-100 1040 Q500 880 960 960 Q1500 1050 2020 900 V1200 H-100z" fill="#1E3A2C"/>${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => `<path d="M${200 + i * 200} 1100 Q${n2(190 + i * 200 + 12 * Math.sin(t + i))} 980 ${n2(140 + i * 210)} ${n2(900 + 30 * Math.sin(i * 2))}" stroke="${i % 2 ? "#2C5A40" : "#234A34"}" stroke-width="44" stroke-linecap="round" fill="none"/>`).join("")}`;
  let night = ""; if (flip < 1) { night = `<rect x="-300" y="-300" width="2520" height="${HZB + 300}" fill="url(#fNight)"/><circle cx="1380" cy="${HZB - 10}" r="520" fill="#FF9E6B" opacity=".3" filter="url(#b60)"/>` + dusks(t, 40, 9) + `<circle cx="420" cy="150" r="54" fill="#FFF6D8"/><circle cx="440" cy="138" r="46" fill="#2E2470" opacity=".0"/>`;
    for (let i = 0; i < 9; i++) night += `<rect x="${n2(((i * 260 - d * 30) % 2340 + 2340) % 2340 - 200)}" y="${n2(HZB - 150 - 90 * hash(i, 3))}" width="${n2(60 + 50 * hash(i, 5))}" height="300" rx="5" fill="#4A3486" opacity=".7"/>`;
    night += `<rect x="-300" y="${HZB}" width="2520" height="900" fill="#1E3A34"/><rect x="-300" y="${HZB}" width="2520" height="130" fill="#2E5A4A" opacity=".7"/>`;
    for (let k = 0; k < 60; k++) { const z = k * .5, rel = z - d; if (rel < .4 || rel > 9) continue; const y = yOfB(rel); night += `<path d="M-300 ${n2(y)} Q960 ${n2(y + (y - HZB) * .06)} 2220 ${n2(y)}" stroke="#3E7A5E" stroke-width="${n2(2 + 4 / rel)}" fill="none" opacity="${n2(.3 * clamp((9 - rel) / 3))}"/>`; }
    const it = []; for (let i = 0; i < 120; i++) { const z = 1 + i * .32 + .2 * hash(i, 3), rel = z - d; if (rel < .35 || rel > 9) continue; it.push([rel, i]); } it.sort((a, b) => b[0] - a[0]);
    for (const [rel, i] of it) { const side = i % 2 ? 1 : -1, lat = 300 + 1100 * hash(i, 5), x = 960 + side * lat / rel, y = yOfB(rel), sc = 1 / rel, fade = clamp((9 - rel) / 3);
      if (i % 5 === 0) night += `<circle cx="${n2(x)}" cy="${n2(y - 150 * sc)}" r="${n2(90 * sc)}" fill="#FFD27A" opacity="${n2(.4 * fade)}" filter="url(#b10)"/><rect x="${n2(x - 4 * sc)}" y="${n2(y - 150 * sc)}" width="${n2(8 * sc)}" height="${n2(150 * sc)}" fill="#15121E"/><circle cx="${n2(x)}" cy="${n2(y - 156 * sc)}" r="${n2(14 * sc)}" fill="#FFF0B8" opacity="${n2(fade)}"/>`;
      else night += OP(fade, palmSil(x, y, sc * (.8 + .5 * hash(i, 7)), i % 3 ? "#14241E" : "#1B3028", 10 * Math.sin(t * 2 + i))); }
    // cool night air: pale blue streaks rush past
    for (let i = 0; i < 22; i++) { const v = ((hash(i, 61) + (t - tF) * 1.3) % 1), a = hash(i, 63) * Math.PI * 2, r0 = 140 + 900 * v * v, r1 = r0 + 120 + 260 * v; night += `<path d="M${n2(960 + Math.cos(a) * r0)} ${n2(HZB + 40 + Math.sin(a) * r0 * .6)} L${n2(960 + Math.cos(a) * r1)} ${n2(HZB + 40 + Math.sin(a) * r1 * .6)}" stroke="#BFE6FF" stroke-width="${n2(2 + 5 * v)}" stroke-linecap="round" opacity="${n2(.5 * fly * Math.sin(Math.PI * v))}"/>`; } }
  const world = (flip < 1 ? night : "") + (flip > 0 ? OP(flip, roost) : "");
  // --- the wings: arm to the wrist, four finger bones from the wrist, thin skin between them and down to the ankle
  const wing = (sd) => { const f = sd > 0 ? flap : flap, up = -150 * f * u, sh = [960 + sd * 250, 700], el = [960 + sd * lerp(300, 470, u), lerp(760, 610, u) + up * .3], wr = [960 + sd * lerp(330, 700, u), lerp(700, 500, u) + up * .7];
    const tips = [[lerp(350, 1420, u), lerp(760, 330, u) + up * 1.5], [lerp(360, 1560, u), lerp(860, 700, u) + up * 1.3 + 60 * fl2 * u], [lerp(350, 1260, u), lerp(960, 1040, u) + up * .6 + 40 * fl2 * u], [lerp(330, 860, u), lerp(1040, 1190, u)]].map(([x, y]) => [960 + sd * x, y]), root = [960 + sd * 330, 1160];
    let edge = `M${n2(sh[0])} ${sh[1]} L${n2(el[0])} ${n2(el[1])} L${n2(wr[0])} ${n2(wr[1])} L${n2(tips[0][0])} ${n2(tips[0][1])}`; const tr = [...tips, root]; for (let i = 1; i < tr.length; i++) { const a = tr[i - 1], b = tr[i]; edge += ` Q${n2((a[0] + b[0]) / 2 - sd * 70 * u)} ${n2((a[1] + b[1]) / 2 - 50 * u)} ${n2(b[0])} ${n2(b[1])}`; } edge += "z";
    let veins = ""; for (let i = 0; i < 10; i++) { const a = tips[1], q = .25 + .07 * i; veins += `<path d="M${n2(lerp(wr[0], a[0], q))} ${n2(lerp(wr[1], a[1], q) + 30)} q${n2(sd * 50)} 60 ${n2(sd * 20)} 150" stroke="#2A1612" stroke-width="3" fill="none" opacity="${n2(.22 * u)}"/>`; }
    return `<path d="${edge}" fill="#5A382E" opacity=".9" stroke="#24130F" stroke-width="7" stroke-linejoin="round"/><path d="${edge}" fill="${flip > .5 ? "#FF9A5A" : "#7AA8FF"}" opacity="${n2(.26 * u)}" style="mix-blend-mode:screen"/>${veins}
      ${tips.map((p) => `<path d="M${n2(wr[0])} ${n2(wr[1])} L${n2(p[0])} ${n2(p[1])}" stroke="#2A1612" stroke-width="20" stroke-linecap="round"/><path d="M${n2(wr[0])} ${n2(wr[1])} L${n2(p[0])} ${n2(p[1])}" stroke="#D9B49A" stroke-width="12" stroke-linecap="round"/>`).join("")}
      <path d="M${n2(sh[0])} ${sh[1]} L${n2(el[0])} ${n2(el[1])} L${n2(wr[0])} ${n2(wr[1])}" stroke="#24130F" stroke-width="64" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M${n2(sh[0])} ${sh[1]} L${n2(el[0])} ${n2(el[1])} L${n2(wr[0])} ${n2(wr[1])}" stroke="#8A5E44" stroke-width="50" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M${n2(wr[0])} ${n2(wr[1])} q${sd * 22} -50 ${sd * -14} -84" stroke="#1B120E" stroke-width="15" stroke-linecap="round" fill="none"/>`; };
  // --- the back and the head, from behind
  const hwB = (y) => lerp(150, 330 + 640 * Math.pow(clamp((y - 700) / 400), 1.2), ss(600, 720, y)), ys = []; for (let y = 600; y <= 1140; y += 20) ys.push(y);
  const sil = `M${ys.map((y) => `${n2(960 - hwB(y))} ${y}`).join(" L")} L${ys.slice().reverse().map((y) => `${n2(960 + hwB(y))} ${y}`).join(" L")}z`;
  let hair = "", you = null, ri = 0;
  for (let y = 1120; y > 610; ri++) { const s = 9 + 30 * Math.pow(clamp((y - 600) / 520), 1.2), hw = hwB(y) - s * .3, n = Math.floor(hw / s) + 1, off = (ri & 1) ? .5 : 0, collar = y < 730;
    for (let k = -n; k <= n; k++) { const x = (k + off) * s; if (Math.abs(x) > hw) continue; const h = hash(k * 31 + ri * 77, 5), me = ri === 7 && k === 0, lean = (-.5 * wind + .12 * Math.sin(t * 1.6 + k + ri)) * (1 - 0) + (x / hw) * .5, L = s * (1.5 + .5 * h) * (1 - .35 * wind), col = collar ? (h > .5 ? "#D98A44" : "#C0742E") : h < .3 ? "#6A4226" : h > .7 ? "#B07A48" : "#8E5E36";
      const x0 = 960 + x, x1 = x0 + Math.sin(lean) * L, y1 = y - Math.cos(lean) * L * (1 - .4 * wind);
      if (me) you = [x0, y, s, x1, y1]; else hair += `<path d="M${n2(x0)} ${n2(y)} L${n2(x1)} ${n2(y1)}" stroke="${col}" stroke-width="${n2(s * .5)}" stroke-linecap="round"/>`; }
    y -= s * .8; }
  const ear = (sd) => `<path d="M${sd * 60} -60 Q${sd * 150} -160 ${sd * 110} -230 Q${sd * 30} -190 ${sd * 10} -96z" fill="#6A4026" stroke="#2A1612" stroke-width="8" stroke-linejoin="round" transform="rotate(${n2(sd * (4 * Math.sin(t * 2.1 + sd) - 14 * wind))} ${sd * 40} -80)"/><path d="M${sd * 78} -84 Q${sd * 136} -160 ${sd * 108} -214" fill="none" stroke="#F0DCC4" stroke-width="7" stroke-linecap="round" opacity=".8" transform="rotate(${n2(sd * (4 * Math.sin(t * 2.1 + sd) - 14 * wind))} ${sd * 40} -80)"/>`;
  const head = `<g transform="translate(960 ${n2(560 + 2 * br)}) rotate(${n2(4 * Math.sin(t * .8) * (1 - fly) + bank * .5)})">${ear(-1)}${ear(1)}<ellipse cx="0" cy="-10" rx="150" ry="128" fill="#8E5E36" stroke="#2A1612" stroke-width="8"/>${Array.from({ length: 46 }, (_, i) => { const a = hash(i, 3) * Math.PI * 2, r = 20 + 105 * Math.sqrt(hash(i, 5)), x = Math.cos(a) * r, y = -10 + Math.sin(a) * r * .82; return `<path d="M${n2(x)} ${n2(y)} l${n2(3 - 8 * wind)} ${n2(-16)}" stroke="${i % 3 ? "#6A4226" : "#B07A48"}" stroke-width="7" stroke-linecap="round"/>`; }).join("")}</g>`;
  const back = `<clipPath id="bbC"><path d="${sil}"/></clipPath><path d="${sil}" fill="#7A4E2C" stroke="#2A1612" stroke-width="9" stroke-linejoin="round"/><g clip-path="url(#bbC)"><rect x="0" y="590" width="1920" height="150" fill="#C0742E" opacity=".55"/><ellipse cx="960" cy="1160" rx="900" ry="300" fill="url(#fWarm)" opacity=".5"/>${hair}<rect x="0" y="560" width="1920" height="620" fill="url(#archB)"/></g>`
    + (you ? `<path d="M${n2(you[0])} ${n2(you[1])} L${n2(you[3])} ${n2(you[4])}" stroke="${P.sun}" stroke-width="${n2(you[2] * .5 + 9)}" stroke-linecap="round"/><path d="M${n2(you[0])} ${n2(you[1])} L${n2(you[3])} ${n2(you[4])}" stroke="#E6A860" stroke-width="${n2(you[2] * .5)}" stroke-linecap="round"/><circle cx="${n2((you[0] + you[3]) / 2)}" cy="${n2((you[1] + you[4]) / 2)}" r="${n2(you[2] * .9 + 6 + 4 * Math.sin(t * 3))}" fill="none" stroke="${P.sun}" stroke-width="4" opacity=".9"/>` : "");
  const body = `<defs><linearGradient id="archB" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".45"/><stop offset=".3" stop-color="#000" stop-opacity="0"/><stop offset=".7" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></linearGradient></defs>` + `<g transform="rotate(${n2(bank)} 960 800) translate(0 ${n2(bob)})">` + (u > .001 ? wing(-1) + wing(1) : "") + back + head + `</g>`;
  const light = `<rect x="-300" y="-300" width="2520" height="1700" fill="#2E3E9A" opacity="${n2(.26 * fly)}" style="mix-blend-mode:multiply"/><rect x="-300" y="-300" width="2520" height="1700" fill="#FF9E6B" opacity="${n2(.14 * (1 - fly))}" style="mix-blend-mode:soft-light"/>`;
  return { world, body, light, you: you ? [(you[0] + you[3]) / 2, (you[1] + you[4]) / 2 + bob, you[2]] : [960, 900, 20], wind, fly, flip }; }

SC.waitw = (t, s) => { const L = "f501", tz = W(L, "shrink") - .15, q = ss(tz, s.t1, t), bx = HB[0] + 6, by = HB[1] + 120, cam = [1.15 + 1.9 * ei(clamp((t - tz) / (s.t1 - tz))), lerp(900, bx, q), lerp(560, by, q)], tP = LT(L) - .1;
  return palmViewF(t, {}, cam) + OP(1 - ramp(t, tz + .3, .4), buddy("pip", 1480, 1056, 230, t, { aura: true, flip: true, in: s.t0 + .1, poses: [[s.t0, "pointing"], [s.t0 + 1.6, "sit"]] }) + buddy("momo", 1760, 1056, 230, t, { aura: true, flip: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [tP + .2, "cheer"]], nohop: true }) + HUD(t))
    + (t >= tP && t < tz ? TF(1100, 600, spring(t, tP, .45) * (1 - ramp(t, tz - .25, .2)), tpill(0, 0, "Be a hair!", 78, P.sun, P.ink, { w: 700 })) : "") + (t >= tz ? TF(1100, 600, spring(t, tz, .45), tpill(0, 0, "Shrink down… quietly", 52, P.ink, "#fff", { w: 600 })) : ""); };

// back at the palm: the mother hangs under the leaf; her baby, tucked at her chest, drinks her milk (seen close, side on, in warm light)
const nursery = (t) => { const z = lerp(1.25, 1, eo((t - tB) / 1.8)), by = ss(tBaby - .5, tBaby + .3, t);
  return `<rect width="1920" height="1080" fill="url(#fNight)"/><g filter="url(#b4)" opacity=".75">${bg("palmvalley")}</g><rect width="1920" height="1080" fill="#2A2050" opacity=".35"/><circle cx="960" cy="560" r="470" fill="url(#fWarm)" opacity=".55"/>` + dusks(t, 14, 6)
    + `<g transform="translate(960 560) scale(${n2(z)}) translate(-960 -560)">${TF(960, 110, 2.1, `<path d="M-330 -30 Q0 20 330 -30 L310 -130 H-310z" fill="#2C4E3A"/>${[-260, -170, -80, 10, 100, 190, 270].map((x, i) => `<path d="M${x} -120 Q${x + 10} -40 ${x - 10 + 20 * (i % 2)} ${n2(20 + 14 * Math.sin(i * 2))}" stroke="${i % 2 ? "#22402F" : "#356048"}" stroke-width="34" stroke-linecap="round" fill="none"/>`).join("")}<path d="M-330 -30 Q0 20 330 -30" stroke="#1B3024" stroke-width="16" fill="none"/>` + `<g transform="rotate(${n2(1.6 * Math.sin(t * 1.1))})">${hangBat({ baby: by, t, light: 1 })}</g>`)}</g>`; };

SC.shrink = (t, s) => { const u = t - td, p = povBat(t), e = eio((t - tOut) / 2.0), bk = backK(t), [yx, yy, ys] = p.you;
  // the way in ends VERY close: soft fur like a forest all round you, and one hair is you. Then the camera pulls back to the bat's whole back.
  const Z = lerp(9, 1, e), tx = lerp(yx, 960, e), ty = lerp(yy - 30, 540, e);
  let out = `<g transform="translate(960 ${n2(lerp(620, 540, e))}) scale(${n2(Z * 1000) / 1000}) translate(${n2(-tx)} ${n2(-ty)})">${p.world}${p.body}${p.light}</g>`;
  if (e < 1) { const a = 1 - ss(.05, .5, e); if (a > 0) out += OP(a, `<g transform="translate(960 600) scale(${n2(lerp(1, .6, e))})">${furClose(t, 0, 560, 200)}</g><rect width="1920" height="1080" fill="#3B2A8C" opacity=".18" style="mix-blend-mode:multiply"/><rect width="1920" height="1080" fill="url(#gVig)"/>`); }
  if (u < 1.0) { const q = ei(u / 1.0); out += OP(1 - ss(.35, 1.0, u), palmViewF(t, {}, [3.05 + 9 * q, HB[0] + 6, HB[1] + 120])) + `<rect width="1920" height="1080" fill="#FFE9C8" opacity="${n2(.7 * pulse(u, .62, .3, .5))}"/>`; }
  // YOU, close up
  { const a = ramp(t, LT("f502") - .2, .4) * (1 - ramp(t, tOut - .1, .4)); out += OP(a, `<path d="M660 400 L930 500" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="930" cy="500" r="8" fill="#fff"/>` + youPill(580, 360, 1.4) + TF(580, 436, 1, tpill(0, 0, "one soft hair", 36, P.ink, "#fff", { w: 600 }))); }
  // the YOU magnifier window: your hair among the fur; in the night wind the hairs lie flat
  out += OP(1 - bk, youLens(spring(t, tOut + 1.6, .5), 226, 852, 196, yx, yy, `<g transform="translate(0 -20)">${furClose(t, p.wind, 150, 110, 3)}</g><rect x="-240" y="-240" width="480" height="480" fill="#2E3E9A" opacity="${n2(.2 * p.fly)}" style="mix-blend-mode:multiply"/>`, { id: "lnB" }));
  // back at the palm
  if (bk > 0) out += OP(bk, nursery(t)) + (t >= tMilk ? lineTag(t, tMilk, 1400, 640, 1000, 420, "milk", 56, P.sun, P.ink) : "");
  // what you feel
  out += fTag(t, W("f502", "soft") - .15, tW - .25, "soft fur, like a forest", 250, 960, 48) + fTag(t, tOut + 2.2, tW - .25, "upside down!", 760, 990, 44, P.ink, "#fff")
    + fTag(t, tThin, tF - .15, "thin skin", 300, 480, 50, "#FFE3C8") + fTag(t, tNoF, tF - .15, "no feathers!", 300, 1440, 50, "#FFE3C8")
    + fTag(t, tCoolW - .2, tB - .4, "cool night air", 250, 620, 46, "#CFE4FF") + fTag(t, tWarm - .3, tB - .4, "still warm", 760, 1000, 54, "#FFD7A8");
  // two plain thermometers: the AIR falls in the cool night; the BAT stays the same
  { const k = spring(t, tW - .5, .5), ch = pulse(t, tCoolW, .2, 1.6), st = pulse(t, tWarm, .2, 1.8); out += thermoF(1640, 700, airT(t), "AIR", { k, H: 290, glow: ch }) + thermoF(1800, 700, batT(t), "BAT", { k: spring(t, tW - .3, .5), H: 290, glow: st, fill: "#B5476B" });
    out += OP(ramp(t, tW - .2, .4), tpill(1720, 420, "warm", 24, "#FF5A3C", "#fff", { w: 700, nosh: 1 }) + tpill(1720, 640, "cool", 24, "#3A8DFF", "#fff", { w: 700, nosh: 1 }))
      + (t >= tWarm ? OP(1 - ramp(t, s.t1 - .4, .3), TF(1800, 800, spring(t, tWarm, .45), tpill(0, 0, "stays the same", 28, "#fff", P.ink, { w: 600 }))) + OP(1 - ramp(t, s.t1 - .4, .3), TF(1640, 800, spring(t, tWarm + .15, .45), tpill(0, 0, "falls", 28, "#fff", P.ink, { w: 600 }))) : ""); }
  out += fYou(t, LT("f502") - .3, "You are a hair") + fSub(t, LT("f502") + .6, tOut + .2, "seen very close up") + fSub(t, tOut + 1.6, 1e9, "on a fruit bat’s back") + speeded(t, tF + .5, tB - .5, 190, 216);
  return out + wipe(t, s.t1, "#3B2A8C"); };

/* ============ 6 · the reveal: back out to Palm Valley; the thermometers stay a moment ============ */
SC.reveal = (t, s) => { const a = "f601", e = eo((t - s.t0) / 1.4), cam = [lerp(3.4, 1.1, e), lerp(HB[0], 900, e), lerp(HB[1] + 80, 520, e)], tA = W(a, "two") - .1, lit = t >= tA ? spring(t, tA, .45) : 0, tc = W("f602", "one", 1) - .1, tBs = LT("f603") - .12, tS = MK("stampMam"), tM = W(a, "mammal") - .1, BDX = 1560;
  return palmViewF(t, { baby: 1 }, cam) + TF(1010, 880, .5, ansCard(2, "No", { lit })) + (t >= tM ? TF(960, 560, spring(t, tM, .45), tpill(0, 0, "Not a bird: a MAMMAL", 60, P.sun, P.ink, { w: 700 })) : "")
    + TF(BDX, 1062, .5, sixBoard(t, { 3: -1, 4: -1, 5: tS + .02 })) + sixPress(t, tS, BDX, 1062, .5, 5)
    + buddy("basil", 300, 1060, 300, t, { aura: true, in: s.t0 + .5, poses: [[s.t0, "sit"], [tA, "oops"], [tBs, "cheer"]] }) + say("f603", 560, 600, t, { size: 48, tail: -150 }) + coin(t, tc, 1010, 420, "+1", "if you showed two fingers") + wipe(t, s.t0, "#3B2A8C") + HUD(t); };

/* ============ 7 · warm-blooded: the moving and the steady thermometers ============ */
SC.warm = (t, s) => { const L = "f704", t0 = s.t0 + .2, tCon = W(L, "constant") - .2, sunP = ss(t0 + .2, t0 + 1.6, t) * (1 - ss(t0 + 4.0, t0 + 5.0, t)), cloud = ss(t0 + 4.0, t0 + 5.2, t) * (1 - ss(t0 + 8.6, t0 + 9.8, t)), sun2 = ss(t0 + 8.8, t0 + 10, t);
  const pl = (x) => .3 + .5 * ss(t0 + .4, t0 + 1.8, x) - .5 * ss(t0 + 4.0, t0 + 5.2, x) + .45 * ss(t0 + 8.8, t0 + 10, x), lz = lagged(pl, s.t0, t, 1.1), cat = .62 + .006 * Math.sin(t * 3), ch = Math.max(pulse(t, t0 + 1.2, .3, 1.5), pulse(t, t0 + 4.6, .3, 1.5)), GY = 930;
  const tk = MK("kw_warm"), gone = clamp(1 - ramp(t, tk - .2, .25) + ramp(t, tk + 2.6, .3));
  let out = bg("daystage") + `<rect width="1920" height="1080" fill="#FFE9A8" opacity="${n2(.3 * Math.max(sunP, sun2))}"/><rect width="1920" height="1080" fill="#3B5E9A" opacity="${n2(.16 * cloud)}" style="mix-blend-mode:multiply"/>`
    + TF(lerp(1500, 1560, sunP), 330, 1, sunF(60, .35 + .65 * Math.max(sunP, sun2) * (1 - cloud))) + OP(ss(t0 + 3.2, t0 + 4.0, t), TF(lerp(900, 1540, cloud > 0 ? eio(cloud) : 0) + 500 * ss(t0 + 8.6, t0 + 9.8, t), 320, .9, cloudF(1)));
  // the cat (a mammal) and the lizard (a reptile), each with its thermometer; the place has one too
  out += `<ellipse cx="420" cy="${GY + 6}" rx="190" ry="22" fill="${P.ink}" opacity=".14" filter="url(#b4)"/>` + TF(420, GY, 1.2, catSit(t)) + TF(420, GY + 70, 1, tpill(0, 0, "cat", 38, "#fff", P.ink, { w: 700 }))
    + `<ellipse cx="1330" cy="${GY + 8}" rx="330" ry="24" fill="${P.ink}" opacity=".14" filter="url(#b4)"/>` + TF(1300, GY + 4, .5, monitor({ t, tongue: tongueAt(t, .5, 3) })) + TF(1280, GY + 70, 1, tpill(0, 0, "lizard", 38, "#fff", P.ink, { w: 700 }));
  out += OP(gone, thermoF(700, 820, cat, "CAT", { H: 250, fill: "#B5476B", glow: pulse(t, tCon, .2, 1.6), k: spring(t, s.t0 + .25, .5) }) + thermoF(980, 820, pl(t), "PLACE", { H: 250, glow: ch, k: spring(t, s.t0 + .4, .5) }) + thermoF(1740, 820, lz, "LIZARD", { H: 250, fill: P.basil, glow: ch, k: spring(t, s.t0 + .55, .5) })
    + (t >= tCon ? TF(700, 912, spring(t, tCon, .45), tpill(0, 0, "stays the same", 30, P.sun, P.ink, { w: 700 })) + TF(1740, 912, spring(t, tCon + .3, .45), tpill(0, 0, "changes", 30, "#fff", P.ink, { w: 700 })) : ""));
  return out + bookCap(t, L, "Mammals are warm-blooded, which means that they can maintain a constant body temperature.", 160, { size: 44, maxW: 1120, x: 760 }) + HUD(t); };

/* ============ 14 · the dare for Episode 7, as the NEXT TIME card: mould on bread, or yeast for making bread ============ */
const slamK = (t, t0) => { const k = clamp((t - t0) / .16); return k <= 0 ? 0 : lerp(2.4, 1, eo(k)) + .05 * wob(t, t0 + .16, .4); };
SC.dare = (t, s) => { const L = "f1401", tMo = W(L, "mould") - .25, tYe = W(L, "yeast") - .25, tBoth = W(L, "both") - .15, tQ = W(L, "which") - .15, tLock = W(L, "lock") - .1, MX = 610, YX = 1250, GY = 800;
  let out = bg("daystage") + wipe(t, s.t0 + .02, P.sun, 960, 500);
  out += TF(960, 110, slamK(t, s.t0 + .25), `<g transform="rotate(-2)"><g filter="url(#drop)"><rect x="-200" y="-44" width="400" height="88" rx="44" fill="${P.coral}"/><rect x="-192" y="-36" width="384" height="72" rx="36" fill="none" stroke="#fff" stroke-width="5"/></g>${T(0, 18, "NEXT TIME", 52, "#fff", { ls: 5 })}</g>`);
  if (t >= W(L, "fungi") - .2 && t < tQ) out += TF(960, 250, spring(t, W(L, "fungi") - .2, .45) * (1 - ramp(t, tQ - .3, .25)), T(0, 0, "Fungi and bacteria", 84, P.ink, { w: 700 }));
  if (t >= tMo) { const k = spring(t, tMo, .5), wig = 1 + .03 * pulse(t, tBoth, .05, .6); out += `<ellipse cx="${MX}" cy="${GY + 16}" rx="200" ry="24" fill="${P.ink}" opacity=".16" filter="url(#b4)"/>` + TF(MX, GY - 130, 1.05 * k, `<g transform="rotate(${n2(-4 + 1.5 * Math.sin(t * 1.4))}) scale(${n2(wig)} ${n2(2 - wig)})">${mouldBread()}</g>`) + TF(MX, GY + 76, k, tpill(0, 0, "mould on bread", 40, "#fff", P.ink, { w: 700 })); }
  if (t >= tYe) { const k = spring(t, tYe, .5), wig = 1 + .03 * pulse(t, tBoth + .2, .05, .6); out += `<ellipse cx="${YX}" cy="${GY + 16}" rx="250" ry="24" fill="${P.ink}" opacity=".16" filter="url(#b4)"/>` + TF(YX - 20, GY - 76, 1.05 * k, `<g transform="scale(${n2(wig)} ${n2(2 - wig)})">${yeastLoaf()}</g>`) + TF(YX, GY + 76, k, tpill(0, 0, "yeast, for making bread", 40, "#fff", P.ink, { w: 700 })); }
  if (t >= tBoth && t < tQ + .2) out += TF(930, 470, spring(t, tBoth, .45) * (1 - ramp(t, tQ - .2, .25)), tpill(0, 0, "Both are fungi!", 56, P.leafDeep, "#fff", { w: 700 }));
  if (t >= tQ) out += TF(960, 262, slamK(t, tQ), `<text x="0" y="0" font-family="Fredoka" font-weight="700" font-size="104" text-anchor="middle" letter-spacing="3" fill="${P.ink}" stroke="#fff" stroke-width="17" stroke-linejoin="round" paint-order="stroke" filter="url(#dropS)">Which one is <tspan fill="${P.leafDeep}">USEFUL</tspan>?</text>`);
  if (t >= tQ + .5) { const alt = t >= tLock ? Math.floor((t - tLock) / .6) % 2 : -1; out += TF(930, 440, spring(t, tQ + .5, .45), [["1", "Mould", -150], ["2", "Yeast", 150]].map(([n, w, x], i) => `<g transform="translate(${x} 0) scale(${alt === i ? 1.1 : 1})"><g filter="url(#${alt === i ? "glowS" : "dropS"})"><rect x="-136" y="-50" width="272" height="100" rx="26" fill="url(#gPaper)" stroke="${P.sun}" stroke-width="6"/></g><circle cx="-84" cy="0" r="32" fill="url(#gSun)"/>${T(-84, 16, n, 46, P.ink)}${T(30, 17, w, 48, P.ink)}</g>`).join(""))
    + (t >= tLock ? TF(930, 0, spring(t, tLock, .4), youPill(0, 350, 1.1) + tpill(0, 540, "Lock in your answer!", 38, P.ink, "#fff", { w: 700 })) : ""); }
  out += buddy("basil", 200, 1058, 270, t, { aura: true, in: s.t0 + .2, poses: [[s.t0, "sit"], [tMo, "surprised"], [tMo + 1.3, "sit"], [tQ, "arms_crossed"], [tLock + .5, "cheer"]], wave: true })
    + buddy("momo", 1730, 1058, 270, t, { aura: true, flip: true, in: s.t0 + .3, poses: [[s.t0, "sit"], [tYe, "cheer"], [tYe + 1.3, "sit"], [tQ, "thinking"]] });
  return out + HUD(t); };

/* ============ 15 · the read-along, with a picture beside each word ============ */
const baseKw = SC.kwrecap;
SC.kwrecap = (t, s) => baseKw(t, s) + kwPictures(t, s, [
  (tt) => `<rect x="-60" y="-60" width="120" height="120" fill="#4B2E8C"/>` + TF(0, -52, .26, hangBat({ t: tt })),
  (tt) => `<rect x="-60" y="-60" width="120" height="120" fill="#FFF0DC"/>` + TF(0, 34, .17, catNursing(tt)),
  (tt) => kwThermo(.62)]);

/* ============ 16 · "Now you know!": today's lizard, warm on its rock, between the buddies; on the blast each buddy gets its own group ============ */
SC.nyk = (t, s) => { const t0 = Math.floor(TL.lines.h1305.know * 30 + 1e-6) / 30;
  let out = nykScene(t, s, `<ellipse cx="786" cy="1046" rx="290" ry="30" fill="#8C8576"/><path d="M516 1046 Q516 976 630 966 Q786 950 944 968 Q1058 978 1058 1046z" fill="url(#fRock)" stroke="#6E685C" stroke-width="6"/>` + TF(838, 970, .42, monitor({ t, tongue: tongueAt(t, .4, 2.6) }))
    + TF(1056, 880, .36, `<path d="M-40 -6 H60" stroke="#6E4A30" stroke-width="16" stroke-linecap="round"/><g transform="rotate(${n2(3 * Math.sin(t * 2))})">${hangBat({ t })}</g>`).replace(/^/, ""));
  if (t >= t0 + .5) [["pip", 300, "MAMMAL", P.pip], ["momo", 1275, "MAMMAL", P.momo], ["basil", 1650, "REPTILE", P.basil]].forEach(([w, x, g, col], i) => { const tt = t0 + .5 + i * .22, k = spring(t, tt, .45); if (k < .02) return; const ww = tw(g, 38, 700, "Fredoka", 3) + 64;
    out += TF(x - 20, 620 - 8 * Math.abs(Math.sin((t - tt) * 2.6)), k, `<g transform="rotate(${[-4, 3, -3][i]})"><g filter="url(#dropS)"><rect x="${n2(-ww / 2)}" y="-32" width="${n2(ww)}" height="64" rx="32" fill="${col}"/><rect x="${n2(-ww / 2 + 5)}" y="-27" width="${n2(ww - 10)}" height="54" rx="27" fill="none" stroke="#fff" stroke-width="4"/></g>${T(0, 14, g, 38, "#fff", { ls: 3 })}</g>`); });
  return out; };
})(); }
