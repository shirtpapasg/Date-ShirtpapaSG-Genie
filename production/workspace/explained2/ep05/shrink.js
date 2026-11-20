// shrink.js: the first-person journey (the series' signature): you are as small as an ant, standing on the middle stalk of one mimosa leaf.
// One gentle touch at the tip; the little leaves fold inwards, two by two, towards you; the whole leaf droops; we wait; the leaves open again.
// Every action is from the book's own sentences (fold inwards, droop, re-open after a few minutes). Nothing is said about HOW.
const hexL = (a, b, u) => { const pa = [1, 3, 5].map((i) => parseInt(a.substr(i, 2), 16)), pb = [1, 3, 5].map((i) => parseInt(b.substr(i, 2), 16)); return "#" + pa.map((v, i) => Math.round(lerp(v, pb[i], clamp(u))).toString(16).padStart(2, "0")).join(""); };
const SHN = 9, shFoldT = (i) => lerp(MK("fold") - .1, MK("droop") - .7, (SHN - 1 - i) / (SHN - 1));   // when pair i closes (0 = beside you, closes last)
if (PART === 1) SC.shrink = (t, s) => { const td = MK("dive"), VP = [960, 330], GR = 760, HW = 150, LB = 820, WZ = .66;
  const tR = MK("reopen") + .4, tR1 = LE("a707") + .2, tD = LT("a705") + .15, tW = MK("waiting"), tTch = MK("fold") - .3;
  const dr = ss(tD, tD + 2.0, t) * (1 - ss(tR + .5, tR1 + 1.0, t));
  const fold = (i) => { const tc = shFoldT(i), to = lerp(tR, tR1, i / (SHN - 1)); return ss(tc, tc + .5, t) * (1 - ss(to, to + 1.0, t)); };
  const pr = (X, Y, z) => [n2(VP[0] + X / z), n2(VP[1] + (GR - Y) / z)];
  let near = "", far = "", dark = 0;
  for (let i = SHN - 1; i >= 0; i--) { const z = 1.0 + i * .8, f = fold(i), th = f * 74 * Math.PI / 180, c = Math.cos(th), sn = Math.sin(th), haze = i / SHN * .5, top = hexL(hexL(i % 2 ? "#63CF72" : "#74DA7E", "#8CCB92", f * .8), "#D3F1D6", haze), ln = hexL("#2C8F4B", "#A9D8B0", haze); if (i < 4) dark += f / 4;
    let b = ""; for (const sg of [-1, 1]) { const pt = (d, dz) => pr(sg * (HW + d * c), d * sn, z + dz * (1 + .5 * f) + f * d * .0005).join(" ");
      b += `<path d="M${pt(0, -WZ / 2)} Q${pt(LB * .5, -WZ * .78)} ${pt(LB * .93, -WZ * .3)} Q${pt(LB * 1.06, 0)} ${pt(LB * .93, WZ * .3)} Q${pt(LB * .5, WZ * .78)} ${pt(0, WZ / 2)}z" fill="${top}" stroke="${ln}" stroke-width="${n2(Math.max(2, 9 / z))}" stroke-linejoin="round"/><path d="M${pt(0, 0)} L${pt(LB * .94, 0)}" stroke="${ln}" stroke-width="${n2(Math.max(1, 4 / z))}" opacity=".55"/>`; }
    if (i >= 7) far += b; else near += b; }
  const stalk = `<path d="M${pr(-HW, 0, .7).join(" ")} L${pr(-HW * .45, 0, 7.9).join(" ")} L${pr(HW * .45, 0, 7.9).join(" ")} L${pr(HW, 0, .7).join(" ")}z" fill="#B4D66E" stroke="#6E9A3E" stroke-width="5"/><path d="M${pr(-HW * .3, 0, .7).join(" ")} L${pr(-HW * .12, 0, 7.9).join(" ")} L${pr(HW * .12, 0, 7.9).join(" ")} L${pr(HW * .3, 0, .7).join(" ")}z" fill="#DCEFA0" opacity=".6"/>`;
  // the huge, soft fingertip: it comes slowly down far ahead, touches the tip of the leaf once, and lifts away
  const fy = t < tTch ? lerp(-420, 0, eio((t - (tTch - 2.0)) / 2.0)) : lerp(0, -520, eio((t - tTch - .55) / 1.6)), press = pulse(t, tTch, .05, .5);
  const finger = `<g transform="translate(${VP[0]} ${n2(430 + fy)})" filter="url(#b2)"><path d="M-170 -700 V-150 Q-170 ${n2(8 - 10 * press)} 0 ${n2(8 - 10 * press)} Q170 ${n2(8 - 10 * press)} 170 -150 V-700z" fill="#FFF6EC" stroke="#D9C8B4" stroke-width="6"/><path d="M-100 -640 V-190 Q-100 -70 -30 -52" fill="none" stroke="#fff" stroke-width="34" stroke-linecap="round" opacity=".8"/><ellipse cx="0" cy="${n2(14)}" rx="${n2(150 + 40 * press)}" ry="14" fill="${P.ink}" opacity="${n2(.12 + .2 * press)}"/></g>` + OP(press, `<circle cx="${VP[0]}" cy="436" r="${n2(190 + 120 * (1 - press))}" fill="none" stroke="#fff" stroke-width="6" opacity=".8"/>`);
  const e = eio((t - td) / 2.3), kz = lerp(.3, 1, e), bobY = 5 * Math.sin(t * 1.1), blobs = `<g filter="url(#b60)" transform="translate(0 ${n2(-80 * dr - 60 * (1 - e))})"><ellipse cx="300" cy="900" rx="620" ry="330" fill="#7CCB7A"/><ellipse cx="1650" cy="960" rx="620" ry="340" fill="#5DB572"/><ellipse cx="960" cy="1100" rx="900" ry="300" fill="#8FDB7A"/><circle cx="420" cy="560" r="120" fill="#FFD3EA" opacity=".7"/><circle cx="1540" cy="610" r="90" fill="#FFF3B8" opacity=".8"/></g>`;
  const bokeh = [0, 1, 2, 3, 4, 5, 6].map((i) => `<circle cx="${n2(160 + hash(i, 3) * 1600)}" cy="${n2(90 + hash(i, 5) * 330 + 12 * Math.sin(t * .4 + i))}" r="${n2(26 + hash(i, 7) * 50)}" fill="#fff" opacity="${n2(.1 + .12 * hash(i, 9))}"/>`).join("");
  const leafG = `<g transform="translate(0 ${n2(bobY + 70 * dr + 300 * (1 - e))}) rotate(${n2(3.2 * dr)} 960 1080) translate(${VP[0]} ${VP[1]}) scale(${n2(kz)}) translate(${-VP[0]} ${-VP[1]})">${stalk}${far}${t > tTch - 2.1 && t < tTch + 2.3 ? finger : ""}${near}</g>`;
  // time passing: soft shadows slide across while we wait
  const wu = clamp((t - tW) / (tR - tW)), shadow = t > tW - .5 && t < tR + 1 ? OP(ss(tW - .5, tW + .3, t) * (1 - ss(tR, tR + 1, t)), `<g transform="translate(${n2(-900 + 2900 * wu)} 0) skewX(-24)"><rect x="0" y="-100" width="420" height="1300" fill="#0B2E18" opacity=".3" filter="url(#b30)"/><rect x="620" y="-100" width="240" height="1300" fill="#0B2E18" opacity=".22" filter="url(#b30)"/></g>`) : "";
  const warm = pulse(t, tR + .9, .7, 2.2);
  return `<rect width="1920" height="1080" fill="url(#mSky)"/>${bokeh}${blobs}${leafG}<rect width="1920" height="1080" fill="#0C3A20" opacity="${n2(.5 * dark)}"/>${shadow}<rect width="1920" height="1080" fill="#FFF3B8" opacity="${n2(.3 * warm)}"/>`
    + OP(ramp(t, td + 1.2, .4), tpill(250, 76, "You: as small as an ant", 34, P.ink, "#fff", { w: 600 }))
    + (t > tW - .3 ? OP(ramp(t, tW - .3, .3), TF(1760, 210, .62, stopwatch((t - tW) * .22))) + speeded(t, tW - .1, s.t1 + 1, 1730, 258) : "")
    + wipe(t, s.t0, "#EAF8E4") + wipe(t, s.t1, "#EAF8E4"); };
