# Sprint 6 Stories — Content as Markdown Pages

**Theme:** Every content item gets its own URL, page, and SEO foundation  
**Sprint goal:** Replace content.json as the source of truth with markdown files. Card list/filter/search experience unchanged. Each item now has a routable `/posts/:slug` page. Modal gains affiliate CTA placeholder + "Read Full Article" link.  
**Parallel tracks:** Dev (S-049–S-053) + Content (S-054–S-055) run simultaneously.

---

## Dev Track

---

### F2-39 · S-049 — Markdown folder structure + frontmatter schema

**Type:** Tech  
**Priority:** High (blocks everything else)

**As a developer, I want a defined folder structure and frontmatter schema for markdown posts, so that the build pipeline and app have a consistent contract to work against.**

#### Acceptance Criteria
- [ ] `/src/content/posts/` directory created
- [ ] Frontmatter schema documented in `/src/content/README.md` with all required and optional fields:
  - `title` (string, required)
  - `slug` (string, required — must match filename)
  - `category` (string, required — "items" | "health" | "resources")
  - `subcategory` (string, required)
  - `stage` (string, required — "pregnancy" | "newborn" | "first-year" | "all")
  - `audience` (string, required — "parents" | "partners" | "both")
  - `summary` (string, required — 1–2 sentences, shown on cards)
  - `tags` (array, optional)
  - `affiliateUrl` (string, optional — empty for Sprint 6)
  - `affiliateLabel` (string, optional — e.g. "Shop on Amazon", empty for Sprint 6)
  - `imageUrl` (string, optional — Unsplash URL)
  - `publishedAt` (date string, required — YYYY-MM-DD)
  - `draft` (boolean, required — true = excluded from build)
- [ ] Existing content validation script (`scripts/validate-content.js`) updated to also validate any `.md` files present against the schema
- [ ] 1 example post committed as reference (can be a placeholder — real content comes in S-054)

**Notes:** The slug must match the filename exactly (e.g. `your-guide-to-white-noise.md` → slug: `your-guide-to-white-noise`). This will be enforced by the build script in S-050.

---

### F2-40 · S-050 — Build script: .md files → blog-index.json

**Type:** Tech  
**Priority:** High (blocks S-051 and S-053)

**As a developer, I want a build-time script that reads all markdown posts and generates a blog-index.json, so that the app has a single generated source of truth that replaces content.json.**

#### Acceptance Criteria
- [ ] `scripts/build-posts.js` created
- [ ] Script reads all `.md` files in `/src/content/posts/`
- [ ] Parses YAML frontmatter using `gray-matter`
- [ ] Calculates reading time using `reading-time` library
- [ ] Converts markdown body to HTML using `marked`
- [ ] Writes two outputs:
  - `/public/blog-index.json` — array of all post metadata (no body), sorted by `publishedAt` desc
  - `/public/posts/:slug.json` — one file per post, containing metadata + rendered HTML body
- [ ] Posts with `draft: true` are excluded from both outputs
- [ ] Script validates that each post's `slug` matches its filename — throws a clear error if not
- [ ] Script added to `prebuild` hook in `package.json` (runs after existing content validator)
- [ ] `npm run build` completes cleanly with example post from S-049

**New dependencies to install:**
```
npm install gray-matter marked reading-time
```

**blog-index.json shape:**
```json
{
  "generatedAt": "2026-03-01T00:00:00Z",
  "posts": [
    {
      "slug": "your-guide-to-white-noise",
      "title": "Your Guide to White Noise Machines",
      "category": "items",
      "subcategory": "sound-machines",
      "stage": "newborn",
      "audience": "parents",
      "summary": "Short teaser shown on cards",
      "tags": ["sleep", "newborn", "gear"],
      "affiliateUrl": "",
      "affiliateLabel": "",
      "imageUrl": "https://images.unsplash.com/...",
      "readingTime": "4 min read",
      "publishedAt": "2026-03-01",
      "draft": false
    }
  ]
}
```

