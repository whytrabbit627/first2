# STORIES.md — First2

All user stories follow the format:
**As a [user], I want [thing] so that [reason].**

Acceptance criteria are listed under each story.
Stories are grouped by feature area and tagged with a suggested sprint.

Users referenced:
- **Parent** = any user (mom or partner)
- **Mom** = primary expecting/postpartum user
- **Partner** = dad or non-birthing partner

---

## Feature Area 1: Onboarding

### S-001 — Journey stage selection
> **Status: ✅ Done** (Linear: F2-5)

**As a parent, I want to tell the app whether I'm expecting or my baby is already here, so that the app knows where I am in my journey.**

- [x] Screen is shown on first launch only
- [x] Two clear options: "I'm expecting" and "My baby is here"
- [x] Selection is required — no skip option
- [x] Selection is stored in localStorage under `userProfile.journeyStage`
- [x] Tapping either option advances to the date input screen

**Sprint:** 1

---

### S-002 — Due date / birth date entry
> **Status: ✅ Done** (Linear: F2-6)

**As a parent, I want to enter my expected due date or baby's birth date, so that the app can surface relevant content in the future.**

- [x] "I'm expecting" path shows a date picker labeled "When is your baby due?"
- [x] "My baby is here" path shows a date picker labeled "When was your baby born?"
- [x] Date is required to proceed
- [x] Date is stored in localStorage (`userProfile.expectedDueDate` or `userProfile.actualBirthDate`)
- [x] On submit, user lands on Home screen
- [x] Onboarding is not shown again on subsequent launches

**Sprint:** 1

---

## Feature Area 2: Navigation & Home

### S-003 — Home screen with category cards
> **Status: ✅ Done** (Linear: F2-7)

**As a parent, I want to see the three main content categories clearly on the home screen, so that I can quickly find what I'm looking for.**

- [x] Home screen displays three category cards: Items to Buy, Health, Informational Resources
- [x] Each card shows category name, a short descriptor, and a relevant icon
- [x] Tapping a card navigates to that category's content list
- [x] Design uses First2 color palette (sage, terracotta, navy, cream)

**Sprint:** 1

---

### S-004 — Bottom navigation bar
> **Status: ✅ Done** (Linear: F2-8)

**As a parent, I want persistent navigation at the bottom of the screen, so that I can move between sections without losing my place.**

- [x] Bottom nav is present on all screens except Onboarding
- [x] Four tabs: Home, Search, Bookmarks, (reserved for V2: Profile)
- [x] Active tab is visually distinct (terracotta accent)
- [x] Nav is mobile-friendly with tap targets ≥ 44px

**Sprint:** 1

---

## Feature Area 3: Content Browsing

### S-005 — Category content list
> **Status: ✅ Done** (Linear: F2-9)

**As a parent, I want to browse all resources within a category, so that I can explore everything available in one area.**

- [x] Category page displays all content cards for that category
- [x] Each card shows: title, subcategory label, short description, thumbnail image, bookmark icon
- [x] Cards are scrollable in a clean vertical list
- [x] Category name and item count shown in page header

**Sprint:** 1

---

### S-006 — Subcategory filtering
> **Status: ✅ Done** (Linear: F2-10)

**As a parent, I want to filter content by subcategory (e.g. "Hospital Bag" within Items to Buy), so that I can narrow down to exactly what I need.**

- [x] Horizontally scrollable subcategory pill filters appear at top of category page
- [x] Tapping a pill filters the list to that subcategory only
- [x] "All" pill is always present and selected by default
- [x] Active filter pill is visually distinct (terracotta fill)
- [x] Filter state resets when leaving and re-entering the page

**Sprint:** 1

---

### S-007 — Audience filtering
> **Status: ❌ Cut** — removed from V1. Audience filter row added then removed during Sprint 2 due to UI complexity. Revisit in V2.

**Sprint:** V2

---

### S-008 — Stage filtering
> **Status: ✅ Done** (Linear: F2-12)

**As a parent, I want to filter content by journey stage (pregnancy, newborn, first year), so that I can find what's relevant to where I am right now.**

