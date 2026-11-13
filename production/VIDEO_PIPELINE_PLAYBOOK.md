# Video pipeline: daily check (playbook)

The teacher (2026-11-13): a co-work agent that monitors and follows through the video pipeline, daily, with a phone notification.

Each morning a fresh Claude session reads this playbook, checks every episode on the **Videos Review Board**, does the steps it may do on its own, and sends one short summary that lists what is waiting for the teacher.

- Board: https://claude.ai/artifact/4LdsCNE87uai78ZDNHTPss
- Its database collection: `episodes`
- One document per episode, with these fields:
  - `level` (P3–P6; a missing level means P4), `no`, `title`
  - `rendered`, `approved`, `youtubeUrl`, `live`, `pending`
  - `videoUpdatedAt`, `reviewedAt`
  - `parts` (the video files) or `playAt` (watch on another board)
  - `changes`, `notes` (the teacher's notes)
- The app's video list is `videos.js` in the TheOneApp repository, `shirtpapasg/TheOneApp`.

## The stages

**Scripted → Rendered → Approved → Uploaded → Live**

| Stage | It is reached when | Next step | Who does it |
|---|---|---|---|
| Scripted | a card exists, `rendered` is false | Render the video | The render kit on the teacher's Mac. The daily check **lists it** for the teacher; it cannot render from the cloud |
| Rendered | `rendered` is true, `approved` is false | Watch and press Approve | **The teacher** |
| Approved | `approved` is true, there is no `youtubeUrl` | Upload to YouTube as Unlisted, with title, description, thumbnail and playlist | The check **prepares** the title, description, tags and chapter times, then asks the teacher to say "go". Uploading needs the teacher's YouTube sign-in |
| Uploaded | `approved` is true and `youtubeUrl` is set, `live` is false | Link the video in TheOneApp's `videos.js` at the right level and episode, then set `live` | The check **prepares** the change as a pull request with the tests run. It merges only when the teacher says "go", because this puts the video in front of pupils |
| Live | `live` is true | None | Nobody |

## Also checked every day

1. **New version waiting.** `videoUpdatedAt` is later than `reviewedAt`: list it as "new version to watch".
2. **Teacher's notes.** A card has `notes` that are not yet acted on:
   - Turn each note into a clear fix (what to change, and where in the video).
   - Flag it as a re-render for the Mac.
3. **Stuck.** `pending` has been true for more than 2 days, or an approved video has waited more than 7 days for upload: say so.
4. **Mismatch.** A video is `live` on the board but missing from `videos.js`, or the other way round: report it.

## What the check may do on its own

- Read the board, the repositories and YouTube.
- Write notes on a card's `changes` list. It never changes `approved` and never removes video files.
- Prepare text: titles, descriptions, chapter times, tags.
- Open a pull request and run the tests. It does not merge.

## What it may not do without the teacher saying "go"

- Upload, publish or delete anything on YouTube.
- Merge into the live app.
- Approve, unapprove or delete anything on the board.
- Email or message anyone.

## The daily notification

Short, phone-sized, and only what matters:

```
📹 Video pipeline · <date>
To watch (n): P3 EP04 Plants or animals?, …
Ready to upload (n): … (details prepared, reply "go")
Ready to go live (n): … (pull request ready, reply "go")
Notes turned into fixes (n): …
Stuck / mismatch: …
```

If nothing changed since yesterday, it says so in one line.
