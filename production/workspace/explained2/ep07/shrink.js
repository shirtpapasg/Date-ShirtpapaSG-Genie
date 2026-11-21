// shrink.js (EP7): the first-person journeys (the series' signature). The camera IS the thing.
// EP5's two journeys (the frog, the mudskipper) were cleared; their code stays in ../ep05/shrink.js for reference.
// Stage 2 (the artist) draws here:
//   Part 1 SC.shrink: BE A SPORE of bread mould (marks dive, land, bag, threads, substance, absorb, patch; lines g902-g908)
//   Part 2 SC.shrink: BE A BACTERIUM on a fingertip (marks dive, hills, recess, wash, drain, clean; lines j502-j507)
// See SCENES_TODO.md. The generic helpers below (tags, rays, drifting specks) are kept.
const hexL = (a, b, u) => { const pa = [1, 3, 5].map((i) => parseInt(a.substr(i, 2), 16)), pb = [1, 3, 5].map((i) => parseInt(b.substr(i, 2), 16)); return "#" + pa.map((v, i) => Math.round(lerp(v, pb[i], clamp(u))).toString(16).padStart(2, "0")).join(""); };
const youTag = (t, t0, txt) => OP(ramp(t, t0, .4), tpill(60 + tw(txt, 34, 600) / 2 + 26, 76, txt, 34, P.ink, "#fff", { w: 600 }));
// a soft tag that names what you feel (bottom centre, above the bottom fifth)
const feelTag = (t, t0, t1, txt, y = 790, x = 960) => t < t0 || t > t1 + .3 ? "" : TF(x, y, spring(t, t0, .45) * (1 - ramp(t, t1, .25)), tpill(0, 0, txt, 46, "#fff", P.ink, { w: 700 }));
// light rays under water
const uwRays = (t, col = "#fff", o = .13) => [0, 1, 2, 3, 4].map((i) => { const x = 200 + i * 400 + 60 * Math.sin(t * .5 + i * 1.3); return `<path d="M${n2(x)} -20 L${n2(x + 150)} -20 L${n2(x - 120 + 80 * Math.sin(t * .3 + i))} 1100 L${n2(x - 380)} 1100z" fill="${col}" opacity="${n2(o * (.6 + .4 * Math.sin(t * .8 + i * 2)))}"/>`; }).join("");
// specks drifting past as you move forward: d = how far you have swum (in "screens")
const uwSpecks = (d, n = 36, col = "#fff") => { let s = ""; for (let i = 0; i < n; i++) { const an = hash(i, 3) * Math.PI * 2, v = (hash(i, 7) + d * (.6 + .8 * hash(i, 5))) % 1, r = 60 + v * v * 1300, x = 960 + Math.cos(an) * r, y = 470 + Math.sin(an) * r * .62; s += `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(2 + 9 * v)}" fill="${col}" opacity="${n2(.5 * Math.sin(Math.PI * v))}"/>`; } return s; };


/* =====================================================================================================================================
   BE A SPORE OF BREAD MOULD (Part 1). The camera IS the spore: it floats in the kitchen air, lands on the slice on Day 1, the bag closes over
   it, it grows thin threads into the bread, makes a substance that breaks the bread down into simpler substances, absorbs them, and
   becomes a fuzzy patch with new spores. Every step is the book's (2.27, 2.27a, 2.28). The fungus ABSORBS; it never eats.
   sporeJourney(t, M): M = the times of the stops { dive, land, bag, closes, threads, substance, breaks, simpler, absorb, patch, end }, so
   Part 2's recap can show the threads again. o.notags hides the tags.
   ===================================================================================================================================== */
