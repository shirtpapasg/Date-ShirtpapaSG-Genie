const fs = require('fs'), vm = require('vm'), path = require('path');
const dir = process.argv[2]; const out = {};
for (const f of fs.readdirSync(dir).sort()) {
  const h = fs.readFileSync(path.join(dir, f), 'utf8');
  const i = h.indexOf('/* ---------- this lab:'), j = h.indexOf('/* ---------- the P3 lab engine');
  if (i < 0 || j < 0) { out[f] = 'NO BLOCK'; continue; }
  const code = h.slice(i, j) + '\n;globalThis.__LAB = LAB;';
  const ctx = { console }; vm.createContext(ctx);
  try { vm.runInContext(code, ctx); } catch (e) { out[f] = 'ERR ' + e.message; continue; }
  const L = ctx.__LAB;
  out[f] = { code: L.code, name: L.name, sub: L.sub, level: L.level, glyph: L.glyph,
    introCap: L.intro && L.intro.cap, introPara: L.intro && L.intro.para, button: L.intro && L.intro.button,
    cards: L.intro && L.intro.cards, parts: L.parts.map(p => ({ id: p.id, label: p.label, title: p.title, kind: p.kind, task: p.task, predQ: p.pred && p.pred.q, predIntro: p.pred && p.pred.intro, note: p.note, nextLabel: p.nextLabel })),
    bigIdea: L.bigIdea, quizTopics: (L.quiz||[]).map(q=>q.topic) };
}
fs.writeFileSync(process.argv[3], JSON.stringify(out, null, 1));
for (const [k, v] of Object.entries(out)) { if (typeof v === 'string') { console.log(k, v); continue; } console.log(`${k}: ${v.code} | ${v.name} | ${v.sub} | btn:${v.button}`); v.parts.forEach(p => console.log(`   [${p.id}] ${p.label} | ${p.title} | ${p.kind} | task: ${p.task}`)); }
