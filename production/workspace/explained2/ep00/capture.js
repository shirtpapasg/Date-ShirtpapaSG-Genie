// capture.js: TheOneApp's REAL Mind Maps screens for Part 2 (app1, app2, app3, lccheck, space, dare), from the app served READ-ONLY
// (as ../../promo/film4/README.md): (cd /home/user/theoneapp && python3 -m http.server 8765 --bind 127.0.0.1 &)
//   NODE_PATH=$(npm root -g) node capture.js            -> app/<name>.jpg + app/shots.json (each shot's size and the boxes of the buttons tapped)
// Nothing in /home/user/theoneapp is edited: the pupil's state (tour seen, first trip done, sound off) is set in this browser's storage, and
// Basil's map is typed into the real editor (mymap.js) key by key, exactly as a pupil would.
// THE MARKER (api/_mindmap.js, "Mark my mind map") needs the live server and a language model, so it cannot run here. Its reply is the
// ONLY thing stubbed: page.route answers POST /api/lab with the reply format api/_mindmap.js returns ({items: [{id, v, hint, fix}],
// missing: [{name, hint}]}): every idea "ok" and one poster branch missing (first mark), then every idea "ok" and nothing missing (second
// mark). Everything on screen after that (the ✓ badges popping in one by one, the marks box "Every idea I could check is right! Now make
// your map complete.", the gold row "＋ Something from the poster is missing", the second mark's "Every idea is right and your map is
// complete. Well done!") is drawn by the app's OWN code and CSS (mymap.js renderMarks / draw, mindmap.html .mm-badge.pop). The missing
// row's hint question is generated live by the model; MISS_HINT below is our stand-in, written to api/_mindmap.js's rules (one short
// question, at most 18 words, not naming the branch or its key words). See STATE.md.
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const OUT = path.join(__dirname, 'app'); fs.mkdirSync(OUT, { recursive: true });
const URL = 'http://127.0.0.1:8765/', VW = 1180, VH = 820, DSF = 2.6, FULLW = 1400, MARK_STEP = 260;   // full screens saved 1400 px wide; the close-ups (o.hi) at 2.6x
const MISS_HINT = 'Can an ordinary iron nail be changed so that it attracts steel paper clips too?';
// Basil's map (script section 3 "Realism" and section 11 note 1), in the order he says it (b503b, b504b), then the branch he adds after the check
const MAP1 = [['Two poles', ['North pole', 'South pole']], ['Poles together', ['Unlike poles attract', 'Like poles repel']],
  ['Magnetic materials', ['Iron and steel', 'Not copper or aluminium']], ['A magnet can', ['Pull', 'Push']]];