const SPF = 620;
// a point on the bread (X across, Z away from you) -> [screen x, screen y, scale]; cam = { d: how far forward, h: eye height, hor: horizon y }
const gproj = (X, Z, cam) => { const z = Z - cam.d; if (z < 70) return null; const s = SPF / z; return [960 + X * s, cam.hor + cam.h * s, s]; };
// the holes of the crumb (caves) and its small pores: fixed places on the bread
const HOLES = (() => { const r = rndm(88), a = []; for (let i = 0; i < 64; i++) { const Z = 170 + Math.pow(r(), 1.5) * 5200, X = (r() - .5) * (1500 + Z * 1.5), R = 46 + r() * 110; if (Math.hypot(X, Z - 300) < 210) continue; a.push([X, Z, R]); } return a.sort((p, q) => q[1] - p[1]); })();
const PORES = (() => { const r = rndm(90), a = []; for (let i = 0; i < 150; i++) { const Z = 130 + Math.pow(r(), 1.4) * 3200; a.push([(r() - .5) * (1700 + Z * 1.4), Z, 7 + r() * 16]); } return a; })();
// the slice from where you stand: a wide, pale field of crumb, full of holes like caves; a low brown ridge of crust far away
function breadGround(cam, o = {}) { let s = `<rect x="-400" y="${n2(cam.hor - 26)}" width="2720" height="40" rx="18" fill="#C9914E"/><rect x="-400" y="${n2(cam.hor - 26)}" width="2720" height="12" rx="6" fill="#E2B070"/><rect x="-400" y="${n2(cam.hor)}" width="2720" height="${n2(1300 - cam.hor)}" fill="url(#jCrumb)"/>`;
  for (const [X, Z, R] of PORES) { const p = gproj(X, Z, cam); if (!p || p[1] > 1150 || p[0] < -80 || p[0] > 2000) continue; s += `<ellipse cx="${n2(p[0])}" cy="${n2(p[1])}" rx="${n2(R * p[2])}" ry="${n2(R * p[2] * .34)}" fill="#E6D2A2" opacity="${n2(clamp(p[2] * 3, .15, .8))}"/>`; }
  for (const [X, Z, R] of HOLES) { const p = gproj(X, Z, cam); if (!p || p[1] - R * p[2] > 1120) continue; const rx = R * p[2], ry = rx * .36, a = clamp(p[2] * 5, 0, 1); if (rx < 2 || p[0] + rx < -40 || p[0] - rx > 1960) continue;
    s += `<g opacity="${n2(a)}"><ellipse cx="${n2(p[0])}" cy="${n2(p[1] + ry * .12)}" rx="${n2(rx * 1.07)}" ry="${n2(ry * 1.12)}" fill="#FFFBEF"/><ellipse cx="${n2(p[0])}" cy="${n2(p[1])}" rx="${n2(rx)}" ry="${n2(ry)}" fill="#D9BE88"/><ellipse cx="${n2(p[0])}" cy="${n2(p[1] - ry * .2)}" rx="${n2(rx * .9)}" ry="${n2(ry * .74)}" fill="#B8975E"/><ellipse cx="${n2(p[0])}" cy="${n2(p[1] - ry * .36)}" rx="${n2(rx * .7)}" ry="${n2(ry * .46)}" fill="#8E6E40" opacity=".8"/></g>`; }
  return s + `<rect x="-400" y="${n2(cam.hor)}" width="2720" height="150" fill="url(#jHaze)"/>`; }
// your threads: they start where you landed and branch out along the bread. Built once: [{ pts: [[X, Z, tau]], t0, t1, w }]
const THREADS = (() => { const out = [], r = rndm(123), O = [0, 300];
  const grow = (x, z, ang, len, t0, w, lev) => { const n = Math.max(4, Math.round(len / 70)), pts = [[x, z, t0]], dt = len / 2600; let a = ang, cx = x, cz = z;
    for (let i = 1; i <= n; i++) { a += (r() - .5) * .5; cx += Math.sin(a) * len / n; cz += Math.cos(a) * len / n; if (cz < 150) { cz = 150 + r() * 30; a = a > 0 ? 1.2 : -1.2; } pts.push([cx, cz, t0 + dt * i / n]);
      if (lev < 2 && i > 1 && i < n && r() < (lev ? .22 : .4)) grow(cx, cz, a + (r() < .5 ? -1 : 1) * (.5 + r() * .5), len * (.34 + r() * .3), t0 + dt * i / n, w * .7, lev + 1); }
    out.push({ pts, t0, t1: t0 + dt, w }); };
  [-1.45, -.9, -.45, -.08, .3, .7, 1.2, 2.2, -2.3].forEach((a, i) => grow(O[0], O[1], a, 900 + r() * 1100, .02 * i, 1, 0)); return out; })();
