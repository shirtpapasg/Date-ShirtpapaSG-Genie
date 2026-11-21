# Brief-writing guide for "TheOneApp, Explained" (P5 and P6 series)

You are writing episode briefs for a children's science YouTube series. A brief is the complete design of one 4-minute episode: what Heart (the narrator) says in each beat, what is on screen, the exact definitions, the quiz, the habit, the mind map, the lab link, the photos. Scripts and scene code are built from the brief, so it must be complete and precise. Write files only; never run git.

## Read first, in this order

1. The level's series plan `00_series_plan.md` (your episodes' row in the episode table is the contract: title, activities/pages, big idea, the three goals, NGSS, topic tag, School Lab link, Mind Lab chapter, photo moment).
2. The level's style guide `01_style_guide_pN.md` (every rule applies; the P5 guide also holds the photo rules in §11, which P6 inherits).
3. The level's `definitions_pN.md` (exact wording, row numbers, ⚠ flags) and `content_map_pN.md` (teaching order, key terms, misconceptions, Singapore examples). If a file is missing when you start, read the level's `sources/` folder instead and quote the source document and page; the compiler will map row numbers later.
4. The level's `app_pN.md` and `labs_pN.json` (lab card fields, Mind Lab poster wording, spoken mind-map line). If missing, read `/home/user/theoneapp/labs/briefs-pN/<code>.md` for the lab you need and `/home/user/theoneapp/mindmap.html` for the poster.
5. The format template: `/tmp/claude-0/-home-user/74176568-2247-5488-9d44-67460063f436/scratchpad/tpl/production/workspace/P3/plan/briefs/ep02.md` and `ep01.md`, `ep24.md` (an investigation episode), `ep13.md` (a design episode). Copy their structure exactly.
6. The kit contract: `/tmp/claude-0/-home-user/74176568-2247-5488-9d44-67460063f436/scratchpad/tpl/production/workspace/P3/kit/README.md` sections 1–2 (segment ids, config keys, cue-word stripping).

## Each brief: the 15 sections, in this order

1. Header line: `# EP NN — <working title>` then the metadata line (Topic tag · Icon · Chapter/pages/activities · Mind Lab chapter · School Lab code/title/part or `lab: null` + planned bench · NGSS · Narrator Heart voice 3 · Target length and authored words · Output name).
2. **Big idea** (one sentence, from the plan).
3. **Three goals** table: icon · on-screen label (≤ 32 characters) · spoken phrase (exactly the plan's).
4. **Beat outline** table: `seg id` · `scene` · Heart says (gist, but close to final: full sentences, the actual numbers, the actual definition words) · `[ON SCREEN]` (drawable as SVG animation; where a photo is used, write `[PHOTO: <shot-list key>]` and the fallback drawing). Required ids: `hook` first; body beats with short lowercase ids; investigation episodes include a `think` beat (variables chips: changed, kept the same, measured); `lab` (or a `tryit` home test when `lab: null`); `tip` (Exam tip); `quiz1` + `quiz2` in scene `quiz`; `exam`; `habit1` in scene `habit`; `habit2` in scene `mindmap`; `close`. One spoken Singapore anchor and one spoken US bridge inside named beats. Keep to the word budget in the style guide; count the words of the Heart column and write the total under the table.
5. **Definitions to use word for word**: list by row number from `definitions_pN.md` (or by source + page), full wording, ⚠ flags carried over.
6. **Key words**: the kit `kw` array lines `["seg","cueword","LABEL","#hex"]`, cue words stripped (lowercase a–z and `'` only; "cold-blooded" → coldblooded), labels with full names, 6–12 per episode.
7. **Misconceptions to bust**: each one as a line "Wrong idea → the correct idea (source)". At least one becomes the `tip` beat and at least one becomes a wrong quiz option.
8. **Exam wording box**: ≤ 3 numbered lines, full definitions; P6 includes one full structured answer (cause → process → result).
9. **Pause and predict**: the question (a NEW situation not shown earlier; the question must not contain the answer's definition words; the beat before `quiz1` must not state the answer), four options A–D, the answer letter, the reason sentence.
10. **Atomic habit + mind map**: `habit1` ≤ 30 words using one named habit technique; `habit2` middle word, 3–5 branches, 2–3 sub-branches each, matching the Mind Lab poster's wording where the poster covers the topic; ends with the exact spoken app line and the chapter to pick.
11. **School Lab link**: the spoken sentence and the config `{"seg","word","code","title","part"}`; or `lab: null` with the planned bench named and the home try-it described (with safety line if needed).
12. **Singapore anchor + US bridge**: which beat carries each (both must appear in the beat table's Heart column).
13. **Realism notes**: what must look right (from the style guide's realism section, applied to this episode's drawings).
14. **Bursts / end card**: `bursts` array, the "NEXT EPISODE" lines (the next episode's working title), output file name.
15. **Description note + Photo shot list**: enrichment kept out of the video; ⚠ lab mismatches; then the shot list table: key · segment · subject · what must be visible · preferred source (teacher's photo, or a Wikimedia Commons search phrase with the licence to look for: PD/CC0/CC BY) · fallback drawing. P6 briefs add **16. Data beat**: the table or graph read on screen, exact numbers, the trend sentence with its range, the variables chips.

## Hard rules (the compiler rejects briefs that break them)

- Definitions never shortened; wrong statements marked ✗ only when actually false; positive language (no cheat, trap, stupid, kill, dead, die, gross); syllabus terms only and the level's Never-list honoured (P5: no particles, molecules, energy, xylem/phloem, voltage, current-as-noun; P6: no particles, molecules, newtons, acceleration, "energy used up"; forms of energy named as the textbook names them).
- No textbook cast names. No "tell me in the comments". No numbered stages or markers. No arrowheads on label lines.
- The `habit2` text says "Save it in TheOneApp, the ultimate science app. Tap Mind maps, then, Make my own mind map, and pick <chapter>." with "&" spoken as "and".
- Every claim must be traceable to `definitions_pN.md`, `content_map_pN.md`, the sources, or the syllabus; when unsure, write "⚠ check" beside it rather than guessing.
- Word budget: P5 hook ≤ 35, episode ≤ 640 authored words, tail (exam + habit1 + habit2) ≤ 130; P6 hook ≤ 35, episode ≤ 680, tail ≤ 130.

## Output

One file per episode at `<level>/plan/briefs/epNN.md` (two-digit numbers). When all your episodes are written, reply with: the list of files, each episode's authored word count, and every "⚠ check" you left for the compiler.
