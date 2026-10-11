/* mymap-bank.js — the key-word bank behind "✓ Check my map" and the key-word chips.
 *
 * The Mind Lab posters (TOPICS in mindmap.html) are the MASTER wording. For each
 * chapter this lists the poster's branches and key words (b), other ways a pupil
 * may say the same thing (al), and the words the P4 videos "TheOneApp, Explained"
 * use for them (video). The videos will not be re-rendered, so the app accepts
 * both: a video word shows on a chip as "📺 HEAT FLOW = Heat flows", and a map
 * that uses it is checked as if it said the poster's words.
 *
 *   b      a poster branch, in poster order
 *          t      the branch, exactly as on the poster
 *          rank   how important it is (1 first): the hint goes to the missing branch
 *                 with the smallest rank
 *          hint   the one gentle hint when it is missing (a question, never "wrong")
 *          al     other ways to say it
 *          k      its key words: t exactly as on the poster, short for a chip when the
 *                 poster's words are too long for the maker, al other ways to say it
 *   video  the videos' words: w as on screen, ep the episodes, to what it means on the
 *          poster ("Branch" or "Branch > Key word"), p a close idea (credited, not
 *          praised), chip shown as a chip (it is on the video's own mind map),
 *          raw other spellings on screen
 *   mix    a known mix-up for the chapter, from misconceptions.js (M-…) and the
 *          teacher's mixups.js (chapter#n). d: phrases to look for (whole words;
 *          "a && b" means both, in the sub-branch or its branch); unless: skip when
 *          these are there too ("cold doesn't flow" is right); inBranch: only under
 *          that branch; wording: right science, loose words (shown after real
 *          mix-ups). say: what the pupil reads, always an "Exam tip".
 *
 * Matching ignores case, plurals, emoji, punctuation, "&" / "and", and reads an
 * arrow (➜ → ->) as "to"; see norm() in mymap-keywords.js.
 * Chapters not listed here (P5, P6) are checked against their poster words only.
 * tests/mymap-keywords.test.mjs keeps every branch and key word here the same as
 * the posters, so change the two together.
 */