function threadsSvg(cam, g, thick = 1, o = {}) { let hal = "", core = "", fl = "";
  for (const b of THREADS) { if (g <= b.t0) continue; let prev = null;
    for (let i = 0; i < b.pts.length; i++) { const [X, Z, tau] = b.pts[i]; let p = gproj(X, Z, cam); if (!p) { prev = null; continue; }
      if (prev && prev.tau < g) { let q = p; if (tau > g) { const f = (g - prev.tau) / (tau - prev.tau); q = [lerp(prev.p[0], p[0], f), lerp(prev.p[1], p[1], f), lerp(prev.p[2], p[2], f)]; }
        const sw = Math.max(1.4, b.w * 9 * (prev.p[2] + q[2]) / 2 * thick), d = `M${n2(prev.p[0])} ${n2(prev.p[1])} L${n2(q[0])} ${n2(q[1])}`;
        hal += `<path d="${d}" stroke-width="${n2(sw * 2.1)}"/>`; core += `<path d="${d}" stroke-width="${n2(sw)}"/>`;
        if (o.flow && tau <= g) { const u = ((o.flow * 1.3 - tau * 6) % 1 + 1) % 1; if (u < .22) fl += `<circle cx="${n2(lerp(q[0], prev.p[0], u / .22))}" cy="${n2(lerp(q[1], prev.p[1], u / .22))}" r="${n2(sw * .8)}" fill="#FFF3C4"/>`; } }
      prev = { p, tau }; } }
  return `<g fill="none" stroke="#B9A77E" stroke-linecap="round" opacity=".35" transform="translate(0 5)">${core}</g><g fill="none" stroke="#fff" stroke-linecap="round" opacity=".5" filter="url(#b3)">${hal}</g><g fill="none" stroke="#fff" stroke-linecap="round">${core}</g>${fl}`; }
// the places along the threads where the substance spreads and the bread breaks into small dots: [X, Z, tau, seed]
const SPOTS = (() => { const a = []; THREADS.forEach((b, bi) => b.pts.forEach((p, i) => { if (i % 2 === 1 && p[1] < 1700) a.push([p[0], p[1], p[2], bi * 31 + i]); })); return a; })();
function filmSvg(cam, k, shine) { let s = ""; if (k <= 0) return ""; for (const [X, Z, tau, sd] of SPOTS) { const p = gproj(X, Z, cam); if (!p) continue; const kk = ss(tau * .9, tau * .9 + .5, k); if (kk < .02) continue; const rx = (110 + 60 * hash(sd, 2)) * p[2] * kk, ry = rx * .36;
    s += `<ellipse cx="${n2(p[0])}" cy="${n2(p[1])}" rx="${n2(rx)}" ry="${n2(ry)}" fill="#EAD6A0" opacity=".5"/><ellipse cx="${n2(p[0])}" cy="${n2(p[1])}" rx="${n2(rx)}" ry="${n2(ry)}" fill="#DDF4FF" opacity=".42" stroke="#fff" stroke-width="${n2(Math.max(1, 5 * p[2]))}"/><path d="M${n2(p[0] - rx * .6)} ${n2(p[1] - ry * .3)} q${n2(rx * .3)} ${n2(-ry * .5)} ${n2(rx * .7)} ${n2(-ry * .4)}" fill="none" stroke="#fff" stroke-width="${n2(Math.max(1, 9 * p[2]))}" stroke-linecap="round" opacity="${n2(.6 + .4 * Math.sin(shine * 3 + sd))}"/>`; }
  return s; }
