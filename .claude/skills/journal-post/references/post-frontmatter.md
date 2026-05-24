# Frontmatter specification

Every Journal post is a Markdown file at `_posts/YYYY-MM-DD-<slug>.md`
with YAML frontmatter at the top. Jekyll fails the build if any
required field is missing or malformed.

## Required fields

```yaml
---
title: "Title in title case, under 70 chars"
date: 2026-05-24
category: "Market Updates"
description: "One- or two-sentence SEO meta description, under 160 chars, ends with a period."
read: "7 min"
tone: ["#F1ECE3", "#C9BFAE"]
---
```

| Field         | Type     | Notes                                                              |
| ------------- | -------- | ------------------------------------------------------------------- |
| `title`       | string   | Title case. No em-dashes. < 70 chars (Google SERP cutoff).         |
| `date`        | YYYY-MM-DD | Use today's date when publishing.                                 |
| `category`    | string   | One of the allowed values below.                                   |
| `description` | string   | One or two sentences, under 160 chars. Used for `<meta>` and OG.   |
| `read`        | string   | Realistic estimate at ~220 wpm. Format: "N min" (e.g. "5 min").    |
| `tone`        | array of two hex colors | Light-to-dark gradient for the blog-card cover. Match the category table. |

## Optional fields

```yaml
excerpt_text: "One sentence used as the card excerpt on /journal and the home page. If omitted, Jekyll auto-generates from the first paragraph."
last_modified_at: 2026-05-25      # Only set when materially editing an existing post.
source: "https://maryamhaghighi.royallepage.ca/<slug>"   # Original publication URL, if cross-posted.
```

## Allowed categories

The `/journal` page filters by this exact list. Don't introduce new
categories without updating the journal layout's chip list.

- `"Market Updates"` — macro / data / policy / rates
- `"Buying Tips"` — process, qualifying, offer strategy
- `"Selling Tips"` — pricing, staging, marketing, timing
- `"Investment"` — portfolio, cap rates, tenant economics
- `"Neighbourhoods"` — specific area deep-dives (King City, Aurora, etc.)
- `"Tenant Management"` — landlord-side topics, Ontario rules

## Tone palette by category

These pairs are tuned to harmonise with the editorial blog-card
gradient on the home page and `/journal`. The first colour is the
light corner, the second is the darker corner.

| Category          | tone                       |
| ----------------- | -------------------------- |
| Market Updates    | `["#F1ECE3", "#C9BFAE"]`   |
| Buying Tips       | `["#FAF7F2", "#E4DCCD"]`   |
| Selling Tips      | `["#EDE3D0", "#B4933A"]`   |
| Investment        | `["#E5D9C1", "#8C6F26"]`   |
| Neighbourhoods    | `["#E4DCCD", "#B5654A"]`   |
| Tenant Management | `["#DEDFE0", "#6E665C"]`   |

If a new combination is genuinely needed, keep contrast modest (the
big italic serif initial on the card needs to read against the
gradient at ~42% opacity).

## Title rules

- Title case in English: capitalise the first and last word and all
  major words. Lowercase: articles (a, an, the), short conjunctions
  (and, but, or, nor), prepositions under 5 letters (in, on, of, at,
  to, by, for, with).
- No trailing punctuation in titles.
- No clickbait. The title should describe the post, not bait the
  click.
- Avoid the word "quiet" (brand rule).

## Slug rules

The filename's slug becomes the URL: `/journal/<slug>/`.

- Lowercase ASCII letters, digits, and single hyphens.
- 4–7 words from the title's key terms.
- No stop words at the start (skip "the", "a", "an").
- No date in the slug — the filename's `YYYY-MM-DD-` prefix already
  carries it, and Jekyll uses the prefix for sorting.

Examples:

| Title                                                       | Slug                                          |
| ----------------------------------------------------------- | --------------------------------------------- |
| "King City Spring Market: What 2026 Is Telling Us"          | `king-city-spring-market-2026`                |
| "How the New Buyer Agency Rules Change Offer Strategy"      | `new-buyer-agency-rules-offer-strategy`       |
| "Three Off-Market Trends in Aurora Estate Pockets"          | `off-market-trends-aurora-estate-pockets`     |

## Description rules

- One or two complete sentences ending with a period.
- Under 160 characters total (Google SERP cutoff is ~158).
- No em-dashes, no markdown formatting.
- Restate the post's actual angle. Don't tease ("Find out what's
  happening in King City!"); state ("King City detached sales rose
  18% YoY in Q1 2026. Here's the demand and supply behind the move.").
- The description is reused for Open Graph and Twitter cards, so
  treat it as the post's elevator pitch.
