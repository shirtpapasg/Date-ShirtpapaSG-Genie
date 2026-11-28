# Primary Science TB Guide (the Explained episode guide)

Live page: https://claude.ai/artifact/WwLKY24ztfQRKpCwJatJd4 (title "Primary Science TB Guide", set by the teacher).

To refresh it after an episode goes live:
1. Copy TheOneApp `videos.js` here as `videos.mjs`.
2. Add the new episode's chapter, pages and experiment to the `P3` map in `gen.mjs` (P4–P6 are mapped by number), then `node gen.mjs`.
3. Put `guide-data.json` into `explained-episode-guide.html` in place of the `const DATA = [...]` array, and update the "Coming next" list and the tag rules in `epHTML` if needed.
4. `node chk.js` (search and phone-width check), then publish the HTML to the same artifact URL.