// the small pale dots (the simpler substances): they appear where the film touches the crumb (k 0..1), then flow into the threads (ab 0..1)
function dotsSvg(cam, k, ab, t) { let s = ""; if (k <= 0) return ""; for (const [X, Z, tau, sd] of SPOTS) { for (let j = 0; j < 5; j++) { const an = hash(sd, j + 4) * 6.283, rr = 50 + 90 * hash(sd, j + 9), kk = ss(tau * .8 + j * .05, tau * .8 + j * .05 + .3, k); if (kk < .02) continue;
      const a2 = ss(.1 + .5 * hash(sd, j) , .55 + .45 * hash(sd, j), ab), X2 = X + Math.cos(an) * rr * (1 - a2), Z2 = Z + Math.sin(an) * rr * .8 * (1 - a2), p = gproj(X2, Z2, cam); if (!p || a2 > .98) continue;
      const r0 = (9 + 5 * hash(sd, j + 2)) * p[2] * kk * (1 - .5 * a2); s += `<circle cx="${n2(p[0])}" cy="${n2(p[1] - 3 * p[2] * Math.abs(Math.sin(t * 2 + sd + j)))}" r="${n2(Math.max(1.4, r0))}" fill="#FFF3C4" stroke="#E0BC6A" stroke-width="${n2(Math.max(.8, 2.4 * p[2]))}" opacity="${n2(1 - a2 * .4)}"/>`; } }
  return s; }
// the fuzzy patch: cottony white growth, tiny stalks with round green-grey heads, a fine dust (new spores) lifting off. k 0..1
const STALKS = (() => { const r = rndm(321), a = []; for (let i = 0; i < 74; i++) { const Z = 150 + Math.pow(r(), 1.25) * 2300; a.push([(r() - .5) * (1300 + Z * 1.5), Z, 110 + r() * 150, r(), r()]); } return a.sort((p, q) => q[1] - p[1]); })();
function patchSvg(cam, k, t) { if (k <= 0) return ""; let fz = "", st = "", near = "", dust = "";
  for (const [X, Z, H, a, b] of STALKS) { const p = gproj(X, Z, cam); if (!p || p[0] < -200 || p[0] > 2120) continue; const kk = ss(a * .6, a * .6 + .4, k); if (kk < .02) continue; const s = p[2], hh = H * s * kk, sw = 9 * Math.sin(t * .9 + a * 9) * s, tx = p[0] + sw + (b - .5) * 40 * s, ty = p[1] - hh, hr = (20 + 12 * b) * s * ss(.3, 1, kk);
    let one = ""; for (let j = 0; j < 4; j++) { const an = j * 1.7 + a * 6, q = (34 + 30 * hash(j, a * 99)) * s * kk; fz += `<ellipse cx="${n2(p[0] + Math.cos(an) * q)}" cy="${n2(p[1] + Math.sin(an) * q * .34)}" rx="${n2((26 + 16 * b) * s * kk)}" ry="${n2((12 + 8 * b) * s * kk)}"/>`; }
    one += `<path d="M${n2(p[0])} ${n2(p[1])} Q${n2(p[0] + (b - .5) * 30 * s)} ${n2(p[1] - hh * .5)} ${n2(tx)} ${n2(ty)}" fill="none" stroke="#A9B8B0" stroke-width="${n2(Math.max(1.4, 8 * s))}" stroke-linecap="round"/><path d="M${n2(p[0])} ${n2(p[1])} Q${n2(p[0] + (b - .5) * 30 * s)} ${n2(p[1] - hh * .5)} ${n2(tx)} ${n2(ty)}" fill="none" stroke="#fff" stroke-width="${n2(Math.max(1, 5 * s))}" stroke-linecap="round"/>`;
    if (hr > 1) { const dk = ss(.5, 1, kk); one += `<circle cx="${n2(tx)}" cy="${n2(ty)}" r="${n2(hr)}" fill="${hexL("#B9D2C2", b > .5 ? "#56705F" : "#7C9A88", dk)}" stroke="#3F5246" stroke-width="${n2(Math.max(.8, 2.6 * s))}"/><circle cx="${n2(tx - hr * .3)}" cy="${n2(ty - hr * .34)}" r="${n2(hr * .3)}" fill="#fff" opacity=".55"/>`;
      if (kk > .85) for (let j = 0; j < 4; j++) { const v = ((t * .22 + hash(j, a * 77)) % 1), dx = (hash(j, b * 55) - .3) * 150 * s * v + 30 * s * Math.sin(v * 5 + j), dy = -200 * s * v; dust += `<circle cx="${n2(tx + dx)}" cy="${n2(ty + dy)}" r="${n2(Math.max(1.3, 4.5 * s))}" fill="#6F8E7C" opacity="${n2(.8 * Math.sin(Math.PI * v))}"/>`; } }
    if (s > 2.2) near += one; else st += one; }
  return `<g fill="#fff" opacity=".8" filter="url(#b3)">${fz}</g>${st}<g filter="url(#b3)">${near}</g>${dust}`; }
