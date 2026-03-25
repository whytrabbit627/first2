# Content Posts — Frontmatter Schema

All markdown posts live in `/src/content/posts/`. Each file is a single resource post. The filename must match the `slug` field exactly (e.g. `your-guide-to-white-noise.md` → `slug: your-guide-to-white-noise`).

At build time, `scripts/build-posts.js` reads all `.md` files and generates:
- `/public/blog-index.json` — post metadata array (no body), sorted by `publishedAt` desc
- `/public/posts/:slug.json` — one file per post, metadata + rendered HTML body

Posts with `draft: true` are excluded from both outputs.

---

## Required Fields

| Field | Type | Values / Notes |
|-------|------|----------------|
| `title` | string | Display title shown on cards and post page |
| `slug` | string | Must match filename. URL-safe, kebab-case |
| `category` | string | `"items"` \| `"health"` \| `"resources"` |
| `subcategory` | string | Must match an allowed subcategory for the category (see below) |
| `stage` | string | `"pregnancy"` \| `"newborn"` \| `"first-year"` \| `"all"` |
| `audience` | string | `"mom"` \| `"partner"` \| `"both"` |
| `summary` | string | 1–2 sentences shown on content cards |
| `publishedAt` | string | ISO date `YYYY-MM-DD` |
| `draft` | boolean | `true` = excluded from build outputs |

## Optional Fields

| Field | Type | Notes |
|-------|------|-------|
| `tags` | array | Strings used for search and filtering |
| `imageUrl` | string | Unsplash URL, shown as hero on post page and card thumbnail |
| `affiliateUrl` | string | Leave empty in Sprint 6 — wired up in Sprint 7 |
| `affiliateLabel` | string | e.g. `"Shop on Amazon"` — leave empty in Sprint 6 |

---

## Allowed Subcategories

| Category | Subcategories |
|----------|--------------|
| `items` | `Sleep`, `Feeding`, `Gear` |
| `health` | `Nutrition`, `Mental Health`, `Fitness` |
| `resources` | `Books`, `Apps`, `Classes` |

---

## Example Post

```markdown
---
title: Your Guide to White Noise Machines
slug: your-guide-to-white-noise
category: items
subcategory: Sleep
stage: newborn
audience: both
summary: White noise helps newborns sleep longer by masking household sounds. Here's what to look for and our top picks.
tags: [sleep, newborn, gear, sound machine]
imageUrl: https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80
affiliateUrl: ""
affiliateLabel: ""
publishedAt: 2026-03-24
draft: false
---

Article body goes here in standard markdown...
```

---

## Audience Values

- `"mom"` — content primarily relevant to the birthing parent
- `"partner"` — content primarily relevant to the non-birthing partner
- `"both"` — relevant to either parent

*Note: these values are canonical for V1. Renaming `"mom"` → `"parents"` is planned for a future sprint.*
