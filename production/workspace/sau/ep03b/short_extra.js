/* EP03 Part 2 Shorts only (loaded last; does nothing in the 1920x1080 episode).
   Three picture-only scenes were drawn across the whole wide screen (x -150..1770). A vertical frame shows only x 0..1200,
   so in a Short the wide diagrams are shrunk to fit, and their labels are made bigger to stay readable. */
if (SHORT) {
  $("head").setAttribute("transform", "translate(0 52)");      // these Shorts' questions take three lines: keep them clear of the series label
  const fit = (parent, keep, k, cx, cy, ty = 450) => { const g = el("g", {transform: `translate(600 ${ty}) scale(${k}) translate(${-cx} ${-cy})`});
    Array.from(parent.childNodes).filter(n => !keep.includes(n)).forEach(n => g.appendChild(n)); parent.insertBefore(g, parent.firstChild); keep.filter(n => n.parentNode === parent && n.tagName === "rect").forEach(n => parent.insertBefore(n, g)); return g; };
  const big = (e, fs) => { e.setAttribute("font-size", fs); e.setAttribute("stroke-width", fs * .22); };
  // the plant cut open: furnace, turbine, generator and the flats all in view
  { const s = S.povFurnace, B = s.B, sky = B.childNodes[0], floor = B.childNodes[1]; floor.setAttribute("height", 4000);
    fit(B, [sky], .68, 880, 480, 560); s.labA.forEach(e => big(e, 62)); s.labB.forEach(e => big(e, 56)); }
  // the ash chart sits over the middle of the belt
  { const s = S.povAsh, run = s.run; s.run = t => { run(t); tf(s.g10, `translate(600 136) scale(${Math.max(0, pop(t, SC.povAsh.t0 + .35))}) translate(-810 -136)`); }; }
  // Semakau cut open: the sea, both rock walls and the whole cell in view
  { const s = S.semakau, st = s.stage, sky = st.childNodes[0], bed = st.childNodes[3], K = .72, CX = 893, run = s.run; bed.setAttribute("height", 4000);
    fit(st, [sky, s.card, s.full], K, CX, 480, 520); s.labs.forEach(e => big(e, 46)); s.labs[0].setAttribute("x", 152);
    s.run = t => { run(t); const c = SC.semakau, tt = t - c.t0;
      tf(s.full, `translate(${600 + (1090 - CX) * K} ${520 + (330 - 480) * K}) rotate(-4) scale(${Math.max(0, pop(t, c.t0 + (c.t1 - c.t0) * .88, .4)) * (1 + .05 * Math.sin(tt * 8))})`); }; }
}
