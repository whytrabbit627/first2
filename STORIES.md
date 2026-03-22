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
> **Status: 🔲 Backlog** (Linear: F2-11)

**As a partner, I want to filter content specifically for dads/partners, so that I can find resources relevant to my role.**

- [ ] Audience filter bar displayed below subcategory pills (stacked layout)
- [ ] Filter options: All, For Mom, For Partner, For Both
- [ ] Filters the content list immediately on selection
- [ ] Applies on both category pages and search results
- [ ] Filters on the `audience` field in content.json
- [ ] Smart default: read `userProfile` from localStorage on mount — default is "All" regardless of journey stage
- [ ] User can override at any time by tapping a different pill

**Sprint:** 2

---

### S-008 — Stage filtering
> **Status: 🔲 Backlog** (Linear: F2-12)

**As a parent, I want to filter content by journey stage (pregnancy, newborn, first year), so that I can find what's relevant to where I am right now.**

- [ ] Stage filter bar displayed below audience filter bar (stacked, third row)
- [ ] Filter options: All, Pregnancy, Newborn, First Year
- [ ] Filters the content list immediately on selection
- [ ] Applies on both category pages and search results
- [ ] Filters on the `stage` field in content.json
- [ ] Smart default: read `userProfile` from localStorage on mount:
  - `journeyStage === "expecting"` → default "Pregnancy"
  - `journeyStage === "here"` AND birth date < 28 days ago → default "Newborn"
  - `journeyStage === "here"` AND birth date ≥ 28 days ago → default "First Year"
  - No localStorage data → default "All"
- [ ] Smart default calculated once on mount — does not recalculate mid-session
- [ ] User can override at any time by tapping a different pill

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
> **Status: 🔲 Backlog** (Linear: F2-15)

**As a parent, I want to see which part of a result matched my search, so that I can quickly confirm it's what I'm looking for.**

- [ ] Matched text highlighted in result cards (title and description fields)
- [ ] Highlight uses terracotta (`#C47B5A`) at 25% opacity as background
- [ ] Leverage Fuse.js `includeMatches: true` to get character-level match indices
- [ ] No highlighting shown when search term is empty

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
> **Status: 🔲 Backlog** (Linear: F2-19)

**As the content manager (me), I want a well-structured content.json with real seeded content across all three categories, so that the app has meaningful content to display at launch.**

- [ ] Minimum 5 items per subcategory at launch
- [ ] All items follow the defined data model (id, title, category, subcategory, tags, description, link, imageUrl, audience, stage)
- [ ] `audience` values: `"mom"` | `"partner"` | `"both"`
- [ ] `stage` values: `"pregnancy"` | `"newborn"` | `"first-year"` | `"all"`
- [ ] Content is accurate, warm in tone, and genuinely useful
- [ ] Images use placeholder URLs (Unsplash or similar) in V1 — real images in V2

**Sprint:** 2

---

### S-016 — Content JSON validation
> **Status: 🔲 Backlog** (Linear: F2-20)

**As a developer, I want the content.json to be validated against the schema on build, so that malformed entries don't silently break the UI.**

- [ ] A simple Node.js validation script (`scripts/validate-content.js`) checks required fields
- [ ] Script runs as part of `npm run dev` and `npm run build` via a `prebuild` / `predev` npm hook
- [ ] Logs a console warning (not error) for each item missing required fields — does not block the build
- [ ] Warning message identifies the offending item by its `id`
- [ ] Required fields checked: `id, title, category, subcategory, description, link, audience, stage`

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
> **Status: 🔲 Backlog** (Linear: F2-22)

**As a parent, I want clear feedback when content is loading or a section is empty, so that the app never feels broken.**

**Priority (Sprint 2):**
- [ ] Search no-results: `SearchX` icon + "No results for '[term]'" + "Try different keywords or browse by category"
- [ ] Bookmarks empty: `Bookmark` icon + "Nothing saved yet" + "Tap the bookmark icon on any resource to save it here."

**Stretch (Sprint 2 if time allows):**
- [ ] Category no filter match: `FilterX` icon + "No matches for your filters" + "Clear filters" link that resets all filters to All

**Deferred to Sprint 3:**
- [ ] Skeleton loaders while content.json loads on first paint

**Sprint:** 2

---

### S-019 — PWA installability (stretch)
> **Status: 🔲 Backlog** (Linear: F2-23)

**As a parent, I want to install First2 on my phone's home screen, so that it feels like a real app without going through an app store.**

- [ ] App has a valid web manifest (name, icons, theme color)
- [ ] Service worker registered for basic offline support
- [ ] "Add to Home Screen" prompt works on iOS Safari and Android Chrome
- [ ] Splash screen uses First2 logo and sage green background

**Sprint:** 3 (stretch)

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

### Sprint 2 — Depth + content
| ID | Story | Status |
|----|-------|--------|
| S-007 | Audience filtering (smart default from localStorage) | 🔲 Backlog |
| S-008 | Stage filtering (smart default from localStorage) | 🔲 Backlog |
| S-011 | Search result highlighting | 🔲 Backlog |
| S-015 | Seed content library | 🔲 Backlog |
| S-016 | Content JSON validation | 🔲 Backlog |
| S-018 | Loading and empty states | 🔲 Backlog |

### Sprint 3 — Polish + stretch
| ID | Story | Status |
|----|-------|--------|
| S-019 | PWA installability | 🔲 Backlog |
| TBD | V2 features (admin panel, accounts, personalization, affiliate links) | — |