const ADD = ['Making a magnet', ['Stroke method', 'Same pole, same direction']];
const meta = {}, DEFER = []; let markCall = 0;
// crop every deferred frame with the SAME rectangle as the finished board (so the map never jumps in size between the frames and the end)
function cropDeferred(ref) { const h = meta[ref].hi; for (const n of DEFER.splice(0)) { const png = path.join(OUT, '_' + n + '.png'), c = [h.at[0] * VW, h.at[1] * VH, h.at[2] * VW, h.at[3] * VH].map((v) => Math.round(v * DSF));
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', png, '-vf', `crop=${c[2]}:${c[3]}:${c[0]}:${c[1]}`, '-q:v', '3', path.join(OUT, n + '_hi.jpg')]); meta[n].hi = h; fs.unlinkSync(png); } }
async function shot(p, name, boxes = {}, hi) { const png = path.join(OUT, '_' + name + '.png'); await p.screenshot({ path: png });
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', png, '-vf', `scale=${FULLW}:-2`, '-q:v', '3', path.join(OUT, name + '.jpg')]);
  const bx = {}; for (const [k, sel] of Object.entries(boxes)) { try { const b = await p.locator(sel).first().boundingBox({ timeout: 1500 }); if (b) bx[k] = [b.x / VW, b.y / VH, b.width / VW, b.height / VH].map((v) => Math.round(v * 10000) / 10000); } catch (e) {} }
  meta[name] = { w: FULLW, h: Math.round(FULLW * VH / VW), boxes: bx };
  if (hi === 'DEFER') { DEFER.push(name); console.log('shot', name, '(deferred crop)'); return; }
  if (hi) { const r = hi === 'VIEW' ? { x: 0, y: 0, width: VW, height: VH } : await p.locator(hi).first().boundingBox({ timeout: 3000 }); if (r) { r.width = Math.min(r.width, VW - r.x); r.height = Math.min(r.height, VH - r.y); const c = [r.x, r.y, r.width, r.height].map((v) => Math.round(v * DSF));
    execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', png, '-vf', `crop=${c[2]}:${c[3]}:${c[0]}:${c[1]}`, '-q:v', '3', path.join(OUT, name + '_hi.jpg')]);
    meta[name].hi = { w: c[2], h: c[3], at: [r.x / VW, r.y / VH, r.width / VW, r.height / VH].map((v) => Math.round(v * 10000) / 10000) }; } }
  fs.unlinkSync(png); console.log('shot', name, Object.keys(bx).join(' '), hi ? 'hi' : ''); }
(async () => { const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: VW, height: VH }, deviceScaleFactor: DSF });
  await ctx.addInitScript(() => { try { if (!sessionStorage.getItem('_set')) { localStorage.setItem('sm-sfx-v1', JSON.stringify('off')); localStorage.setItem('sm-mmtour-v1', String(Date.now()));
    localStorage.setItem('sm-firsttrip-v1', JSON.stringify({ done: true })); localStorage.setItem('sm-welcome-v1', String(Date.now())); localStorage.setItem('sm-seen-v1', '1'); localStorage.setItem('sm-whatsnew-v1', '2026-11-24'); sessionStorage.setItem('_set', '1'); } } catch (e) {} });
  await ctx.route('**/api/lab', async (route) => { const req = route.request(); let body = {}; try { body = JSON.parse(req.postData() || '{}'); } catch (e) {}
    if (body.action !== 'mindmap') return route.fulfill({ status: 503, body: '{}' }); markCall++;
    const items = (body.items || []).map((i) => ({ id: i.id, v: 'ok', hint: '', fix: '' }));
    const missing = markCall === 1 ? [{ name: '', hint: MISS_HINT }] : [];
    console.log('  marker stub, call', markCall, ':', items.length, 'items ok,', missing.length, 'missing');
    return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ items, missing }) }); });
  const p = await ctx.newPage(); p.on('pageerror', (e) => console.log('  PAGEERR', e.message.slice(0, 160)));
  const stay = async () => { try { const x = p.locator('#pl-arrive .pl-ar-x'); if (await x.count()) { await x.first().click({ timeout: 1500 }); await p.waitForTimeout(600); } } catch (e) {} };   // the journey's "Stamped" pop-up: a pupil taps Stay
  const hideToasts = () => p.addStyleTag({ content: '.cr-toast,#cr-toast,.toast,[class*="cr-toast"],#pl-arrive,body>div[role="status"][style*="z-index:9000"]{display:none!important}' }).catch(() => {});   // passing pop-ups (the credit toast, the journey's "Stamped" note): hidden, as a pupil's tap on "Stay" would
  // 1 · the home screen: the Mind Maps landmark (the Supertree's label) is what a pupil taps
  await p.goto(URL + 'index.html', { waitUntil: 'load' }); await p.waitForTimeout(2500);
  try { await p.getByText('TAP TO BEGIN').first().click({ timeout: 3000 }); } catch (e) {}
  await p.waitForTimeout(3500); await hideToasts();
  await p.evaluate(() => { document.querySelectorAll('.bubble,.tip,#pip-say').forEach((e) => { if (/Every question|first trip/i.test(e.textContent || '')) e.style.display = 'none'; }); });
  await shot(p, 'home', { mm: 'text=Mind Maps' });
  // 2 · the Mind Maps page (mindmap.html): header, the big "Make my own mind map" button, the chapter rail
  await p.goto(URL + 'mindmap.html', { waitUntil: 'load' }); await p.waitForTimeout(3500); await hideToasts();
  await shot(p, 'mmpage', { make: '#mm-make', magnets: 'text=Magnets' });
  // 3 · the sheet "My mind maps": the chapter drop-down, then Magnets (P3) chosen
  await p.click('#mm-make', { timeout: 8000 }); await p.waitForTimeout(1000);
  await shot(p, 'sheet0', { ch: '#mm-ch', start: '#mm-new' });
  await p.selectOption('#mm-ch', 'magnets'); await p.waitForTimeout(400);
  await shot(p, 'sheet1', { ch: '#mm-ch', start: '#mm-new' });
  // 4 · Start a new mind map: the editor, empty (the name "My Magnets mind map", the Middle word "Magnets", the note, "＋ Add a branch")
  await p.click('#mm-new'); await p.waitForTimeout(1200);
  await shot(p, 'ed00', { name: '#mm-name', centre: '#mm-centre', add: '#mm-add', saved: '#mm-saved', empty: '#mm-empty' }, '.mm-canvas');
  // 5 · Basil types his map from memory, one box at a time (the map on the left draws itself)
  let k = 1; const typeIn = async (sel, txt) => { const el = p.locator(sel).last(); await el.click(); await el.fill(''); await el.type(txt, { delay: 15 }); await p.waitForTimeout(450); };
  const addBranch = async (txt) => { await p.click('#mm-add'); await p.waitForTimeout(350); await typeIn('#mm-branches input.mm-in:not(.mm-in-sub)', txt); };
  const addSub = async (i, txt) => { await p.locator(`#mm-branches .mm-br[data-b="${i}"] [data-act="addsub"]`).click(); await p.waitForTimeout(300); await typeIn(`#mm-branches .mm-br[data-b="${i}"] input.mm-in-sub`, txt); };
  const tag = () => String(k++).padStart(2, '0');
  const typeMap = async (list, i0) => { for (let i = 0; i < list.length; i++) { const [br, subs] = list[i]; await addBranch(br); await shot(p, 'ed' + tag(), { add: '#mm-add', mark: '#mm-mark' }, '.mm-canvas'); for (const s of subs) { await addSub(i0 + i, s); await shot(p, 'ed' + tag(), { add: '#mm-add', mark: '#mm-mark' }, '.mm-canvas'); } } };
  await typeMap(MAP1, 0);
  await p.evaluate(() => document.activeElement && document.activeElement.blur()); await p.waitForTimeout(800);
  await shot(p, 'ed_done', { mark: '#mm-mark', compare: '#mm-compare', saved: '#mm-saved', canvas: '.mm-canvas' }, '.mm-canvas');
  // 6 · ✅ Mark my mind map (the stubbed marker): the ✓ badges pop in one by one (the app's own CSS animation, frame by frame)
  const markFrames = async (pre, n) => { await p.click('#mm-mark'); await p.waitForTimeout(60);
    await shot(p, pre + 'busy', { mark: '#mm-mark' });   // "⏳ Marking…"
    await p.waitForFunction(() => document.querySelectorAll('#mm-svg .mm-badge.pop').length > 0, null, { timeout: 8000 });
    await p.evaluate(() => document.getAnimations().forEach((a) => { if (a.animationName === 'mm-pop') a.pause(); }));
    const T = n * MARK_STEP + 200; let j = 0; const hold = await p.addStyleTag({ content: '#mm-marks{display:none!important}' });   // the app shows the marks box only after the last badge lands
    for (let ms = 0; ms <= T; ms += MARK_STEP / 2) { await p.evaluate((x) => document.getAnimations().forEach((a) => { if (a.animationName === 'mm-pop') a.currentTime = x; }), ms); await p.waitForTimeout(40); await shot(p, pre + 'f' + String(j++).padStart(2, '0'), {}, 'DEFER'); }
    await p.evaluate(() => document.getAnimations().forEach((a) => { if (a.animationName === 'mm-pop') a.finish(); })); await hold.evaluate((el) => el.remove());
    await p.waitForFunction(() => !document.getElementById('mm-marks').hidden, null, { timeout: 12000 }); await p.waitForTimeout(500);
    meta[pre + 'frames'] = { n: j, step_ms: MARK_STEP / 2 }; };
  await markFrames('mk1_', 12);
  await shot(p, 'mk1_done', { marks: '#mm-marks', miss: '#mm-marks li.grow', compare: '#mm-compare', mark: '#mm-mark', canvas: '.mm-canvas' }, '.mm-board'); cropDeferred('mk1_done');
  // 7 · 🖼 Compare with the poster: the Magnets poster, its branch "Making a magnet"; the floating "✏️ Back to my mind map"
  await p.click('#mm-compare'); await p.waitForTimeout(600); await shot(p, 'poster0', { back: '#mm-return' });
  await p.waitForTimeout(2600); await shot(p, 'poster1', { back: '#mm-return', making: 'svg >> text=Making a magnet' });
  await p.waitForTimeout(2500); await shot(p, 'poster2', { back: '#mm-return', making: 'text=MAKING A MAGNET', stroke: 'text=STROKE METHOD' }, 'VIEW');
  // 8 · ✏️ Back to my mind map; Basil adds Making a magnet in his own words; marks it again
  await p.click('#mm-return'); await p.waitForTimeout(1200); await shot(p, 'back0', { add: '#mm-add', mark: '#mm-mark' });
  k = 20; await typeMap([ADD], 4);
  await p.evaluate(() => document.activeElement && document.activeElement.blur()); await p.waitForTimeout(800);
  await markFrames('mk2_', 14);
  await shot(p, 'mk2_done', { marks: '#mm-marks', mark: '#mm-mark' }, '.mm-board'); cropDeferred('mk2_done');
  // 9 · the list of maps (← My mind maps) after Tuesday's and Thursday's maps: "My Magnets mind map", "... 2", "... 3" (each a NEW map from memory)
  await p.click('#mm-back'); await p.waitForTimeout(900); await shot(p, 'list1', { start: '#mm-new' });
  for (const n of [2, 3]) { await p.selectOption('#mm-ch', 'magnets'); await p.click('#mm-new'); await p.waitForTimeout(900); await typeMap(MAP1.slice(0, 1), 0); await p.click('#mm-back'); await p.waitForTimeout(900); }
  await shot(p, 'list3', { start: '#mm-new', list: '#mm-list' });
  fs.writeFileSync(path.join(OUT, 'shots.json'), JSON.stringify(meta, null, 1)); console.log(Object.keys(meta).length, 'shots'); await b.close(); })();