// the kitchen air: the room far away and soft, the edge of the table like a cliff, a cup as tall as a tower; big slow dust motes near you
function airWorld(t, u) { const yH = lerp(600, 430, eio(u * 1.25)), yE = lerp(690, 1500, eio(u / .42)), cx = lerp(1330, 1640, u), ck = lerp(.8, 1.25, u), bob = 8 * Math.sin(t * .9);
  let grain = ""; for (let i = -9; i <= 9; i++) grain += `<path d="M${n2(960 + i * 40)} ${n2(yH)} L${n2(960 + i * 420)} ${n2(yE)}" stroke="#D9A868" stroke-width="${3 + Math.abs(i) % 3}" opacity=".3"/>`;
  let motes = ""; for (let i = 0; i < 16; i++) { const x = (hash(i, 3) * 2300 + t * (10 + 26 * hash(i, 5))) % 2300 - 190, y = 80 + hash(i, 7) * 860 + 40 * Math.sin(t * .4 + i * 2), r = 16 + hash(i, 9) * 60; motes += `<circle cx="${n2(x)}" cy="${n2(y + bob)}" r="${n2(r)}" fill="#FFF8E6" opacity="${n2(.16 + .22 * hash(i, 11))}"/>`; }
  let fib = ""; for (let i = 0; i < 5; i++) { const x = (hash(i, 13) * 2200 + t * (16 + 10 * i)) % 2200 - 140, y = 160 + hash(i, 15) * 700 + bob; fib += `<path d="M${n2(x)} ${n2(y)} q${n2(60 + 30 * Math.sin(t + i))} ${n2(-50)} ${n2(150)} ${n2(-10 + 20 * Math.sin(t * .7 + i))}" fill="none" stroke="#FFF8E6" stroke-width="5" stroke-linecap="round" opacity=".35"/>`; }
  return `<rect width="1920" height="1080" fill="url(#jAir)"/><g filter="url(#b30)"><rect x="${n2(240 - 60 * u)}" y="-140" width="900" height="${n2(yH + 60)}" fill="#DDF1FF" opacity=".95"/><rect x="${n2(530 - 60 * u)}" y="-140" width="26" height="${n2(yH + 60)}" fill="#fff"/><rect x="${n2(830 - 60 * u)}" y="-140" width="26" height="${n2(yH + 60)}" fill="#fff"/><rect x="${n2(1500 - 90 * u)}" y="-60" width="620" height="${n2(yH - 160)}" fill="#7FCABE" opacity=".8"/><rect x="${n2(-260 - 40 * u)}" y="-60" width="380" height="${n2(yH + 30)}" fill="#E3E9F1"/></g>
    <g style="mix-blend-mode:screen"><path d="M300 -100 H1100 L1700 1180 H-200z" fill="#FFF6D8" opacity=".22" filter="url(#b30)"/></g>
    <path d="M-200 ${n2(yH)} H2120 V${n2(yE)} H-200z" fill="url(#kTable)"/>${grain}<rect x="-200" y="${n2(yH)}" width="2320" height="90" fill="url(#jHazeW)"/>
    <g transform="translate(${n2(cx)} ${n2(yH + 26 + 60 * u)}) scale(${n2(ck)})" filter="url(#b3)"><ellipse cx="0" cy="0" rx="230" ry="30" fill="#B98F56" opacity=".5"/><path d="M-170 -420 H170 L150 -40 Q146 0 100 0 H-100 Q-146 0 -150 -40z" fill="#7FB8E8"/><path d="M-170 -420 H170 L166 -350 H-166z" fill="#A9D2F2"/><path d="M168 -330 Q300 -320 290 -200 Q280 -90 156 -110" fill="none" stroke="#7FB8E8" stroke-width="44"/><path d="M-130 -380 L-116 -60" stroke="#fff" stroke-width="30" stroke-linecap="round" opacity=".5"/>
      ${[0, 1, 2].map((i) => `<path d="M${-70 + i * 70} -440 q${n2(30 * Math.sin(t + i))} -70 0 -140 q${n2(-30 * Math.sin(t + i))} -70 0 -140" fill="none" stroke="#fff" stroke-width="20" stroke-linecap="round" opacity=".4"/>`).join("")}</g>
    ${yE < 1100 ? `<path d="M-200 ${n2(yE)} H2120 V${n2(yE + 300)} H-200z" fill="url(#kTableF)"/><path d="M-200 ${n2(yE)} H2120" stroke="#FFF1D6" stroke-width="12" opacity=".8"/>${Array.from({ length: 12 }, (_, i) => `<path d="M${-100 + i * 190} ${n2(yE + 30)} q30 120 -10 250" stroke="#8A5E34" stroke-width="7" fill="none" opacity=".3"/>`).join("")}<rect x="-200" y="${n2(yE + 290)}" width="2320" height="900" fill="#5E4630"/><rect x="-200" y="${n2(yE + 240)}" width="2320" height="200" fill="#3E2E22" opacity=".6" filter="url(#b30)"/>` : ""}
    <g filter="url(#b10)">${motes}</g>${fib}`; }
