// Capture the real "My mind map" steps of TheOneApp at phone (390x844 @2x) and desktop (1280x800 @1x).
// Usage: NODE_PATH=$(npm root -g) node capture.js [phone|desk]
const { chromium } = require('playwright');
const fs = require('fs');
const BASE = 'http://127.0.0.1:8781/';
const D = __dirname;
const SHOTS = D + '/shots/';
fs.mkdirSync(SHOTS, { recursive: true });

const MAP = {
  centre: 'HEAT',
  b: [
    { t: 'Temperature', subs: ['How hot or cold', 'Measured with a thermometer'] },
    { t: 'Heat flow', subs: ['From hotter to colder', 'Until both are the same'] },
    { t: 'Conductors', subs: ['Good: metals', 'Poor: plastic, wood, air'], colour: 'blue' },
  ],
};

const only = process.argv[2];
const log = {};

(async () => {
  const br = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  for (const [tag, vp, dpr] of [['phone', { width: 390, height: 844 }, 2], ['desk', { width: 1280, height: 800 }, 1]]) {
    if (only && only !== tag) continue;
    const ctx = await br.newContext({ viewport: vp, deviceScaleFactor: dpr, isMobile: tag === 'phone', hasTouch: tag === 'phone', acceptDownloads: true });
    // the first-run tour was already seen (as after "Skip the tour"); light theme like the series
    await ctx.addInitScript(() => { try { if (!sessionStorage.getItem('cap-init')) { sessionStorage.setItem('cap-init', '1'); localStorage.setItem('sm-seen-v1', '1'); localStorage.setItem('sm-theme-v1', 'light'); } } catch (e) {} });
    const p = await ctx.newPage();
    p.on('pageerror', e => console.log(tag, 'pageerror', String(e).slice(0, 200)));
    const steps = log[tag] = [];
    const box = async sel => {
      if (!sel) return null;
      const l = typeof sel === 'string' ? p.locator(sel).first() : sel;
      const r = await l.boundingBox();
      return r ? [r.x, r.y, r.width, r.height].map(v => Math.round(v * dpr)) : null;
    };
    const shot = async (nn, step, note, tapSel) => {
      await p.mouse.move(2, Math.round(vp.height / 2));   // no hover state left on a button
      await p.waitForTimeout(250);
      const file = nn + '_' + step + '_' + tag + '.png';
      const tap = await box(tapSel);
      await p.screenshot({ path: SHOTS + file });
      steps.push({ file, note, tap });
      console.log(tag, file, tap ? 'tap ' + JSON.stringify(tap) : '');
    };
    const inView = async sel => {
      await p.evaluate(s => { const e = typeof s === 'string' ? document.querySelector(s) : null; if (e) e.scrollIntoView({ block: 'center' }); }, sel);
      await p.waitForTimeout(300);
    };
    const settle = async () => { await p.waitForTimeout(700); await p.waitForFunction(() => { const s = document.getElementById('mm-saved'); return !s || /Saved ✓|saved ✓/.test(s.textContent); }, null, { timeout: 5000 }).catch(() => {}); };
    const mapTop = async () => { await p.evaluate(() => { document.querySelector('.mm-dialog').scrollTop = 0; }); await p.waitForTimeout(300); };
    const typeIn = async (loc, text) => { await loc.click(); await p.keyboard.press('Control+A'); await p.keyboard.type(text, { delay: 15 }); };

    // 01 home
    await p.goto(BASE);
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(3200);
    const entry = tag === 'phone' ? '#qs-mindmap' : 'button.mmf';
    await shot('01', 'home', tag === 'phone' ? 'Home (Questions tab). Tap the "✏️ Mind maps" pill under "Your questions".' : 'Home (Questions tab). Tap the smiling sun labelled "Mind maps" (top right of the scenery).', entry);

    // 02 Mind Lab
    await p.locator(entry).click();
    await p.waitForURL(/mindmap\.html/);
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(2500);
    await shot('02', 'mindlab', 'Science Claw Mind Lab opens. Tap "✏️ Make my own mind map".', '#mm-make');

    // 03 My mind maps (empty)
    await p.locator('#mm-make').click();
    await p.waitForTimeout(700);
    await shot('03', 'mymaps_empty', '"My mind maps" sheet: Chapter picker, "＋ Start a new mind map", tip, and "No mind maps yet..." (nothing saved yet). Tap the Chapter box.', '#mm-ch');

    // 04 chapter Heat
    const chapters = await p.evaluate(() => [...document.querySelectorAll('#mm-ch optgroup')].map(g => ({ theme: g.label, chapters: [...g.children].map(o => o.textContent) })));
    log.chapters = chapters;
    await p.selectOption('#mm-ch', 'heat');
    await p.waitForTimeout(300);
    await shot('04', 'chapter_heat', 'Chapter set to "Heat (P4)". Tap "＋ Start a new mind map".', '#mm-new');

    // 05 new map
    await p.locator('#mm-new').click();
    await p.waitForTimeout(800);
    log.defaultName = await p.inputValue('#mm-name');
    await shot('05', 'new_map', 'A new map opens: name "' + log.defaultName + '", "HEAT · P4", "Saved ✓" pill, the chapter name already in the middle. The Middle word box is ready to type in.', '#mm-centre');

    // 06 middle word
    await typeIn(p.locator('#mm-centre'), MAP.centre);
    await settle();
    await inView('#mm-add');
    await shot('06', 'middle_word', 'Middle word typed: ' + MAP.centre + '. It appears in the middle of the map. Tap "＋ Add a branch".', '#mm-add');

    // branches
    let n = 7;
    const pad = k => String(k).padStart(2, '0');
    for (let i = 0; i < MAP.b.length; i++) {
      const B = MAP.b[i];
      await p.locator('#mm-add').click();
      await p.waitForTimeout(500);
      const inp = p.locator('#mm-branches input[data-b="' + i + '"]:not([data-s])');
      if (i === 0) {
        await inView('#mm-branches .mm-br[data-b="0"]');
        await shot(pad(n++), 'add_branch', 'Branch 1 box appears (colour Red picked for you) and a dashed box appears on the map. Type the branch word.', inp);
      }
      await inp.fill('');
      await inp.click();
      await p.keyboard.type(B.t, { delay: 15 });
      if (i === 0) {
        // catch the "Saving…" pill right after a key press
        await p.evaluate(() => { window.__st = window.setTimeout; window.setTimeout = (f, ms, ...a) => window.__st(f, ms === 350 ? 2500 : ms, ...a); });
        await p.keyboard.press('Backspace'); await p.keyboard.type(B.t.slice(-1));
        await p.evaluate(() => { window.setTimeout = window.__st; });
        const pill = await p.textContent('#mm-saved'); if (pill !== 'Saving…') console.log('WARN saving pill', pill);
        await shot(pad(n++), 'saving', '"Saving…" shows for a moment while you type.', '#mm-saved');
        await settle();
        await inView('#mm-branches .mm-br[data-b="0"]');
        await shot(pad(n++), 'branch_typed', 'Branch 1 typed: "' + B.t + '". "Saved ✓" is back. Tap "＋ Add a sub-branch".', '#mm-branches .mm-br[data-b="0"] .mm-addsub');
        await mapTop();
        await shot(pad(n++), 'branch_map', 'Scrolled up: the map now has HEAT in the middle and a red line to the "' + B.t + '" box.', '#mm-svg');
      }
      if (B.colour) {
        await settle();
        await inView('#mm-branches .mm-br[data-b="' + i + '"]');
        await shot(pad(n++), 'colour_pick', 'Branch ' + (i + 1) + ' "' + B.t + '" got the next colour by itself. Tap a colour dot to change it (here: Blue).', '#mm-branches .mm-br[data-b="' + i + '"] [data-c="' + B.colour + '"]');
        await p.locator('#mm-branches .mm-br[data-b="' + i + '"] [data-c="' + B.colour + '"]').click();
        await settle();
        await inView('#mm-branches .mm-br[data-b="' + i + '"]');
        await shot(pad(n++), 'colour_blue', 'Blue is ticked; the branch box turns blue.', null);
        await mapTop();
        await shot(pad(n++), 'colour_map', 'On the map, the Conductors box and its line are blue too.', '#mm-svg');
      }
      for (let j = 0; j < B.subs.length; j++) {
        await p.locator('#mm-branches .mm-br[data-b="' + i + '"] .mm-addsub').click();
        await p.waitForTimeout(400);
        const sub = p.locator('#mm-branches input[data-b="' + i + '"][data-s="' + j + '"]');
        if (i === 0 && j === 0) {
          await inView('#mm-branches .mm-br[data-b="0"]');
          await shot(pad(n++), 'add_subbranch', 'A Sub-branch 1 box appears under Branch 1, and a small dashed box on the map. Type a detail.', sub);
        }
        await sub.click();
        await p.keyboard.type(B.subs[j], { delay: 10 });
        await settle();
      }
      if (i === 0) {
        await inView('#mm-branches .mm-br[data-b="0"]');
        await shot(pad(n++), 'subs_typed', 'Two sub-branches typed under Temperature. "Saved ✓" at the top. Tap "＋ Add a branch" for the next big idea.', '#mm-add');
        await mapTop();
        await shot(pad(n++), 'subs_map', 'The map: Temperature now has two small boxes for its details.', '#mm-svg');
      }
      if (i === 1) {
        await inView('#mm-branches .mm-br[data-b="1"]');
        await shot(pad(n++), 'branch2', 'Branch 2 "Heat flow" (Orange) with its two sub-branches.', null);
      }
    }
    // finished map at the top
    await p.evaluate(() => { const d = document.querySelector('.mm-dialog'); d.scrollTop = 0; document.activeElement && document.activeElement.blur(); });
    await settle();
    await shot(pad(n++), 'finished_map', 'The finished map: HEAT in the middle, 3 coloured branches, 6 sub-branches. "Saved ✓" means it is kept on this device.', '#mm-saved');

    // find it again: close, reload, open
    await p.locator('#mm-edit .mm-x').click();
    await p.waitForTimeout(500);
    await p.reload();
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(1500);
    await shot(pad(n++), 'closed', 'Closed with ×. Later (even after closing the app), tap "✏️ Make my own mind map" again.', '#mm-make');
    await p.locator('#mm-make').click();
    await p.waitForTimeout(800);
    await shot(pad(n++), 'mymaps_list', '"My mind maps (1)" lists the saved map: a small picture, its name, "Heat · 3 branches", "Changed just now", and the buttons Open / Rename / Delete.', '#mm-list .mm-card');
    // rename
    await p.locator('#mm-list .mm-acts button', { hasText: 'Rename' }).click();
    await p.waitForTimeout(300);
    await p.keyboard.type('My Heat map', { delay: 15 });
    await shot(pad(n++), 'rename', 'Rename: the name turns into a box. Type the new name and press Enter.', '#mm-list .mm-meta input');
    await p.keyboard.press('Enter');
    await p.waitForTimeout(400);
    // delete (but keep it)
    await p.locator('#mm-list .mm-acts button', { hasText: 'Delete' }).click();
    await p.waitForTimeout(300);
    await shot(pad(n++), 'delete_confirm', 'Delete asks first: "Delete it for good?" with "Yes, delete" and "No, keep it". Here: No, keep it.', p.locator('#mm-list .mm-acts button', { hasText: 'No, keep it' }));
    await p.locator('#mm-list .mm-acts button', { hasText: 'No, keep it' }).click();
    await p.waitForTimeout(300);
    await shot(pad(n++), 'open', 'Kept. New name shows. Tap "Open" to go back into the map.', p.locator('#mm-list .mm-acts button', { hasText: 'Open' }));
    await p.locator('#mm-list .mm-acts button', { hasText: 'Open' }).click();
    await p.waitForTimeout(800);
    await p.evaluate(() => { const d = document.querySelector('.mm-dialog'); d.scrollTop = 0; });
    await shot(pad(n++), 'opened', 'The map is open again, ready to add more. Tap "🖼 Compare with the poster".', '#mm-compare');

    // compare with the poster
    await p.locator('#mm-compare').click();
    await p.waitForTimeout(7000);
    await shot(pad(n++), 'compare_poster', 'The sheet closes and the Mind Lab shows the Heat poster. Check what you missed. Tap "✏️ Back to my mind map".', '#mm-return');
    await p.locator('#mm-return').click();
    await p.waitForTimeout(900);
    await p.evaluate(() => { const d = document.querySelector('.mm-dialog'); d.scrollTop = 0; });
    await shot(pad(n++), 'back_to_map', 'Back in your own map, just where you left it. Tap "⬇ Save as picture".', '#mm-png');

    // save as picture
    const dl = p.waitForEvent('download');
    await p.locator('#mm-png').click();
    const d = await dl;
    const pic = pad(n) + '_picture_' + tag + '.png';
    await d.saveAs(SHOTS + pic);
    log[tag + '_download'] = d.suggestedFilename();
    await p.waitForTimeout(300);
    await shot(pad(n++), 'picture_saved', 'The picture is downloaded (' + d.suggestedFilename() + ') and the pill says "Picture saved ✓". The saved picture is ' + pic + '.', '#mm-saved');
    await ctx.close();
  }
  await br.close();
  const prev = fs.existsSync(D + '/capture_log.json') ? JSON.parse(fs.readFileSync(D + '/capture_log.json')) : {};
  fs.writeFileSync(D + '/capture_log.json', JSON.stringify(Object.assign(prev, log), null, 1));
})().catch(e => { console.error(e); process.exit(1); });