- [x] Stage filter accessible via "Filter" button in category page header
- [x] Filter button shows a terracotta dot badge when a non-default stage is active
- [x] Tapping Filter opens a bottom sheet with stage options: All, Pregnancy, Newborn, First Year
- [x] Tapping a stage pill filters the list immediately and closes the sheet
- [x] Applies on category pages (search page deferred to V2)
- [x] Filters on the `stage` field in content.json
- [x] Smart default: read `userProfile` from localStorage on mount:
  - `journeyStage === "expecting"` → default "Pregnancy"
  - `journeyStage === "here"` AND birth date < 28 days ago → default "Newborn"
  - `journeyStage === "here"` AND birth date ≥ 28 days ago → default "First Year"
  - No localStorage data → default "All"
- [x] Smart default calculated once on mount — does not recalculate mid-session
- [x] User can override at any time by tapping a different pill

**Sprint:** 2

---

### S-009 — Content card detail view
> **Status: ✅ Done** (Linear: F2-13)

**As a parent, I want to tap on a resource card to see full details before visiting the link, so that I can decide if it's worth opening.**

- [x] Tapping a card opens a detail view (modal or page)
- [x] Detail view shows: full title, full description, image, tags, audience, stage, source link
- [x] "Visit resource" button opens external link in new tab / browser
- [x] Bookmark button present on detail view
- [x] Easy back navigation

**Sprint:** 1

---

## Feature Area 4: Search

### S-010 — Global search
> **Status: ✅ Done** (Linear: F2-14)

**As a parent, I want to search across all content from anywhere in the app, so that I can find a specific resource quickly without browsing.**

- [x] Search bar accessible from bottom nav (Search tab)
- [x] Search runs client-side via Fuse.js across title, description, tags, subcategory fields
- [x] Results appear as user types (no submit button required)
- [x] Results display as standard content cards
- [x] Empty state shown when no results found ("No results for X — try different keywords")
- [x] Search clears on tab exit

**Sprint:** 1

---

### S-011 — Search result highlighting
> **Status: ✅ Done** (Linear: F2-15)

**As a parent, I want to see which part of a result matched my search, so that I can quickly confirm it's what I'm looking for.**

- [x] Matched text highlighted in result cards (title and description fields)
- [x] Highlight uses terracotta (`#C47B5A`) at 25% opacity as background
- [x] Regex-based highlighting on exact query string — no character-scatter noise
- [x] No highlighting shown when search term is empty

**Sprint:** 2

---

## Feature Area 5: Bookmarks

### S-012 — Bookmark a resource
> **Status: ✅ Done** (Linear: F2-16)

**As a parent, I want to bookmark any resource with one tap, so that I can save it to come back to later.**

- [x] Bookmark icon (outline = not saved, filled = saved) on every content card and detail view
- [x] Tapping toggles bookmark state immediately
- [x] Bookmark state persisted in localStorage
- [x] Visual feedback on tap (small animation or color change)

**Sprint:** 1

---

### S-013 — View all bookmarks
> **Status: ✅ Done** (Linear: F2-17)

**As a parent, I want to see all my saved resources in one place, so that I can quickly return to things I've flagged.**

- [x] Bookmarks tab shows all saved items as content cards
- [x] Items grouped by category (Items, Health, Resources)
- [x] Empty state if no bookmarks yet ("Nothing saved yet — tap the bookmark icon on any resource")
- [x] Removing a bookmark from this view removes it immediately from the list

**Sprint:** 1

---

### S-014 — Remove a bookmark
> **Status: ✅ Done** (Linear: F2-18)

**As a parent, I want to remove a bookmark I no longer need, so that my saved list stays relevant.**

- [x] Bookmark icon on saved cards is filled/active
- [x] Tapping it removes the item from bookmarks immediately
- [x] No confirmation dialog required (low-stakes action)

**Sprint:** 1

---

## Feature Area 6: Content Data

### S-015 — Seed content library
> **Status: ✅ Done** (Linear: F2-19)

**As the content manager (me), I want a well-structured content.json with real seeded content across all three categories, so that the app has meaningful content to display at launch.**

- [x] 45 items across 9 subcategories (5 per subcategory)
- [x] All items follow the defined data model (id, title, category, subcategory, tags, description, link, imageUrl, audience, stage)
- [x] `audience` values: `"mom"` | `"partner"` | `"both"` (scalar strings)
- [x] `stage` values: `"pregnancy"` | `"newborn"` | `"first-year"` | `"all"` (scalar strings)
- [x] Content is accurate, warm in tone, and genuinely useful

