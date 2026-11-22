// v2common.js: EP13 v2 (the teacher's-eye redo, 22 Nov 2026): helpers shared by p1v2.js and p2v2.js. Loaded after closer.js / shrink.js.
// (p1v2.js keeps its own copies inside its closure; p2v2.js uses these.)
const V2 = (() => {
  const L3 = (a, b, u) => [lerp(a[0], b[0], u), lerp(a[1], b[1], u), lerp(a[2], b[2], u)];
  const nodAt = (t, t0, d = 1.2, a = 5) => t < t0 || t > t0 + d ? 0 : a * Math.sin((t - t0) * 9) * (1 - (t - t0) / d);
  const poses = (...p) => p.filter((x) => x && x[0] !== undefined).sort((a, b) => a[0] - b[0]);
  // a buddy's face peeking in from a lower corner of a look-closer panel, reacting on the beats (clipped to the panel)
  function peek(t, who, tin, tout, ps, o = {}) { const k = ss(tin, tin + .45, t) * (1 - ss(tout - .35, tout, t)); if (k <= .01) return "";
    const W_ = LCW, x0 = W_.x - W_.w / 2, y0 = W_.y - W_.h / 2, side = o.side || -1, h = o.h || 480, x = side < 0 ? x0 + (o.dx || 200) : x0 + W_.w - (o.dx || 200), bottom = y0 + W_.h, y = bottom + h * .52 + (1 - k) * h * .62;
    let look = o.look || 0; for (const [tn, d, a] of o.nods || []) look += nodAt(t, tn, d, a);
    return `<clipPath id="pk2_${who}"><rect x="${x0}" y="${y0}" width="${W_.w}" height="${W_.h}" rx="44"/></clipPath><g clip-path="url(#pk2_${who})">` + buddy(who, x, y, h, t, { aura: true, flip: side > 0, poses: ps, look, nohop: true, tag: false }) + `</g>` + OP(k, TF(x, bottom - 26, 1, nameTag(who, 30))); }
  // the big ring: pulses on every tick, the number pops when it changes (ON the whole-second tick)
  function bigRing(t, x, y, sc, r0, dur, inner) { const bell = r0 + dur, rs = ringState(t, r0, dur), secT = t >= r0 && t < bell ? r0 + Math.floor(t - r0) : -9, pop = secT > 0 ? pulse(t, secT, .01, .28) : 0, shut = pulse(t, bell, .01, .6), run = t >= r0 && t < bell;
    return TF(x, y, sc * (1 + (run ? .022 * rs.tick + .03 * pop : 0) + .05 * pulse(t, bell, .01, .4)), ringTimer(0, 0, t < r0 ? 1 : t < bell ? rs.frac : 0, t < r0 ? dur : t < bell ? rs.secs : 0, t, { tick: Math.max(rs.tick, pop), shut, inner }))
      + (shut > .05 ? `<circle cx="${x}" cy="${y}" r="${n2((RING_R + 40 + 90 * (1 - shut)) * sc)}" fill="none" stroke="${P.sun}" stroke-width="8" opacity="${n2(shut * .85)}"/>` : "")
      + (run && pop > .05 ? `<circle cx="${x}" cy="${y}" r="${n2((RING_R + 36 + 40 * (1 - pop)) * sc)}" fill="none" stroke="#fff" stroke-width="${n2(6 * pop)}" opacity="${n2(.6 * pop)}"/>` : ""); }
  function stampHold(t, t0, t1, x, y, txt, size = 124) { if (t < t0 || t > t1 + .25) return ""; const u = (t - t0) / .14, k = (u < 1 ? lerp(2.2, 1, eo(u)) : 1 + .06 * wob(t, t0 + .14, .4)), o = Math.min(1, u * 2) * (1 - ss(t1, t1 + .22, t));
    return OP(o, TF(x, y, k * 1.25, `<text x="0" y="40" font-family="Fredoka" font-weight="700" font-size="${size}" text-anchor="middle" letter-spacing="6" fill="${P.sun}" stroke="${P.ink}" stroke-width="22" stroke-linejoin="round" paint-order="stroke" filter="url(#drop)">${txt}</text><text x="0" y="40" font-family="Fredoka" font-weight="700" font-size="${size}" text-anchor="middle" letter-spacing="6" fill="url(#gSun)">${txt}</text>`, -6)); }
  const clue = (t, t0, x, y, txt, size = 60) => t < t0 ? "" : TF(x, y, spring(t, t0, .4), tpill(0, 0, txt, size, "#fff", P.ink, { w: 700 }));
  const pushCam = (inner, u, ax, ay, tx, ty, Z) => `<g transform="translate(${n2(lerp(ax, tx, u))} ${n2(lerp(ay, ty, u))}) scale(${n2(lerp(1, Z, u) * 1000) / 1000}) translate(${-ax} ${-ay})">${inner}</g>`;
  const popSpark = (t, t0, x, y, r = 90) => { const u = (t - t0) / .5; if (u <= 0 || u >= 1) return ""; let g = ""; for (let i = 0; i < 6; i++) { const a = (i * 60 + 20) * Math.PI / 180, d = r * (.55 + .65 * eo(u)); g += TF(x + Math.cos(a) * d, y + Math.sin(a) * d, (1 - u) * (i % 2 ? 1.2 : .8), `<path d="M0 -14 L4 -4 L14 0 L4 4 L0 14 L-4 4 L-14 0 L-4 -4z" fill="#fff"/>`); } return g; };
  // the world pushed in on A -> Tt at zoom Z, then closed into a thick black-ringed circle on the blue starry stage (kc 0..1)
  function circleShot(world, u, A, Tt, Z, r, kc, id) { const pushed = pushCam(world, u, A[0], A[1], Tt[0], Tt[1], Z); if (kc <= .001) return pushed; const cr = lerp(1500, r, eio(kc));
    return OP(Math.min(1, kc * 3), bg("stage")) + `<clipPath id="gc2_${id}"><circle cx="${Tt[0]}" cy="${Tt[1]}" r="${n2(cr)}"/></clipPath><g clip-path="url(#gc2_${id})">${pushed}</g><circle cx="${Tt[0]}" cy="${Tt[1]}" r="${n2(cr)}" fill="none" stroke="#14101F" stroke-width="${n2(22 * Math.min(1, kc * 2))}"/>`; }
  const animalLabel = (t, t0, x, y, size = 46) => t < t0 ? "" : TF(x, y, spring(t, t0, .5), `<g filter="url(#dropS)"><path d="M-16 ${n2(size * .7)} L0 ${n2(size * 1.25)} L16 ${n2(size * .7)}z" fill="${P.ink}"/></g>` + tpill(0, 0, "a little " + HIDDEN[0], size, P.ink, "#fff", { w: 700 })) + popSpark(t, t0, x, y, 150);
  // ONE big numbered picture card (the number badge on its corner, the picture big, the words under it); o.lit, o.pulse, o.tag [kind, k]
  function picCard(n, pic, words, o = {}) { const w = o.w || 330, h = o.h || 430, lit = o.lit || 0, pl = o.pulse || 0, size = o.size || 48, ls = wrap(words, size, w - 40, 700);
    return `<g transform="scale(${n2(1 + .05 * pl + .05 * Math.min(1, lit))})">${lit > .02 ? `<rect x="${-w / 2 - 16}" y="${-h / 2 - 16}" width="${w + 32}" height="${h + 32}" rx="50" fill="${P.sun}" opacity="${n2(.9 * Math.min(1, lit))}" filter="url(#b10)"/>` : ""}
      <g filter="url(#drop)"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="38" fill="url(#gPaper)" stroke="${pl > .3 || lit > .5 ? P.sun : "#E3C9A8"}" stroke-width="8"/></g>
      <rect x="${-w / 2 + 22}" y="${-h / 2 + 22}" width="${w - 44}" height="${h - 44 - ls.length * size * 1.1}" rx="24" fill="#FFF1DA"/><g transform="translate(0 ${n2(-h / 2 + 22 + (h - 44 - ls.length * size * 1.1) / 2)})">${pic}</g>
      ${ls.map((l, j) => T(0, n2(h / 2 - 30 - (ls.length - 1 - j) * size * 1.1), l, size, P.ink)).join("")}
      <g transform="translate(${-w / 2 + 4} ${-h / 2 + 4})" filter="url(#dropS)"><circle r="56" fill="#3B2A8C" stroke="#fff" stroke-width="7"/>${T(0, 27, n, 76, "#fff")}</g>
      ${o.tag !== undefined && o.tag[1] > .02 ? TF(0, h / 2 + 18, o.tag[1], jobTag(0, o.tag[0], 30)) : ""}${lit > .5 ? TF(w / 2 - 28, -h / 2 + 28, spring(lit, .5, .5), tickBadge(40)) : ""}</g>`; }
  return { L3, nodAt, poses, peek, bigRing, stampHold, clue, pushCam, popSpark, circleShot, animalLabel, picCard };
})();