// the soft kitchen above the bread (after landing), and the bag's clear plastic sky with its zip far above
const breadSky = () => `<rect width="1920" height="1080" fill="url(#jAir)"/><g filter="url(#b30)"><rect x="180" y="-200" width="900" height="560" fill="#DDF1FF"/><rect x="1480" y="-100" width="640" height="420" fill="#7FCABE" opacity=".7"/><rect x="-260" y="-100" width="330" height="560" fill="#E3E9F1"/></g>`;
function plasticSky(t, p, q, glow, hor) { if (p <= 0) return ""; const x0 = lerp(2100, -500, p), zy = 150; let cr = "";
  for (let i = 0; i < 7; i++) cr += `<path d="M${n2(x0 + 300 + i * 330)} ${n2(40 + 60 * hash(i, 3))} q${n2(120)} ${n2(100 + 60 * hash(i, 5))} ${n2(40)} ${n2(hor - 80)}" fill="none" stroke="#fff" stroke-width="${n2(4 + 6 * hash(i, 7))}" stroke-linecap="round" opacity="${n2(.25 + .2 * hash(i, 9))}"/>`;
  const zx0 = Math.max(0, x0 + 80), zw = 1920 - zx0;
  return `<clipPath id="pls"><rect x="${n2(x0)}" y="-20" width="2800" height="${n2(hor + 20)}"/></clipPath><g clip-path="url(#pls)"><rect x="-20" y="-20" width="1960" height="${n2(hor + 20)}" fill="#CFE9FA" opacity=".34"/><g filter="url(#b10)"><path d="M${n2(x0 + 200)} -20 L${n2(x0 + 620)} -20 L${n2(x0 + 340)} ${hor} L${n2(x0 + 60)} ${hor}z" fill="#fff" opacity=".5"/><path d="M${n2(x0 + 1200)} -20 L${n2(x0 + 1400)} -20 L${n2(x0 + 1180)} ${hor} L${n2(x0 + 1050)} ${hor}z" fill="#fff" opacity=".35"/></g>${cr}
    <path d="M${n2(zx0)} ${zy - 9} Q${n2(zx0 + zw / 2)} ${zy - 44} 1940 ${zy - 9} M${n2(zx0)} ${zy + 13} Q${n2(zx0 + zw / 2)} ${zy - 22} 1940 ${zy + 13}" fill="none" stroke="#9FE0D6" stroke-width="7" opacity=".9"/>
    ${q > .01 ? `<clipPath id="zpc"><rect x="-20" y="0" width="${n2(1960 * q)}" height="300"/></clipPath><g clip-path="url(#zpc)">${glow > .03 ? `<path d="M-20 ${zy} Q960 ${zy - 36} 1940 ${zy}" fill="none" stroke="${P.sun}" stroke-width="70" opacity="${n2(.7 * glow)}" filter="url(#b10)"/>` : ""}<path d="M-20 ${zy + 2} Q960 ${zy - 34} 1940 ${zy + 2}" fill="none" stroke="#1FA89A" stroke-width="30"/><path d="M-20 ${zy - 5} Q960 ${zy - 41} 1940 ${zy - 5}" fill="none" stroke="#8FF0E0" stroke-width="6"/></g>` + (q < .99 ? `<circle cx="${n2(1960 * q - 20)}" cy="${n2(zy - 36 * Math.sin(Math.PI * q))}" r="60" fill="${P.sun}" opacity=".7" filter="url(#b10)"/><circle cx="${n2(1960 * q - 20)}" cy="${n2(zy - 36 * Math.sin(Math.PI * q))}" r="24" fill="#fff"/>` : "") : ""}</g>
    ${p < .98 ? `<path d="M${n2(x0)} -20 Q${n2(x0 - 70)} ${n2(hor / 2)} ${n2(x0)} ${hor}" fill="none" stroke="#fff" stroke-width="14" opacity=".9"/>` : ""}`; }
