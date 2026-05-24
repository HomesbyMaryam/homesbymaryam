---
name: journal-post
description: Draft and publish a new Journal/Blog post for the Homes by Maryam website. Use when the user says "/new-journal-post", "draft a journal post", "publish this month's market update", "write a blog post about <topic>", or asks to add an entry to _posts/. Handles topic selection (from args or the editorial backlog), research, drafting in Maryam's brand voice, frontmatter generation, file placement, and a Jekyll build check.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, WebSearch, WebFetch, Agent
---

# Journal post writer

You are drafting a post for the Homes by Maryam Journal. The site is
a Jekyll blog at `_posts/YYYY-MM-DD-slug.md` and renders via the
editorial blog-card layout described in `CLAUDE.md` at the repo root.

Before you start, read these three references in order:

1. `.claude/skills/journal-post/references/voice-guide.md`
2. `.claude/skills/journal-post/references/post-frontmatter.md`
3. `.claude/skills/journal-post/references/topic-backlog.md`

Also re-read `CLAUDE.md` for the project-wide rules (no em-dashes,
King City positioning, Canadian English, etc.). Treat all of these as
non-negotiable.

## Workflow

Follow these steps in order. Mark each one as you go.

### 1. Pick the topic

- If the user passed a topic argument (e.g. `/new-journal-post King City spring market`), use it as the working topic.
- Otherwise, open `references/topic-backlog.md` and pick the highest-priority topic that fits the current month (the backlog is annotated by season). Skip topics already covered — check `_posts/` titles before choosing.
- If nothing in the backlog fits and no argument was given, ask the user for a topic. Do not invent one silently.

State the topic to the user in one line before continuing.

### 2. Research (only if needed)

Most posts in the backlog have built-in angles and don't need
research. Use `WebSearch` only when:

- The topic depends on **current** market data, rates, or policy (e.g. Bank of Canada rate change, TRREB monthly report, new Ontario regulation).
- You need a recent statistic to anchor the lede.

Cap research at **3 web queries**. Capture only the facts you'll
actually use; don't dump search results into context. Prefer
authoritative sources (Bank of Canada, TRREB, CMHC, government of
Ontario, Globe and Mail, Toronto Star).

Never copy more than one short quote (under 15 words) from any
external source.

### 3. Draft the post

Delegate the prose draft to the `journal-writer` agent. Pass it:

- The chosen topic
- Any researched facts (as a short bulleted brief)
- The voice-guide and frontmatter-spec paths

The agent will return a complete post (frontmatter + body). Read it
critically before saving. If the draft drifts from the voice rules,
revise inline rather than re-running the agent.

If the agent is unavailable or seems unnecessary for a short post,
draft directly yourself — but apply the same voice rules.

### 4. Validate the frontmatter

Confirm every field matches `references/post-frontmatter.md`:

- `title` is in title case, no em-dashes, < 70 chars.
- `date` is today's date (`YYYY-MM-DD`). Use `Bash` (`date +%F`) if unsure.
- `category` is one of the allowed values.
- `description` is one or two sentences, under 160 characters, ends with a period, no em-dashes.
- `read` is realistic (assume 220 wpm reading speed).
- `tone` matches the category's palette in the table.
- `excerpt_text` is optional but recommended — one sentence that hooks the reader, used on the home and journal cards.

### 5. Choose the slug and write the file

Slug rules:

- All lowercase, ASCII letters, digits, and hyphens.
- 4–7 words, drawn from the title's key terms.
- No date prefix in the slug itself (the filename already carries the date).

Filename: `_posts/YYYY-MM-DD-<slug>.md`.

Use `Write` to create the file. Do not overwrite an existing file —
if a collision would occur, add a short qualifier to the slug.

### 6. Em-dash sweep

Run:

```bash
grep -n "—" _posts/YYYY-MM-DD-<slug>.md || echo "ALL CLEAR"
```

If anything is found, replace with the appropriate punctuation
(comma, period, colon, semicolon, or parentheses) per the
`CLAUDE.md` rule.

### 7. Build check

```bash
bundle exec jekyll build 2>&1 | tail -10
```

The build must succeed and the new post must appear in
`_site/journal/<slug>/index.html`. If Jekyll errors, fix the
frontmatter (most common cause: invalid YAML or a stray smart quote).

### 8. Report

Reply to the user with:

- The post path and slug.
- The category, read time, and word count.
- The first sentence of the lede so they can scan it.
- A one-line offer: "Want me to open a PR with this post?"

Do not commit or push without an explicit yes from the user.

## Escalation rules

- If the topic is sensitive (legal, tax, financial advice, fair
  housing, anything making numeric promises about returns), stop
  drafting and ask the user to confirm scope before continuing.
  Maryam is a real estate professional, not a lawyer or financial
  advisor; the post must reflect that.
- If you can't find at least one defensible local angle (King City,
  York Region, Aurora, Richmond Hill, Vaughan, Markham, Newmarket),
  push back on the topic. Generic GTA content is off-brand.
- Never publish a post that recommends a specific property, lender,
  brokerage competitor, or third-party service by name without the
  user's review.
