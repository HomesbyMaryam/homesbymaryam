---
description: Draft and publish a new Journal post on the Homes by Maryam website. Pass an optional topic as the argument; if omitted, the skill picks the next entry from the editorial backlog.
---

Run the `journal-post` skill end-to-end for the Homes by Maryam
Journal.

If the user invoked this command with arguments, treat those
arguments as the working topic for the post. If no arguments were
passed, let the skill pick the highest-priority topic from
`.claude/skills/journal-post/references/topic-backlog.md` that fits
the current month and isn't already covered in `_posts/`.

Follow the skill's workflow exactly:

1. Pick the topic.
2. Research only if the topic depends on current data (cap at 3 web queries).
3. Delegate the prose draft to the `journal-writer` agent.
4. Validate the frontmatter against the spec.
5. Save the file at `_posts/YYYY-MM-DD-<slug>.md`.
6. Run the em-dash sweep.
7. Run `bundle exec jekyll build` and confirm the post appears in `_site/journal/<slug>/index.html`.
8. Report the path, category, word count, lede, and offer to open a PR.

Do not commit or push without the user's explicit confirmation.