---

### F2-41 · S-051 — Swap app data source from content.json to blog-index.json

**Type:** Tech  
**Priority:** High (validates the pipeline end-to-end)

**As a developer, I want the app to load content from blog-index.json instead of the static content.json, so that markdown files become the source of truth without changing the user-facing experience.**

#### Acceptance Criteria
- [ ] Wherever content is currently imported/fetched (likely a context, hook, or page), replace with a `fetch('/blog-index.json')` call
- [ ] Card list, subcategory pill filtering, stage filter, audience filter, and search (Fuse.js) all work identically to before
- [ ] Bookmarks use `slug` as the stable identifier (replacing whatever ID was used before — localStorage reset is acceptable, no migration needed)
- [ ] `content.json` is **not deleted yet** — kept as reference until Sprint 6 is fully merged
- [ ] Smoke test: browse all three categories, apply filters, run a search — all work correctly

**Notes:** This story is intentionally minimal. The goal is just data source swap with zero visible UX change. If any filter/search logic breaks, fix it here before moving to S-052.

---

### F2-42 · S-052 — New route: `/posts/:slug` post page

**Type:** Tech  
**Priority:** High

**As a parent, I want to read a full article about a resource, so that I can get detailed guidance before making a decision.**

#### Acceptance Criteria
- [ ] New route `/posts/:slug` added to React Router config
- [ ] New page component `src/pages/PostPage/PostPage.jsx` created
- [ ] Page fetches `/public/posts/:slug.json` on mount
- [ ] Page renders:
  - Hero image (full-width, sourced from `imageUrl` frontmatter field)
  - Category + subcategory label (pill style, matching app design system)
  - Title (Newsreader serif, h1)
  - Reading time + publish date (Manrope, muted)
  - Rendered markdown body (Manrope body text, proper heading hierarchy)
  - Affiliate CTA section at bottom (placeholder state — see below)
  - Back button (top-left, returns to previous page via `navigate(-1)`)
- [ ] Affiliate CTA section (placeholder for Sprint 6):
  - Renders only if `affiliateUrl` is non-empty (hidden for all Sprint 6 posts)
  - Design: terracotta pill button with `affiliateLabel` text — ready to wire up in Sprint 7
- [ ] 404 / loading state handled gracefully if slug not found
- [ ] Page uses First2 design system (sage/terracotta/navy/cream, same Tailwind tokens)
- [ ] Reading layout: max-width constrained for readability (~680px), centered, adequate padding

**Back navigation note:** Use `navigate(-1)` from React Router so the back button always returns to wherever the user came from (category list, search results, bookmarks). Do NOT hardcode a destination.

---

### F2-43 · S-053 — Update DetailModal: add "Read Full Article" link

**Type:** Tech  
**Priority:** Medium

**As a parent, I want a clear path from the quick-view modal to the full article, so that I can get more detail when I want it.**

#### Acceptance Criteria
- [ ] DetailModal retains its current layout and primary CTA button
- [ ] Primary CTA button text updated to "Learn More" (placeholder for affiliate link — will be wired in Sprint 7)
- [ ] New secondary link added below the primary button: "Read the full guide →"
- [ ] Tapping "Read the full guide →" closes the modal and navigates to `/posts/:slug`
- [ ] If a post's `affiliateUrl` is empty (all Sprint 6 posts), the primary "Learn More" button is either hidden or shown as disabled/greyed — pick the cleaner option and document the decision
- [ ] Visual hierarchy is clear: affiliate CTA is primary, "Read full guide" is secondary (smaller, text link style)

---

## Content Track

*(Runs in parallel with dev track — content ready to drop in before S-051 smoke test)*

---

### F2-44 · S-054 — Claude AI drafts all 45 markdown posts

**Type:** Content  
**Priority:** High