// you, the spore: the round top of your own body at the bottom of the frame
const mySpore = (t, k = 1) => `<g transform="translate(960 ${n2(1160 + 6 * Math.sin(t * 1.3))}) scale(${k})"><ellipse rx="350" ry="170" fill="#4E6A5C"/><ellipse rx="338" ry="160" fill="url(#jSpore)"/><path d="M-250 -80 Q-120 -150 80 -150" fill="none" stroke="#fff" stroke-width="16" stroke-linecap="round" opacity=".5"/><ellipse rx="350" ry="170" fill="none" stroke="#FFE9A8" stroke-width="5" opacity=".7"/></g>`;
const XDEFSJ = () => `${lg("jCrumb", [[0, "#FFF6E2"], [.25, "#FBEBCB"], [1, "#F0D8A8"]])}${lg("jHaze", [[0, "#FFF4DC", .95], [1, "#FFF4DC", 0]])}${lg("jHazeW", [[0, "#FFF0D0", .9], [1, "#FFF0D0", 0]])}${lg("jAir", [[0, "#FFF7E4"], [.5, "#FBEBCB"], [1, "#F1D9AE"]])}${rg("jSpore", [[0, "#A9C7B4"], [.6, "#7C9A88"], [1, "#56705F"]], .4, .2, .9)}
  ${lg("jSkin", [[0, "#FFE9DA"], [1, "#F6BE9C"]])}${lg("jSkinHz", [[0, "#FFEDE0", .95], [1, "#FFEDE0", 0]])}${rg("jBub", [[0, "#fff", .05], [.7, "#DDF1FF", .25], [1, "#fff", .7]])}${rg("jDrain", [[0, "#1A1C24"], [.5, "#8E9AA8"], [1, "#DCE3EA"]])}${lg("jWater", [[0, "#BFE6FF", .15], [1, "#8FD0FF", .55]])}`;
