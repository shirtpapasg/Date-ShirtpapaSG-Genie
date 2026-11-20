// shrink.js: the first-person journeys (the series' signature). The camera IS the animal.
// Part 1: you are the frog. On a leaf, on land (moist skin); jump; under water (strong legs, webbed feet; you breathe through your skin); back on
//         land (lungs as well). Every action is from the book's own sentences about amphibians (2.11, 2.12).
// Part 2: you are the mudskipper. In the water (gills); the tide goes out; you push with your fins and hop onto the mud; on land you breathe
//         through your skin; fins, scales and gills: still a fish (2.15, 2.16, 2.16a).
const hexL = (a, b, u) => { const pa = [1, 3, 5].map((i) => parseInt(a.substr(i, 2), 16)), pb = [1, 3, 5].map((i) => parseInt(b.substr(i, 2), 16)); return "#" + pa.map((v, i) => Math.round(lerp(v, pb[i], clamp(u))).toString(16).padStart(2, "0")).join(""); };
const youTag = (t, t0, txt) => OP(ramp(t, t0, .4), tpill(60 + tw(txt, 34, 600) / 2 + 26, 76, txt, 34, P.ink, "#fff", { w: 600 }));
// a soft tag that names what you feel (bottom centre, above the bottom fifth)
const feelTag = (t, t0, t1, txt, y = 790, x = 960) => t < t0 || t > t1 + .3 ? "" : TF(x, y, spring(t, t0, .45) * (1 - ramp(t, t1, .25)), tpill(0, 0, txt, 46, "#fff", P.ink, { w: 700 }));
// light rays under water
const uwRays = (t, col = "#fff", o = .13) => [0, 1, 2, 3, 4].map((i) => { const x = 200 + i * 400 + 60 * Math.sin(t * .5 + i * 1.3); return `<path d="M${n2(x)} -20 L${n2(x + 150)} -20 L${n2(x - 120 + 80 * Math.sin(t * .3 + i))} 1100 L${n2(x - 380)} 1100z" fill="${col}" opacity="${n2(o * (.6 + .4 * Math.sin(t * .8 + i * 2)))}"/>`; }).join("");
// specks drifting past as you move forward: d = how far you have swum (in "screens")
const uwSpecks = (d, n = 36, col = "#fff") => { let s = ""; for (let i = 0; i < n; i++) { const an = hash(i, 3) * Math.PI * 2, v = (hash(i, 7) + d * (.6 + .8 * hash(i, 5))) % 1, r = 60 + v * v * 1300, x = 960 + Math.cos(an) * r, y = 470 + Math.sin(an) * r * .62; s += `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(2 + 9 * v)}" fill="${col}" opacity="${n2(.5 * Math.sin(Math.PI * v))}"/>`; } return s; };