**As the content manager, I want Claude AI to draft all 45 markdown posts from the existing content.json items, so that I have a complete set of posts ready to review and edit.**

#### Acceptance Criteria
- [ ] All 45 items in `content.json` have a corresponding `.md` file in `/src/content/posts/`
- [ ] Each file has complete, valid frontmatter matching the schema from S-049
- [ ] Each file has a full article body (minimum 300 words per post, aim for 400–600)
- [ ] Tone matches First2 brand: warm, credible, practical — not clinical or cutesy
- [ ] Hero image URLs sourced from Unsplash (one thematic image per subcategory — posts within same subcategory share a hero)
- [ ] `affiliateUrl` and `affiliateLabel` fields present but empty in all posts
- [ ] `draft: false` on all posts (they're real content, just not yet reviewed)
- [ ] Drafting done in 3 Claude.ai sessions (one per category: Items, Health, Resources)

**Process:**
1. Open Claude.ai
2. Paste the relevant items from `content.json` for that category
3. Prompt: "Using these content items as source material, generate a markdown blog post for each one following this frontmatter schema: [paste schema]. Tone: warm, credible, practical. Length: 400–600 words per post. Use Unsplash URLs for imageUrl. Leave affiliateUrl and affiliateLabel empty."
4. Save output files to `/src/content/posts/`
5. Repeat for each category

---

### F2-45 · S-055 — PM review + content sign-off

**Type:** Content  
**Priority:** High

**As the product owner, I want to review and approve all 45 drafted posts before they ship, so that the content is accurate, on-brand, and something I'm proud to put in front of real users.**

#### Acceptance Criteria
- [ ] All 45 posts read through at least once
- [ ] Tone and accuracy checked (flag anything that sounds off or factually questionable)
- [ ] Any posts that need edits are updated directly in the `.md` files
- [ ] At least 5 posts are "hero quality" (fully polished, could be shared externally)
- [ ] Sign-off confirmed: PM is happy to merge to main

**Notes:** This is the last gate before merging Sprint 6. Don't rush it — this content is the foundation for SEO and affiliate monetization. Getting it right now saves rework in Sprint 7.

---

## Definition of Done — Sprint 6

- [ ] All 45 `.md` files committed to `/src/content/posts/`
- [ ] `npm run build` succeeds cleanly (build-posts script runs, no errors)
- [ ] `/posts/:slug` renders correctly for any post
- [ ] Card list, filtering, and search behave identically to Sprint 5
- [ ] DetailModal shows "Read the full guide →" link
- [ ] Affiliate CTA section exists on PostPage (hidden/placeholder — no live URLs)
- [ ] `affiliateUrl` and `affiliateLabel` in frontmatter schema (Sprint 7 ready)
- [ ] Back button returns user to their previous view (not hardcoded destination)
- [ ] `draft: true` posts excluded from build index
- [ ] `content.json` kept in repo (not deleted until Sprint 7 confirms stability)
- [ ] Deployed to Vercel, smoke tested on mobile

---

## Sprint 6 Story Summary

| Linear ID | Story ID | Title | Type | Track |
|-----------|----------|-------|------|-------|
| F2-39 | S-049 | Markdown folder structure + frontmatter schema | Tech | Dev |
| F2-40 | S-050 | Build script: .md → blog-index.json | Tech | Dev |
| F2-41 | S-051 | Swap app data source to blog-index.json | Tech | Dev |
| F2-42 | S-052 | New route: /posts/:slug post page | Tech | Dev |
| F2-43 | S-053 | Update DetailModal: add "Read Full Article" link | Tech | Dev |
| F2-44 | S-054 | Claude AI drafts all 45 markdown posts | Content | Content |
| F2-45 | S-055 | PM review + content sign-off | Content | Content |

**Recommended build order:** S-049 → S-050 → S-054 (content drafting starts here, in parallel) → S-051 → S-052 → S-053 → S-055 (sign-off) → merge.