function sporeJourney(t, M, o = {}) { const u = clamp((t - M.dive) / (M.land - M.dive)); let s = "";
  const sp = t >= M.land ? 1 : Math.pow(clamp((u - .2) / .8), 3.2), kf = lerp(.03, 1, sp);
  // the camera on the bread: a small dip on landing; a slow rise for the patch
  const dip = t >= M.land ? wob(t, M.land, .7) : 0, rise = ss(M.patch, M.patch + 2.6, t), cam = { d: -40 * rise, h: 150 * (1 - .22 * dip) + 95 * rise, hor: 430 - 26 * rise + 3 * Math.sin(t * .7) };
  const g = t < M.threads ? 0 : eo((t - M.threads) / 3.4) * 1.05, fk = (t - M.substance) / 2.4, dk = (t - M.breaks) / 2.0, ab = ss(M.absorb, M.patch - .1, t), pk = t < M.patch ? 0 : (t - M.patch) / 2.6, thick = 1 + .7 * ab;
  const field = () => breadGround(cam) + (fk > 0 ? OP(1 - ss(M.patch + .4, M.patch + 1.6, t), filmSvg(cam, fk, t)) : "") + (dk > 0 && ab < 1 ? dotsSvg(cam, dk, ab, t) : "") + (g > 0 ? threadsSvg(cam, g, thick, ab > 0 && ab < 1 ? { flow: t } : {}) : "") + patchSvg(cam, pk, t);
  if (t < M.land) { // in the air; the slice (on its white tray) comes up to meet you
    const fx = lerp(820, 960, eio(sp)), fy = lerp(lerp(640, 470, eio(u * 1.25)), 430, sp);
    s += airWorld(t, u) + `<g transform="translate(${n2(fx)} ${n2(fy)}) scale(${n2(kf * 1000) / 1000}) translate(-960 -430)"><rect x="-2600" y="250" width="7100" height="2600" rx="300" fill="#F4F6FA" stroke="#C9D2E0" stroke-width="30"/><rect x="-460" y="396" width="2840" height="1130" rx="120" fill="#B97E3E"/>${OP(clamp(kf * 6), `<clipPath id="slc"><rect x="-400" y="380" width="2720" height="1100" rx="100"/></clipPath><g clip-path="url(#slc)">${breadGround({ d: 0, h: 150, hor: 430 })}</g>`)}</g>`;
  } else { const p = (t - M.bag) / 1.7, q = ss(M.closes - .15, M.closes + 1.0, t);
    s += breadSky() + plasticSky(t, eio(p), q, pulse(t, M.closes + .5, .6, 1.2), cam.hor) + field();
    if (t < M.land + .7) { const e = (t - M.land) / .7; for (let i = 0; i < 9; i++) { const an = -Math.PI * (.08 + i * .105); s += `<circle cx="${n2(960 + Math.cos(an) * 420 * eo(e))}" cy="${n2(980 + Math.sin(an) * 150 * eo(e))}" r="${n2(14 + 20 * e)}" fill="#FFF8E6" opacity="${n2(.7 * (1 - e))}" filter="url(#b4)"/>`; } }
    if (t > M.bag) s += `<rect width="1920" height="1080" fill="#BFE0F4" opacity="${n2(.07 * eio(p))}"/>`; }
  s += mySpore(t, 1 - .12 * rise);
  if (!o.notags) { s += OP(1 - ramp(t, M.end - .3, .3), youTag(t, M.dive + 1.9, "You: one spore") + OP(ramp(t, M.dive + 2.3, .4), tpill(60 + tw("You: one spore", 34, 600) + 52 + tw("too small to see", 30, 600) / 2 + 40, 76, "too small to see", 30, "#fff", P.ink, { w: 600 })))
      + feelTag(t, M.land + .35, M.bag - .15, "on the bread") + feelTag(t, M.closes + .5, M.threads - .15, "inside the bag") + feelTag(t, M.threads + .5, M.substance - .15, "threads") + feelTag(t, M.substance + .7, M.breaks + .5, "a substance") + feelTag(t, M.simpler - .2, M.absorb - .15, "simpler substances")
      + feelTag(t, M.absorb + .35, M.patch - .1, "absorb = take in") + feelTag(t, M.patch + 1.5, M.end - .3, "new spores") + speeded(t, M.threads + .2, M.end - .3, 1700, 76); }
  return s + `<rect width="1920" height="1080" fill="none" stroke="${P.sun}" stroke-width="26" opacity=".16" filter="url(#b10)"/>`; }
if (PART === 1) { const M1 = () => ({ dive: MK("dive"), land: MK("land"), bag: MK("bag"), closes: W("g904", "closes"), threads: MK("threads"), substance: MK("substance"), breaks: W("g906", "breaks"), simpler: W("g906", "simpler"), absorb: MK("absorb"), patch: MK("patch"), end: SCN.shrink.t1 });
  SC.shrink = (t, s) => sporeJourney(t, M1()) + wipe(t, s.t0, "#FFF6E0"); SCN.shrink.nograde = false; }
