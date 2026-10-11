// Browser check of the key-word chips and "✓ Check my map" in the maker.
const { chromium } = require('playwright');
const OUT = '/tmp/claude-0/-home-user/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad/snaps/';
const URL = 'http://127.0.0.1:8743/mindmap.html';
const fs = require('fs');
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const problems = [];
  for (const [tag, vp] of [['desk', { width: 1280, height: 800 }], ['phone', { width: 390, height: 844 }]]) {
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: tag === 'phone' ? 2 : 1, hasTouch: tag === 'phone', isMobile: tag === 'phone' });
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push('pageerror: ' + e.message));
    page.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
    page.on('requestfailed', r => errs.push('requestfailed: ' + r.url() + ' ' + (r.failure() && r.failure().errorText)));
    await page.goto(URL + '#make', { waitUntil: 'load' });
    await page.evaluate(() => { try { localStorage.removeItem('sm-mymaps-v1'); localStorage.removeItem('sm-mymap-kw-open'); } catch (e) {} });
    await page.reload({ waitUntil: 'load' });
    await page.waitForSelector('#mm-sheet:not([hidden])');
    await page.selectOption('#mm-ch', 'heat');
    await page.click('#mm-new');
    await page.waitForSelector('#mm-edit:not([hidden])');
    await page.waitForTimeout(400);
    await page.screenshot({ path: OUT + `ck_${tag}_1_new.png` });
    // the key-word box, in full
    await page.evaluate(() => document.querySelector('#mm-kw').scrollIntoView({ block: 'start' }));
    await page.waitForTimeout(200);
    await page.screenshot({ path: OUT + `ck_${tag}_2_chips.png` });

    // tap chips: a branch, a key word under it, then two video words
    await page.click('[data-chip="b0"]');            // Heat flows
    await page.click('[data-chip="b0k0"]');          // From hotter to colder
    await page.click('.mm-kw-vid summary');
    await page.waitForTimeout(150);
    const vchip = async w => { const ids = await page.$$eval('.mm-chip.vid', (bs, w) => bs.filter(b => b.querySelector('b').textContent === w).map(b => b.dataset.chip), w); await page.click('[data-chip="' + ids[0] + '"]'); };
    await vchip('CONDUCTORS');
    await vchip('good: metals');
    await page.waitForTimeout(300);
    await page.evaluate(() => document.querySelector('.mm-kw-vid').scrollIntoView({ block: 'center' }));
    await page.waitForTimeout(200);
    await page.screenshot({ path: OUT + `ck_${tag}_3_chips_used.png` });
    // type a branch of their own: Temperature > thermometer, and a mix-up under Heat flows
    await page.click('#mm-add');
    await page.keyboard.type('🌡️ TEMPERATURE');
    await page.keyboard.press('Enter');
    await page.keyboard.type('thermometer');
    const hf = page.locator('.mm-br').first();
    await hf.locator('[data-act="addsub"]').click();
    await page.keyboard.type('cold flows into the ice');
    await page.waitForTimeout(500);
    await page.screenshot({ path: OUT + `ck_${tag}_4_built.png` });

    await page.click('#mm-check');
    await page.waitForSelector('#mm-result:not([hidden])');
    await page.waitForTimeout(700);
    await page.screenshot({ path: OUT + `ck_${tag}_5_check.png` });
    await page.evaluate(() => document.querySelector('#mm-result').scrollIntoView({ block: 'start' }));
    await page.waitForTimeout(300);
    await page.screenshot({ path: OUT + `ck_${tag}_6_result.png` });
    const board = await page.locator('.mm-canvas').boundingBox();
    await page.evaluate(() => document.querySelector('.mm-canvas').scrollIntoView({ block: 'start' }));
    await page.waitForTimeout(300);
    await page.screenshot({ path: OUT + `ck_${tag}_7_map_marks.png` });
    const text = await page.locator('#mm-result').innerText();
    fs.writeFileSync(OUT + `ck_${tag}_result.txt`, text);

    // show me the key words
    await page.click('[data-rs="show"]');
    await page.waitForTimeout(700);
    await page.screenshot({ path: OUT + `ck_${tag}_8_show.png` });
    // change the map: the check goes stale
    await page.locator('#mm-centre').fill('Heat!');
    await page.waitForTimeout(300);
    await page.evaluate(() => document.querySelector('#mm-result').scrollIntoView({ block: 'start' }));
    await page.waitForTimeout(300);
    await page.screenshot({ path: OUT + `ck_${tag}_9_stale.png` });

    // horizontal overflow?
    const over = await page.evaluate(() => {
      const d = document.querySelector('.mm-dialog');
      return { dialog: d.scrollWidth - d.clientWidth, doc: document.documentElement.scrollWidth - window.innerWidth };
    });
    // tap targets under 44px in the new UI
    const small = await page.$$eval('#mm-kw button, #mm-kw summary, #mm-result button, #mm-check', els => els.filter(e => e.offsetParent !== null).map(e => { const r = e.getBoundingClientRect(); return { t: e.textContent.trim().slice(0, 30), w: Math.round(r.width), h: Math.round(r.height) }; }).filter(x => x.h < 44 || x.w < 44));

    // the Heat poster, drawn to the end
    await page.click('#mm-edit .mm-x');
    await page.evaluate(() => { window.MindLab.open('heat'); });
    await page.waitForTimeout(600);
    await page.evaluate(() => { window.MindLab.seek(window.MindLab.duration()); });
    await page.waitForTimeout(400);
    const stage = page.locator('#stage-shell');
    await stage.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await stage.screenshot({ path: OUT + `ck_${tag}_poster_heat.png` });

    problems.push({ tag, errs, over, small, board });
    await ctx.close();
  }
  await browser.close();
  console.log(JSON.stringify(problems, null, 1));
})();
