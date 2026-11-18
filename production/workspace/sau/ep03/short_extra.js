/* EP03 Shorts only (loaded last; does nothing in the 1920x1080 episode).
   The episode enlarges its narrated scenes by 10% and shifts them right, which pushes them off the side of a vertical frame.
   In a Short, put them back inside the 1200 x 900 box. */
if (SHORT) ["hook", "answer", "news", "recap", "textbook", "matters", "try", "think", "close"].forEach(n => { const g = S[n] && S[n].stage.firstChild; if (g) g.setAttribute("transform", ""); });
/* The textbook scene's heading sat right of centre to clear the episode's label; centre it in a Short. */
if (SHORT && S.textbook) { const s = S.textbook, run = s.run; s.run = t => { run(t); tf(s.head, `translate(600 100) scale(${Math.max(0, pop(t, cue("textbook", "primary", .1) - .2))})`); }; }
