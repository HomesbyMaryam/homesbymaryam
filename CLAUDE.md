# Homes by Maryam — project guide for Claude

This repo is the production website **https://homesbymaryam.ca** for
Maryam Haghighi, a King City specialist and York Region REALTOR®
(RE/MAX You Community Realty Brokerage). Read this file before doing
any work in the repo.

## Stack

- **Jekyll 4** (Ruby) static site, deployed by GitHub Actions to
  GitHub Pages on push to `main` (see `.github/workflows/`).
- Page templates: HTML + Liquid in `_layouts/` and `_includes/`.
- Styles: a single `assets/css/main.scss` compiled by `jekyll-sass-converter`.
- Site copy and structure: `index.html`, `about.html`, `buy.html`,
  `sell.html`, `contact.html`, `journal.html`, plus `_posts/*.md` for
  the Journal.
- Site-wide config lives in `_config.yml` (contact, nav, plugins).
- Google Analytics (GA4 `G-K4EX19W5H7`) is in `_includes/analytics.html`.
- SEO uses `jekyll-seo-tag` + custom JSON-LD in
  `_includes/seo-structured-data.html`.

## Local development

```bash
bundle install --path vendor/bundle      # one-time
bundle exec jekyll serve --livereload    # http://127.0.0.1:4000
bundle exec jekyll build                 # produce _site/
```

There is a Claude Code launch config at `.claude/launch.json` named
`jekyll` so the Preview panel can run the site directly.

## Brand & voice rules

Maryam's positioning was rewritten in PR #9 from a generic GTA "quiet"
landing page to a **King City specialist serving York Region**. All
new copy must hold that line:

- **Lead with King City**, then expand to York Region (Aurora,
  Newmarket, Richmond Hill, Vaughan, Markham). The GTA is secondary.
- **Voice**: deliberate, expert, locally rooted. Two decades across
  business, real estate, banking, and investment. Confident, not
  performative. Numbers behind every claim.
- **Do NOT** use the word "quiet" as a brand descriptor (calm,
  composed, deliberate, considered are fine).
- **Do NOT** use em-dashes (`—`) anywhere in user-facing source
  (HTML, MD, YML, SCSS). Use commas, periods, colons, semicolons, or
  parentheses depending on context. This rule is enforced site-wide.
- Prefer Canadian English spelling (neighbourhood, realise, modelling).
- Active voice. Second person ("you") is allowed and encouraged.
- Sentences should be confident, not hedged.

## Content rules for the Journal (`_posts/`)

Each post is a Markdown file at `_posts/YYYY-MM-DD-slug.md` with this
frontmatter shape:

```yaml
---
title: "Post title in title case"
date: 2026-05-24
category: "Market Updates"          # see allowed list below
description: "1–2 sentence SEO meta description, < 160 chars."
read: "7 min"                       # estimated read time
tone: ["#FAF7F2", "#E4DCCD"]        # two-colour gradient for the cover
excerpt_text: "Optional pull quote shown on the home & journal pages."
---
```

**Allowed categories** (keep this list short and consistent — the
journal page filters by it):

- Market Updates
- Buying Tips
- Selling Tips
- Investment
- Neighbourhoods
- Tenant Management

**Tone palette** for the editorial blog-card cover. Use the pair that
matches the category visually:

| Category          | tone (light, dark)              |
| ----------------- | -------------------------------- |
| Market Updates    | `["#F1ECE3", "#C9BFAE"]`         |
| Buying Tips       | `["#FAF7F2", "#E4DCCD"]`         |
| Selling Tips      | `["#EDE3D0", "#B4933A"]`         |
| Investment        | `["#E5D9C1", "#8C6F26"]`         |
| Neighbourhoods    | `["#E4DCCD", "#B5654A"]`         |
| Tenant Management | `["#DEDFE0", "#6E665C"]`         |

The blog card renders the category name + the first letter of the
category as a large italic serif initial on this gradient. Don't try
to set a hero image — there's no slot for one in the current layout.

## Other rules

- **Do not run `bundle install` without the `--path vendor/bundle`
  flag**. The repo's `Gemfile.lock` is gitignored; gems install
  per-machine into `vendor/`.
- **Do not commit `_site/`**, `vendor/`, or `Gemfile.lock` (all in
  `.gitignore`).
- `.claude/` is mostly gitignored, but `.claude/skills/`,
  `.claude/commands/`, and `.claude/agents/` ARE tracked so this
  project's Cowork skills ship with the repo.
- Treat the `_posts/` Markdown bodies as canonical: ordinary prose,
  H2/H3 subheads, no inline HTML beyond what Kramdown handles.

## Workflows in this repo

- **`/new-journal-post`** — drafts a new Journal post end-to-end using
  the `journal-post` skill. See `.claude/skills/journal-post/SKILL.md`
  for the full workflow and `.claude/skills/journal-post/references/`
  for the voice guide, frontmatter spec, and topic backlog.