if (PART === 1) { (() => {
const HZ = 360;
// your own front foot (four toes with round pads), reaching up from the bottom corner. sd = -1 left, 1 right
const hand = (sd, wet = 0) => `<g transform="translate(${960 + sd * 470} 1130) scale(${sd} 1)"><path d="M90 60 Q40 -80 -70 -196" fill="none" stroke="#1F7A3A" stroke-width="150" stroke-linecap="round"/><path d="M90 60 Q40 -80 -70 -196" fill="none" stroke="#5CC455" stroke-width="134" stroke-linecap="round"/>
  ${[[-200, -262, 0], [-150, -340, 1], [-60, -372, 2], [20, -330, 3]].map(([x, y]) => `<path d="M-70 -196 L${x} ${y}" stroke="#1F7A3A" stroke-width="58" stroke-linecap="round"/><path d="M-70 -196 L${x} ${y}" stroke="#5CC455" stroke-width="44" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="38" fill="#7BD957" stroke="#1F7A3A" stroke-width="7"/><ellipse cx="${x - 8}" cy="${y - 12}" rx="13" ry="9" fill="#fff" opacity="${n2(.5 + .4 * wet)}"/>`).join("")}
  <path d="M44 -40 Q10 -110 -50 -170" fill="none" stroke="#fff" stroke-width="20" stroke-linecap="round" opacity="${n2(.35 + .45 * wet)}"/>${[[30, -10], [-20, -120], [70, 30]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="13" ry="17" fill="#DDF4FF" opacity="${n2(.5 + .4 * wet)}" stroke="#fff" stroke-width="3"/>`).join("")}</g>`;
// the world seen from the leaf: far bank, water, lily pads, reeds, the perch with the kingfisher, your leaf
const landWorld = (t) => { let pads = "", reeds = ""; [[420, 470, 120], [1260, 450, 90], [1620, 560, 190], [200, 600, 210], [960, 520, 110]].forEach(([x, y, rx], i) => { pads += TF(x, y + 3 * Math.sin(t + i), 1, lilyPad(rx, i % 2 ? "#6FD06A" : "#5CC455")); });
  [[40, 30], [150, 24], [260, 18], [1700, 22], [1800, 30], [1890, 26]].forEach(([x, w], i) => { const sw = 26 * Math.sin(t * .7 + i); reeds += `<path d="M${x} 1100 Q${n2(x + sw * .4)} 500 ${n2(x + sw + (i % 2 ? 60 : -40))} -40" fill="none" stroke="${i % 2 ? "#2F8A4C" : "#3F9A52"}" stroke-width="${w}" stroke-linecap="round"/>`; });
  return `<rect x="-400" y="-400" width="2720" height="${HZ + 400}" fill="url(#wSky)"/><circle cx="1380" cy="110" r="230" fill="#FFF3B8" opacity=".8" filter="url(#b60)"/>
  <g filter="url(#b4)">${Array.from({ length: 16 }, (_, i) => `<circle cx="${-100 + i * 140}" cy="${HZ - 30 - 30 * hash(i, 2)}" r="${90 + 50 * hash(i, 4)}" fill="${i % 3 ? "#4FA26A" : "#3F8F5C"}"/>`).join("")}</g>
  <rect x="-400" y="${HZ}" width="2720" height="1200" fill="url(#wWater)"/><path d="M-400 ${HZ + 2} H2320" stroke="#fff" stroke-width="5" opacity=".5"/>
  <g fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".4">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const x = ((i * 291 + t * (20 + i * 4)) % 2200) - 140, y = HZ + 40 + ((i * 83) % 420); return `<path d="M${n2(x)} ${y} q${30 + i * 4} -9 ${60 + i * 8} 0"/>`; }).join("")}</g>
  <g transform="translate(1150 ${HZ + 150}) scale(.55)"><path d="M0 0 Q-14 -150 8 -320" fill="none" stroke="#4E3A2A" stroke-width="34" stroke-linecap="round"/><path d="M6 -300 Q-50 -320 -150 -308" fill="none" stroke="#4E3A2A" stroke-width="24" stroke-linecap="round"/>${TF(-70, -318, .62, kingfisher({ bob: 1.5 * Math.sin(t * 1.7) }))}</g>
  ${pads}<g filter="url(#b2)">${reeds}</g>`; };
const myLeaf = () => `<ellipse cx="960" cy="1210" rx="1250" ry="400" fill="#66CC5C" stroke="#2F8A3E" stroke-width="10"/><g stroke="#2F8A3E" stroke-width="7" opacity=".45" stroke-linecap="round">${[-1000, -640, -320, 0, 320, 640, 1000].map((x) => `<path d="M960 1090 L${960 + x} ${n2(840 + Math.abs(x) * .1)}"/>`).join("")}</g><ellipse cx="700" cy="930" rx="300" ry="34" fill="#fff" opacity=".2"/>`;
// your own webbed hind foot, sweeping in beside you as you kick. v = 0..1 through one kick
const webFoot = (sd, v) => { if (v <= 0 || v >= 1) return ""; const up = v < .3 ? eo(v / .3) : 1 - ei((v - .3) / .7), spd = v < .3 ? .5 + .5 * eo(v / .3) : 1, x = 960 + sd * (640 - 120 * (v > .3 ? ei((v - .3) / .7) : 0)), y = 1420 - 520 * up, a = [-.5, -.17, .17, .5].map((q) => q * spd), L = 330;
  const tp = a.map((q) => [Math.sin(q) * L, -Math.cos(q) * L]);
  return `<g transform="translate(${n2(x)} ${n2(y)}) rotate(${n2(sd * -16)})"><path d="M0 60 V160" stroke="#1F7A3A" stroke-width="110" stroke-linecap="round"/><path d="M0 60 V160" stroke="#5CC455" stroke-width="94" stroke-linecap="round"/><path d="M0 40 L${tp.map((p) => n2(p[0]) + " " + n2(p[1])).join(" L")}z" fill="#B8EE86" stroke="#1F7A3A" stroke-width="8" stroke-linejoin="round" opacity=".95"/>
    ${tp.map((p) => `<path d="M0 40 L${n2(p[0])} ${n2(p[1])}" stroke="#1F7A3A" stroke-width="40" stroke-linecap="round"/><path d="M0 40 L${n2(p[0])} ${n2(p[1])}" stroke="#5CC455" stroke-width="28" stroke-linecap="round"/><circle cx="${n2(p[0])}" cy="${n2(p[1])}" r="26" fill="#7BD957" stroke="#1F7A3A" stroke-width="6"/>`).join("")}</g>`; };
SC.shrink = (t, s) => { const td = MK("dive"), tJ = MK("jump"), tU = MK("under"), tUp = MK("up"), tSp = tJ + .85, tBr = tUp + 1.05, tM = W("a903", "moist") - .1;
  const land = t < tSp || t >= tBr; let out = "";
  if (land) { const e = eio((t - td) / 2.0), back = t >= tBr, ju = back ? 0 : clamp((t - tJ) / .85), bq = back ? 1 + .012 * Math.sin((t - tBr) * 5) : 1 + .004 * Math.sin(t * 2), bob = back ? 30 * wob(t, tBr, .7) : 0;
    const z = lerp(.72, 1, e) * (1 + 1.3 * ei(ju)) * bq, py = 130 * Math.sin(Math.PI * Math.min(1, ju * 1.15)) * (ju < .87 ? 1 : 0) - 520 * ei(clamp((ju - .5) / .5)) + bob, wet = t >= tM ? .5 + .5 * Math.sin((t - tM) * 4) : 0, hd = 700 * ei(ju * 2) + 260 * (1 - e) + (back ? 500 * (1 - eo((t - tBr) / .6)) : 0);
    out += `<g transform="translate(960 ${n2(HZ + py)}) scale(${n2(z * 1000) / 1000}) translate(-960 ${-HZ})">${landWorld(t)}</g>`
      + `<g transform="translate(0 ${n2(hd * 1.3)})">${myLeaf()}</g><g transform="translate(0 ${n2(hd + 6 * Math.sin(t * 2))})">${hand(-1, wet)}${hand(1, wet)}</g>`;
    if (t >= tM && t < tJ) { let sp = ""; for (let i = 0; i < 10; i++) { const sd = i % 2 ? 1 : -1, v = ((t - tM) * .8 + i * .31) % 1, x = 960 + sd * (430 + 200 * hash(i, 3)), y = 760 + 260 * hash(i, 5); sp += `<g transform="translate(${n2(x)} ${n2(y)}) scale(${n2(.7 * Math.sin(Math.PI * v))}) rotate(${n2(60 * v)})"><path d="M0-32 Q4-4 32 0 Q4 4 0 32 Q-4 4 -32 0 Q-4-4 0-32z" fill="#fff"/></g>`; } out += sp; }
    out += feelTag(t, tM, LE("a903") + .5, "moist skin") + (back ? feelTag(t, W("a907", "lungs") - .2, LE("a907") + .4, "lungs and skin") + feelTag(t, W("a908", "land") - .1, s.t1, "land", 800, 560) + feelTag(t, W("a908", "water") - .1, s.t1, "water", 520, 1320) : "");
    if (back) { const u = t - tBr; for (let i = 0; i < 9; i++) { const x = 160 + hash(i, 3) * 1600, y0 = 80 + hash(i, 5) * 500, y = y0 + 500 * u * u * (.4 + hash(i, 7)); if (y < 1100) out += `<ellipse cx="${n2(x)}" cy="${n2(y)}" rx="${n2(14 + 12 * hash(i, 9))}" ry="${n2(20 + 22 * hash(i, 9))}" fill="#DDF4FF" opacity="${n2(.6 * clamp(1.4 - u * .6))}" stroke="#fff" stroke-width="3"/>`; } }
  } else { // under water
    const u = t - tSp, rise = eio((t - tUp) / 1.05), kicks = []; for (let k = tU + .5; k < tUp - .3; k += 1.35) kicks.push(k);
    const d = .1 * u + kicks.reduce((a, k) => a + .22 * eo((t - k - .25) / .7), 0), surge = kicks.reduce((a, k) => Math.max(a, pulse(t, k + .3, .08, .5)), 0), sy = 900 * rise, zz = 1 + .05 * surge;
    let pads = "", plants = ""; [[300, 150], [900, 110], [1500, 170], [1900, 130]].forEach(([x, rx], i) => { const xx = 960 + (x - 960) * (1 + d * 1.2), sc = 1 + d * .8; pads += `<path d="M${n2(xx)} ${n2(40 + 10 * i)} Q${n2(xx + 40 * Math.sin(t + i))} 500 ${n2(xx - 60 + 30 * i)} 1100" fill="none" stroke="#2F7F5C" stroke-width="${n2(8 * sc)}" opacity=".6"/><ellipse cx="${n2(xx)}" cy="${n2(34 + 8 * i)}" rx="${n2(rx * sc)}" ry="${n2(rx * .2 * sc)}" fill="#1F6F4C" opacity=".85"/>`; });
    for (let i = 0; i < 12; i++) { const side = i % 2 ? 1 : -1, v = (hash(i, 2) + d * 1.1) % 1, x = 960 + side * (140 + v * v * 1200), h = 180 + 500 * v, sw = 30 * Math.sin(t * 1.2 + i); plants += `<path d="M${n2(x)} 1100 Q${n2(x + sw)} ${n2(1100 - h * .6)} ${n2(x - sw * .6)} ${n2(1100 - h)}" fill="none" stroke="${i % 3 ? "#2F8A5C" : "#49A86A"}" stroke-width="${n2(10 + 26 * v)}" stroke-linecap="round" opacity="${n2(.5 + .5 * v)}"/>`; }
    const fv = clamp((t - tU - 1.2) / 4.5), fish = fv > 0 && fv < 1 ? TF(lerp(1500, 240, fv), 420 + 40 * Math.sin(t * 2), lerp(.35, 1.0, fv), `<g transform="scale(-1 1)">${fishG({ wag: t })}</g>`) : "";
    out += `<g transform="translate(960 ${n2(470 + sy)}) scale(${n2(zz)}) translate(-960 -470)"><rect x="-200" y="-1200" width="2320" height="2400" fill="url(#uwF)"/><rect x="-200" y="-1200" width="2320" height="1210" fill="#EAFBFF"/><g fill="none" stroke="#fff" stroke-width="7" opacity=".7">${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${n2(((i * 400 + t * 60) % 2400) - 240)} ${n2(16 + 6 * Math.sin(t * 2 + i))} q60 -16 120 0 q60 16 120 0"/>`).join("")}</g>
      ${uwRays(t)}${pads}<g filter="url(#b2)">${fish}</g>${plants}${uwSpecks(d)}</g>`
      + kicks.map((k) => webFoot(-1, (t - k) / 1.0) + webFoot(1, (t - k) / 1.0)).join("")
      + feelTag(t, W("a905", "webbed") - .2, LE("a905") + .5, "strong legs, webbed feet", 560) + feelTag(t, W("a906", "breathe") - .2, tUp, "You breathe through your skin", 560)
      + `<rect width="1920" height="1080" fill="none" stroke="#BFF0E6" stroke-width="${n2(60 + 30 * Math.sin(t * 2.4))}" opacity="${n2(t >= LT("a906") ? .22 : 0)}" filter="url(#b30)"/>`;
    // the splash you make going in
    if (u < 1.1) { let dr = ""; for (let i = 0; i < 26; i++) { const an = hash(i, 3) * Math.PI * 2, r = (120 + 900 * hash(i, 5)) * eo(u / .7); dr += `<circle cx="${n2(960 + Math.cos(an) * r)}" cy="${n2(500 + Math.sin(an) * r * .7)}" r="${n2((10 + 26 * hash(i, 7)) * (1 - u / 1.1))}" fill="#fff" opacity=".9"/>`; }
      out += `<rect width="1920" height="1080" fill="#fff" opacity="${n2(clamp(1 - u / .35))}"/>` + dr; }
  }
  const fl = pulse(t, tBr, .12, .5);
  return out + `<rect width="1920" height="1080" fill="#fff" opacity="${n2(.9 * fl)}"/>` + youTag(t, td + 1.0, "You: a frog") + wipe(t, s.t0, "#DFF6E6") + wipe(t, s.t1, "#DFF6E6"); };
})(); }
