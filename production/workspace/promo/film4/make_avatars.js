// make_avatars.js: the pupils' characters, drawn by the app's own avatar.js (read only: /home/user/theoneapp, served locally),
// -> avatars.js (window.AV = {name: {front: <svg>, side: <g>}}, window.AVICON = {...}). Nothing in the app is changed.
//   (cd /home/user/theoneapp && python3 -m http.server 8765 --bind 127.0.0.1 &)   NODE_PATH=$(npm root -g) node make_avatars.js
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const BASE = { skin: 2, hair: 'curly', hairCol: 0, cloth: 3, wrap: 3, eyes: 'sparkle', acc: 1, headphones: false, eyeCol: 0, mouth: 'grin', cheek: 'blush', look: 'labcoat', topper: 'none', prop: 'testtube', back: 'none', bottom: 'trousers', botCol: 1 };
const CFG = {
  you0: { ...BASE },                                   // before the Gift Shop (drawn grey on the platform)
  you: { ...BASE, topper: 'safetygoggles' },           // after: the Safety Goggles bought (Uncommon, 50 credits)
  // other pupils on the platform, in everyday looks from the maker and the shop
  a: { skin: 0, hair: 'ponytail', hairCol: 3, cloth: 0, wrap: 1, eyes: 'happy', mouth: 'smile', cheek: 'blush', look: 'tiedye', topper: 'strawhat', prop: 'icecream', back: 'none', bottom: 'skirt', botCol: 2, headphones: false },
  b: { skin: 4, hair: 'spiky', hairCol: 0, cloth: 4, wrap: 2, eyes: 'round', mouth: 'grin', cheek: 'freckles', look: 'jersey', topper: 'propeller', prop: 'kite', back: 'backpack', bottom: 'shorts', botCol: 0, headphones: false },
  c: { skin: 6, hair: 'twinbuns', hairCol: 6, cloth: 5, wrap: 0, eyes: 'star', mouth: 'cat', cheek: 'sticker', look: 'dungarees', topper: 'flowers', prop: 'flower', back: 'none', bottom: 'skirt', botCol: 6, headphones: false },
  d: { skin: 5, hair: 'short', hairCol: 1, cloth: 1, wrap: 3, eyes: 'almond', mouth: 'smile', cheek: 'blush', look: 'hoodie', topper: 'beanie', prop: 'bubbletea', back: 'none', bottom: 'trousers', botCol: 4, headphones: true },
  e: { skin: 1, hair: 'bob', hairCol: 9, cloth: 7, wrap: 1, eyes: 'heart', mouth: 'tongue', cheek: 'rainbow', look: 'floral', topper: 'cat', prop: 'net', back: 'none', bottom: 'shorts', botCol: 3, headphones: false },
  f: { skin: 3, hair: 'layered', hairCol: 8, cloth: 2, wrap: 0, eyes: 'sparkle', mouth: 'grin', cheek: 'blush', look: 'denim', topper: 'party', prop: 'telescope', back: 'umbrella', bottom: 'trousers', botCol: 5, headphones: false },
  // v3 (teacher, 24 Nov 2026: "showcase some of the legendary customised suit"): the shop's own sets, worn exactly as the shop tries them on
  // Winter Wonderland Pack (S Legendary): its four sets (avatar.js SHOP wintertide.sets)
  wRed: { skin: 0, hair: 'ponytail', hairCol: 3, cloth: 0, wrap: 1, acc: 0, eyes: 'happy', mouth: 'smile', cheek: 'blush', look: 'velvetred', topper: 'pomhat', prop: 'present', back: 'tinytree', bottom: 'skirt', botCol: 0, headphones: false },
  wGreenD: { skin: 6, hair: 'twinbuns', hairCol: 1, cloth: 4, wrap: 0, acc: 4, eyes: 'star', mouth: 'cat', cheek: 'snowflake', look: 'snowgreen', topper: 'holly', prop: 'candycane', back: 'none', bottom: 'skirt', botCol: 0, headphones: false },
  wRedJ: { skin: 5, hair: 'short', hairCol: 1, cloth: 0, wrap: 3, acc: 0, eyes: 'almond', mouth: 'smile', cheek: 'blush', look: 'jumperred', topper: 'antlers', prop: 'candycane', back: 'tinytree', bottom: 'trousers', botCol: 1, headphones: false },
  wGreenJ: { skin: 4, hair: 'spiky', hairCol: 0, cloth: 4, wrap: 2, acc: 4, eyes: 'round', mouth: 'grin', cheek: 'snowflake', look: 'jumpergreen', topper: 'earmuffs', prop: 'present', back: 'none', bottom: 'trousers', botCol: 0, headphones: false },
  // Space Explorer Pack (SS Mythical): the pupil's own character in the Space Suit, Planet Band, Rocket Pack and Mini Telescope
  space: { ...BASE, look: 'spacesuit', topper: 'planetband', back: 'rocketpack', prop: 'telescope' },
};
(async () => { const b = await chromium.launch(); const p = await b.newPage(); p.on('pageerror', e => console.log('PAGEERR', e.message));
  await p.goto('http://127.0.0.1:8765/privacy.html'); await p.addScriptTag({ url: '/avatar.js' });
  const ids = await p.evaluate(() => AVATAR.SHOP.map(s => 'shop:' + s.id));
  await p.evaluate((ids) => localStorage.setItem('sm-credits-v1', JSON.stringify({ v: 1, total: 0, spent: 0, owned: ids, days: {}, log: [], first: true })), ids);
  await p.reload(); await p.addScriptTag({ url: '/avatar.js' });
  const out = await p.evaluate((CFG) => { const o = {}; for (const [k, c] of Object.entries(CFG)) { const cl = AVATAR.clean(c); o[k] = { cfg: cl, front: AVATAR.front(cl, 300), side: AVATAR.side(cl, 'walk', {}) }; }
    const icon = { goggles: AVATAR.shopIcon('safetygoggles', 200, CFG.you0), wintertide: AVATAR.shopIcon('wintertide', 200, CFG.you0), space: AVATAR.shopIcon('space', 200, CFG.you0) };
    const sg = AVATAR.SHOP.filter(s => ['safetygoggles', 'wintertide', 'space'].includes(s.id)).map(s => ({ id: s.id, name: s.name, tier: s.tier, price: s.price, tierName: s.tier && AVATAR.TIERS[s.tier].name, season: s.season }));
    const packs = AVATAR.PACKS.filter(P => P.id === 'wintertide').map(P => ({ id: P.id, name: P.name, from: P.from, to: P.to }));
    return { o, icon, sg, packs, css: AVATAR.css() }; }, CFG);
  console.log('shop:', JSON.stringify(out.sg), JSON.stringify(out.packs)); for (const [k, v] of Object.entries(out.o)) console.log(k, v.cfg.topper, v.cfg.look, v.front.length);
  fs.writeFileSync(path.join(__dirname, 'avatars.js'), '// generated by make_avatars.js from the app\'s avatar.js (do not edit)\nwindow.AV=' + JSON.stringify(out.o) + ';\nwindow.AVICON=' + JSON.stringify(out.icon) + ';\nwindow.AVSHOP=' + JSON.stringify({ items: out.sg, packs: out.packs }) + ';\nwindow.AVCSS=' + JSON.stringify(out.css) + ';\n');
  await b.close(); })();
