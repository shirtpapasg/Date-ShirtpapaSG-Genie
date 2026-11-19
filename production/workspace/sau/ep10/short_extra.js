/* EP10 Shorts only (loaded last; does nothing in the 1920x1080 episode). */
if (SHORT) {
  if ((CFG.headLines || []).length > 2) $("head").setAttribute("transform", "translate(0 52)");      // a three-line question: keep it clear of the series label
  // a Short says some lines differently: map the cue words the scenes look for onto the Short's own words
  { const cue0 = cue, MAP = {"helpers|don't#2": "don't"}, NEVER = {habit: ["benefits", "less", "richer", "healthier", "less#2"]};
    cue = (name, word, frac) => { const k = name + "|" + word; if (MAP[k] && has(name, MAP[k])) return cue0(name, MAP[k], frac);
      if (NEVER[name] && NEVER[name].includes(word) && !has(name, "benefits")) return 1e6; return cue0(name, word, frac); }; }
  // wide(name, k, cx, cy): undo the episode's wide-screen wrap; show the scene at scale k with scene point (cx, cy) in the middle of the box
  const wide = (name, k = 1, cx = 600, cy = 450) => { const s = S[name]; if (!s) return; const g = s.stage.querySelector("g[transform^='translate(650 432)']"); if (!g) return s;
    g.setAttribute("transform", `translate(600 450) scale(${k}) translate(${-cx} ${-cy})`); s.fitG = g; return s; };
  wide("recap"); wide("helpers"); wide("semakau"); wide("habit");
}
