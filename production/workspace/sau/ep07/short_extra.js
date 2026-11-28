/* EP07 Shorts only (loaded last; does nothing in the 1920x1080 episode).
   EP07's scenes are centred on VP, so most already sit well in the vertical frame; these are the places that did not. */
if (SHORT) {
  // The first-person shots: the episode runs them 1.6 times slower than first drawn. A Short has under a minute, so Short 1's four
  // shots run 1.35 times slower instead (their segments in short1_segments.json are the shot's own length x 1.35). Short 2's heart shot keeps 1.6.
  Object.assign(O7SLOW, {airOut: 1.35, povAirSac: 1.35, povRBC: 1.35, povMuscle: 1.35});
  // the air sac: "blood capillary" sat off the right edge; bring it and its pointer inside
  if (S.povAirSac) { const s = S.povAirSac, run = s.run; set(s.ptr, "d", "M530 690 L598 655 M905 712 L850 668");
    s.run = t => { run(t); o7At(s.L[2], 930, 762, o7U("povAirSac", t), 1.2, 2.6); }; }
  // the recap: ten small cards in two wide rows become 4 + 4 + 2 bigger cards (the bottom row is the carbon dioxide's trip back)
  if (S.recap) { const s = S.recap, run = s.run, K = 1.25;
    s.cards.forEach((g, i) => { const w = el("g", {transform: `scale(${K})`}); while (g.firstChild) w.appendChild(g.firstChild); g.appendChild(w);
      g.x = i < 8 ? 165 + (i % 4) * 290 : 455 + (i - 8) * 290; g.y = 125 + Math.floor(i / 4) * 385; });
    s.arrows.forEach((a, i) => { if (i === 3 || i === 7) set(a, "display", "none"); else tf(a, `translate(${s.cards[i].x + 145} ${s.cards[i].y})`); });   // the cards are numbered, so the row ends need no arrow
    s.run = t => { run(t); popAt(s.top, 600, -125, t, SC.recap.t0 - .2); }; }
  // the hook: the two bubbles are bigger and sit above the pupil's head; "Why?", the muscle's speech bubble and the oxygen come inside the frame
  if (S.hook) { const s = S.hook; [[s.bL, 310], [s.bH, 870]].forEach(([b, x]) => { const w = el("g", {transform: "scale(1.3)"}); while (b.firstChild) w.appendChild(b.firstChild); b.appendChild(w); b.x = x; b.y = 30; });
    const wq = el("g", {transform: "translate(35 135)"}, s.stage), w = el("g", {transform: "translate(-60 20)"}, s.stage); wq.appendChild(s.q); w.appendChild(s.say);
    [[1090, 400], [1100, 830], [690, 850]].forEach(([x, y], i) => { s.o2[i].x = x; s.o2[i].y = y; }); }
  // the amazing fact: the counter is bigger and sits on top, clear of the heart and the loop
  if (S.news) { const s = S.news, run = s.run;
    s.run = t => { run(t); popAt(s.top, 600, -140, t, SC.news.t0 - .2); popAt(s.cnt, 640, 80, t, cue("news", "beats", .25) - .2, 1.3); }; }
  // try this: a bigger table on top, the stopwatch beside the pupil's head, and "What changed? Why?" inside the frame
  if (S.try) { const s = S.try, run = s.run, w = el("g", {transform: "translate(-45 40)"}, s.stage); w.appendChild(s.q);
    const wt = el("g", {transform: "translate(-130 -310) scale(1.25)"}); while (s.tab.firstChild) wt.appendChild(s.tab.firstChild); s.tab.appendChild(wt);
    const ws = el("g", {transform: "translate(-60 -140)"}, s.stage); ws.appendChild(s.sw); s.stage.appendChild(w);
    s.run = t => { run(t); popAt(s.top, 600, -140, t, SC.try.t0 - .2); }; }
}