**Sprint:** 2

---

### S-016 — Content JSON validation
> **Status: ✅ Done** (Linear: F2-20)

**As a developer, I want the content.json to be validated against the schema on build, so that malformed entries don't silently break the UI.**

- [x] `scripts/validate-content.js` checks required fields and valid enum values
- [x] Runs automatically via `predev` and `prebuild` npm hooks
- [x] Logs console warnings (not errors) — does not block the build
- [x] Identifies offending items by `id`
- [x] Validates: `id, title, category, subcategory, description, link, audience, stage`

**Sprint:** 2

---

## Feature Area 7: UI Polish & Mobile

### S-017 — Mobile-first responsive layout
> **Status: ✅ Done** (Linear: F2-21)

**As a parent using my phone, I want the app to feel native and comfortable on a small screen, so that I can use it one-handed while doing other things.**

- [x] All layouts designed for 375px width minimum
- [x] Touch targets ≥ 44px throughout
- [x] No horizontal scroll anywhere (except subcategory pills — intentional)
- [x] Text is legible at default mobile font sizes
- [x] Tested on iPhone Safari and Android Chrome

**Sprint:** 1

---

### S-018 — Loading and empty states
> **Status: ✅ Done** (Linear: F2-22)

**As a parent, I want clear feedback when content is loading or a section is empty, so that the app never feels broken.**

- [x] Search no-results: `SearchX` icon + "No results for '[term]'" + "Try different keywords or browse by category"
- [x] Bookmarks empty: `Bookmark` icon + "Nothing saved yet" + "Tap the bookmark icon on any resource to save it here."
- [x] Category no filter match: `FilterX` icon + "No matches for your filters" + "Clear filters" link

**Sprint:** 2

---

### S-019 — PWA installability
> **Status: 🔲 Backlog** (Linear: F2-23)

**As a parent, I want to install First2 on my phone's home screen, so that it feels like a real app without going through an app store.**

- [ ] App has a valid web manifest (`name: "First2"`, `theme_color: "#B5C9B0"`, correct icons)
- [ ] `logo-icon.png` exported at 192×192 and 512×512 for manifest icons
- [ ] Service worker registered for basic offline support (cache-first for static assets)
- [ ] "Add to Home Screen" prompt works on iOS Safari and Android Chrome
- [ ] Splash screen uses First2 logo and sage green background

**Sprint:** 3

---

## Feature Area 8: Tech Debt (Sprint 3)

### S-020 — Add subcategory validation to validate-content.js
> **Status: 🔲 Backlog** (Linear: F2-24)

**As a developer, I want subcategory values validated on build, so that typos in subcategory slugs don't silently break pill filtering.**

- [ ] Define allowed subcategory list per category in the validation script
- [ ] Warn if any item's `subcategory` value is not in the allowed list for its `category`
- [ ] Warning message identifies the offending item by `id`
- [ ] Also warn if any item has an empty or missing `imageUrl` field

**Sprint:** 3

---

### S-021 — Fix filter badge dot positioning on Filter button
> **Status: 🔲 Backlog** (Linear: F2-25)

**As a developer, I want the active-filter badge to be robustly positioned, so that it doesn't mis-align if the button layout shifts.**

- [ ] Refactor badge to use inline indicator rather than absolute positioning
- [ ] Badge remains visible and correctly placed across all screen sizes

**Sprint:** 3

---

### S-022 — Extract StageSheet into a reusable component
> **Status: 🔲 Backlog** (Linear: F2-26)

**As a developer, I want the StageSheet extracted from Category.jsx, so that it can be reused if a second filter sheet is added.**

- [ ] Extract to `src/components/StageSheet/StageSheet.jsx`
- [ ] Accepts props: `isOpen`, `onClose`, `activeStage`, `onSelect`
- [ ] `Category.jsx` imports and uses it with no behaviour change

**Sprint:** 3

---

### S-023 — Add minimum length guard to search highlight regex
> **Status: 🔲 Backlog** (Linear: F2-27)

**As a parent, I want search highlighting to only appear for meaningful queries, so that single-character searches don't highlight everything.**

- [ ] Highlighting only applies when `query.length >= 2`
- [ ] Queries of 1 character return results normally with no highlighting

**Sprint:** 3

---

### S-024 — Source and add real images for all content items
> **Status: 🔲 Backlog** (Linear: F2-29)

**As a parent, I want to see real images on content cards, so that the app feels polished and trustworthy — and so stakeholder feedback is based on real visual content.**

- [ ] All 45 items in `content.json` have a populated `imageUrl` field
- [ ] Images sourced from Unsplash (free, no attribution required) using curated keyword URLs
- [ ] URL format: `https://source.unsplash.com/featured/800x600/?{keyword}` — no API key required
- [ ] Each item has a distinct, contextually relevant keyword (no duplicates across items)
- [ ] `validate-content.js` warns if any item has an empty or missing `imageUrl` (covered in S-020 AC)
- [ ] All category pages render real images on content cards — no placeholder divs remain
- [ ] Images display correctly in both card thumbnail and detail view

**Notes:**
- `source.unsplash.com/featured/?{keyword}` is a redirect URL — it resolves to a real Unsplash photo at runtime. No API key, no rate limits for a content-sized app.
- The curated keyword map (45 items × 1 keyword each) is maintained in the sprint prompts doc for reproducibility.
- V2 upgrade path: swap to Unsplash API or self-hosted images if more editorial control is needed.

**Sprint:** 3 (pulled forward from V2 — needed for meaningful feedback on V1)

---

## Story Summary by Sprint

### Sprint 1 — Core experience (MVP) ✅ Complete
| ID | Story | Status |
|----|-------|--------|
| S-001 | Journey stage selection | ✅ Done |
| S-002 | Due date / birth date entry | ✅ Done |
| S-003 | Home screen with category cards | ✅ Done |
| S-004 | Bottom navigation bar | ✅ Done |
| S-005 | Category content list | ✅ Done |
| S-006 | Subcategory filtering | ✅ Done |
| S-009 | Content card detail view | ✅ Done |
| S-010 | Global search | ✅ Done |
| S-012 | Bookmark a resource | ✅ Done |
| S-013 | View all bookmarks | ✅ Done |
| S-014 | Remove a bookmark | ✅ Done |
| S-017 | Mobile-first responsive layout | ✅ Done |

### Sprint 2 — Depth + content ✅ Complete
| ID | Story | Status |
|----|-------|--------|
| S-007 | Audience filtering | ❌ Cut (V2) |
| S-008 | Stage filtering (bottom sheet) | ✅ Done |
| S-011 | Search result highlighting | ✅ Done |
| S-015 | Seed content library | ✅ Done |
| S-016 | Content JSON validation | ✅ Done |
| S-018 | Loading and empty states | ✅ Done |

### Sprint 3 — Polish + PWA + Real Images
| ID | Story | Status |
|----|-------|--------|
| S-023 | Search highlight min length guard | 🔲 Backlog |
| S-020 | Subcategory validation (+ imageUrl check) | 🔲 Backlog |
| S-021 | Filter badge positioning | 🔲 Backlog |
| S-022 | Extract StageSheet component | 🔲 Backlog |
| S-024 | Real images for all content items | 🔲 Backlog |
| S-019 | PWA installability | 🔲 Backlog |

### V2 — Future sprints
| ID | Story | Status |
|----|-------|--------|
| TBD | User accounts + cross-device bookmarks | — |
| TBD | Affiliate links | — |
| TBD | Smart personalisation | — |
| TBD | Admin CMS panel | — |

# Sprint 4: Stitch Design Refresh

**Goal:** Apply the Stitch design system to give First2 a polished, editorial feel.

**Build order:** Stories should be implemented in this sequence (each builds on the previous).

---

## S-031 — Add Newsreader + Manrope fonts and update Tailwind config
**Linear:** F2-31 | **Priority:** High | **Status:** Backlog

**Goal:** Establish the typographic and color foundation from the Stitch design system.

### Acceptance Criteria
- [ ] Add Google Fonts: Newsreader (serif, for headlines) + Manrope (sans, for body)
- [ ] Update `tailwind.config.js` with Stitch color tokens (surface hierarchy, primary/secondary refinements)
- [ ] Set Newsreader as the font for h1, h2, h3 elements
- [ ] Set Manrope as the default body font
- [ ] Verify fonts load correctly in dev and production builds

### Technical Notes

**Font import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**Color tokens to add:**
| Token | Hex | Usage |
|-------|-----|-------|
| `surface` | #fcf9f0 | Main background |
| `surface-container` | #f1eee5 | Card backgrounds |
| `surface-container-low` | #f6f3ea | Subtle containers |
| `surface-container-lowest` | #ffffff | Highest emphasis |
| `primary` | #9b3f2b | Primary actions (terracotta) |
| `primary-container` | #bb5640 | Primary hover/container |
| `secondary` | #53643a | Secondary actions (sage) |
| `on-background` | #1c1c17 | Text color (not pure black) |

---

## S-032 — Apply visual refresh (no-line rule, shadows, buttons, spacing)
**Linear:** F2-32 | **Priority:** High | **Status:** Backlog

**Goal:** Apply the Stitch "No-Line Rule" and surface philosophy across the app.

### Acceptance Criteria
- [ ] Remove 1px borders throughout — use tonal background shifts instead
- [ ] Update button styles to pill-shaped (border-radius: 9999px), terracotta primary
- [ ] Apply soft ambient shadows (32px blur, 6% opacity, tinted not pure black)
- [ ] Increase border-radius on cards to 2-3rem for "huggable" feel
- [ ] Increase whitespace/padding throughout for editorial feel
- [ ] Replace any pure black (#000) text with on-background (#1c1c17)

### Constraint
**Keep existing card/item heights** — we're updating styling, not layout proportions.

### Files likely affected
- `App.css` / `index.css`
- `tailwind.config.js`
- `ContentCard.jsx`
- `BottomNav.jsx`
- Button styles throughout

---

## S-033 — Redesign onboarding: journey selection screen
**Linear:** F2-33 | **Priority:** High | **Status:** Backlog

**Goal:** Redesign the journey selection screen (first onboarding step) to match Stitch design.

### Acceptance Criteria
- [ ] Full-screen layout (no bottom nav during onboarding)
- [ ] First2 logo + tagline at top
- [ ] Serif headline: "Where are you in your journey?"
- [ ] Two side-by-side illustrated cards:
  - Left: "I'm expecting" with pregnant belly illustration (terracotta/peach gradient background)
  - Right: "My baby is here" with baby crib illustration (sage green gradient background)
- [ ] Cards have large border-radius, soft shadows
- [ ] Tapping a card proceeds to the date input screen
- [ ] Warm cream background throughout

### Assets needed
- `pregnant-belly.png` — for "I'm expecting" card
- `baby-crib.png` — for "My baby is here" card

---

## S-034 — Redesign onboarding: date picker screen
**Linear:** F2-34 | **Priority:** Medium | **Status:** Backlog

**Goal:** Redesign the date input screen (second onboarding step) to match Stitch design.

### Acceptance Criteria
- [ ] Full-screen layout with back arrow (no bottom nav)
- [ ] Serif headline: "When was your baby born?" or "When is your baby due?" (based on journey selection)
- [ ] Replace current bottom sheet date picker with inline scroll picker:
  - Three columns: Month, Day, Year
  - Selected row highlighted with soft blue/sage background pill
  - Smooth scroll behavior
- [ ] Pill-shaped terracotta "Next" button at bottom
- [ ] Warm cream background throughout

### Technical Notes
The scroll picker is a custom component — may need to build from scratch or find a lightweight React library. Consider:
- `react-mobile-picker`
- Or custom implementation with CSS scroll-snap

---

## S-030 — Design proper PWA app icon (stretch)
**Linear:** F2-30 | **Priority:** Low | **Status:** Backlog

**Goal:** Make the PWA icon look native/professional on home screens.

### Acceptance Criteria
- [ ] Icon looks native/professional on both iOS and Android home screens
- [ ] Consider maskable icon format for Android adaptive icons

### Options to consider
- Full-bleed icon (hearts fill the whole square, no background box)
- Maskable icon format (Android adaptive icon support)
- Commission a proper app icon design

### Current state
- Icons: `public/icon-192.png`, `public/icon-512.png`
- Generated from `src/assets/logo-icon.png` (575x564, non-square)