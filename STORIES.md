# STORIES.md — First2

All user stories follow the format:
**As a [user], I want [thing] so that [reason].**

Acceptance criteria are listed under each story.
Stories are grouped by sprint. Sprints 1–4 are complete.

Users referenced:
- **Parent** = any user (mom or partner)
- **Mom** = primary expecting/postpartum user
- **Partner** = dad or non-birthing partner

---

## ✅ Sprint 1 — Complete

### S-001 — Journey stage selection
As a parent, I want to tell the app whether I'm expecting or my baby is already here, so that the app knows where I am in my journey.
- Screen shown on first launch only
- Two options: "I'm expecting" / "My baby is here"
- Selection required — no skip
- Stored in localStorage under `userProfile.journeyStage`

### S-002 — Due date / birth date entry
As a parent, I want to enter my expected due date or baby's birth date, so that the app can surface relevant content.
- "I'm expecting" → "When is your baby due?"
- "My baby is here" → "When was your baby born?"
- Stored in localStorage under `userProfile.date`
- Completing date entry lands on Home

### S-003 — Home screen with category cards
As a parent, I want a clear home screen showing the main content categories.
- Three category cards: Items to Buy, Health, Informational Resources
- Tapping a card navigates to that category

### S-004 — Bottom navigation bar
As a parent, I want persistent bottom navigation.
- Tabs: Home, Search, Bookmarks
- Present on all screens except Onboarding
- Active tab visually distinct (terracotta)

### S-005 — Category content list
As a parent, I want to browse all resources within a category.
- Lists all items for the category
- Each card: title, subcategory, description, image, bookmark icon

### S-006 — Subcategory filtering
As a parent, I want to filter by subcategory.
- Horizontally scrollable subcategory pill filters
- "All" pill always present and default
- Active pill is visually distinct

### S-009 — Content card detail view
As a parent, I want to tap a card to see full details.
- Bottom sheet modal with full title, description, image, tags, link
- "Visit resource" opens external link
- Bookmark button present

### S-010 — Global search
As a parent, I want to search across all content.
- Client-side via Fuse.js
- Results appear as user types
- Empty state for no results

### S-011 — Search result highlighting
As a parent, I want to see which part of a result matched my search.
- Matched text highlighted in terracotta at low opacity
- Minimum 2 character query before highlighting applies

### S-012 — Bookmark a resource
As a parent, I want to bookmark any resource with one tap.
- Outline = not saved, filled = saved
- Persisted in localStorage

### S-013 — View all bookmarks
As a parent, I want to see all my saved resources in one place.
- Bookmarks tab shows saved items as content cards
- Grouped by category
- Empty state if none saved

### S-014 — Remove a bookmark
As a parent, I want to remove a bookmark I no longer need.
- Tapping filled icon removes immediately
- No confirmation dialog

### S-017 — Mobile-first responsive layout
All layouts designed for 375px minimum. Touch targets ≥ 44px. No horizontal scroll (except subcategory pills).

---

## ✅ Sprint 2 — Complete (partial — S-007, S-008, S-015, S-016 carried to Sprint 5)

### S-018 — Loading and empty states
As a parent, I want clear feedback when content is loading or a section is empty.
- Skeleton loaders while content renders
- Empty states for Bookmarks, Search, filtered category with no matches

---

## ✅ Sprint 3 — Complete

### S-019 — PWA installability
As a parent, I want to install First2 on my phone's home screen.
- Valid web manifest (name, icons, theme color)
- Service worker registered for basic offline support
- "Add to Home Screen" works on iOS Safari and Android Chrome

### S-020 — Subcategory validation script
Validation script warns if any item's `subcategory` is not in the allowed list for its `category`.

### S-021 — Fix filter badge dot positioning
Filter badge refactored to robust positioning; visible across all screen sizes.

### S-022 — Extract StageSheet into reusable component
StageSheet extracted to `src/components/StageSheet/StageSheet.jsx`.

### S-023 — Minimum length guard on search highlight regex
Queries under 2 characters return results without highlight applied.

### S-024 — Real images for all content items
All 45 items in `content.json` have populated `imageUrl` via Unsplash with lazy loading and error fallback.

---

## ✅ Sprint 4 — Complete

### S-031 — Add Newsreader + Manrope fonts and update Tailwind config
Stitch typographic and color foundation established. Newsreader for headlines, Manrope for body.

### S-032 — Apply visual refresh (no-line rule, shadows, buttons, spacing)
- Removed 1px borders; replaced with tonal background shifts
- Pill-shaped buttons (rounded-full), terracotta primary
- Soft ambient shadows (32px blur, 6% opacity)
- Increased card border-radius and whitespace

### S-033 — Redesign onboarding: journey selection screen
- Full-screen layout, no bottom nav
- Logo + tagline at top
- Serif headline, illustrated cards with gradient backgrounds
- Stitch design system applied

### S-034 — Redesign onboarding: date picker screen
- Full-screen layout with back arrow
- Inline scroll picker (react-mobile-picker): Month / Day / Year columns
- Sage highlight on selected row, cream background

### F2-30 — PWA app icon (interim)
Icon updated. Still needs professional maskable version (see S-035).

---

## 🔶 Sprint 5 — In Progress

### S-035 — Commission & integrate pro PWA icon (maskable) [F2-35]
**Phase 1 (offline):** Commission Nanobananna for a 1024×1024 full-bleed icon. Safe zone = center 80%.
**Phase 2 (Claude Code):**
- Resize to 192×192, 512×512
- Update `manifest.json` with `"purpose": "maskable any"`
- Regenerate favicon
- [ ] Icon looks native on Android and iOS (no white box artifact)
- [ ] No regression on splash screen

### S-036 — Bug: "Clear filters" button does nothing [F2-36] 🔴 Urgent
Steps to reproduce: apply a filter that returns 0 results → tap "Clear filters" → nothing happens.
- [ ] Button resets all active filters (subcategory, stage, audience) to defaults
- [ ] Content list repopulates immediately
- [ ] Consistent across all category pages and search empty states

### S-037 — Hamburger menu with "Update my journey" link [F2-37]
As a parent (and tester), I want a menu so I can update my journey stage without digging into browser tools.
- [ ] Hamburger icon (☰) in top-left of Home screen header
- [ ] Opens slide-in or bottom drawer menu
- [ ] Single item: "Update my journey" — clears localStorage `userProfile` and navigates to onboarding step 1
- [ ] Dismissible via close button or tap-outside
- [ ] Consistent with Stitch design system (cream bg, sage/terracotta accents, rounded corners)
- [ ] V2 placeholder structure in place (no additional items built)

### S-007 — Audience filtering [F2-11]
As a partner, I want to filter content specifically for dads/partners.
- [ ] Filter options: All, For Mom, For Partners, For Both
- [ ] Available on category and search results pages
- [ ] Filters on `audience` field in content.json
- [ ] Default is "All"
- [ ] Smart default: "For Mom" pre-selected if journeyStage === "expecting" and audience not manually set (reconsider based on data)

### S-008 — Stage filtering [F2-12]
As a parent, I want to filter by journey stage.
- [ ] Filter options: All, Pregnancy, Birth, Newborn, First Year
- [ ] Available on category and search results pages
- [ ] Filters on `stage` field in content.json
- [ ] Default is "All"

### S-015 — Seed content library [F2-19]
As the content manager, I want well-structured content.json with real seeded content.
- [ ] Minimum 5 items per subcategory
- [ ] All items follow the data model (id, title, category, subcategory, tags, description, link, imageUrl, audience, stage)
- [ ] Content is accurate, helpful, friendly in tone
- [ ] Images sourced from Unsplash or product pages

### S-016 — Content JSON validation [F2-20]
As a developer, I want content.json validated on build so malformed entries don't silently break the UI.
- [ ] Validation script checks required fields on `npm run dev` or `npm run build`
- [ ] Console warning (not error) if any item missing required fields
- [ ] Identifies offending item by ID

---

## 📋 Backlog — Sprint 6 (Blog Infrastructure)

### S-038 — Blog route and markdown file structure
Set up `/blog` route and `/content/blog/` folder structure in repo. Define frontmatter schema.

### S-039 — Build-time markdown parsing
Install and configure `gray-matter` + `marked`. Parse blog posts at build time.

### S-040 — Blog list page
Template page listing all blog posts with title, date, excerpt, stage tag.

### S-041 — Blog post page
Template individual post page with full markdown rendering, author, date, FTC disclosure.

### S-042 — Affiliate link pattern + FTC disclosure component
Define how affiliate links are structured (UTM params). Build reusable FTC disclosure banner.

### S-043 — Wire blog into search and bookmarks
Blog posts searchable via Fuse.js. Bookmarkable same as content cards.

---

## 📋 Backlog — Sprint 7 (Content & Monetization)

### S-044 — Write first batch of blog posts
5–10 real `.md` blog posts across journey stages.

### S-045 — Apply for affiliate programs
Amazon Associates, ShareASale, Ergobaby, Lovevery, Tinyhood — apply and get approval.

### S-046 — Replace placeholder affiliate links with real UTM-tagged URLs
Update all content items and blog posts with real affiliate links once approved.

### S-047 — Update content seeds to reference blog posts
Cross-link content cards to related blog posts where relevant.

---

## 📋 Backlog — V2 (Future)

- User accounts + cross-device bookmark sync
- Push notifications for stage milestones
- Profile tab with preferences
- Admin content management UI
- App store submission (iOS + Android via Capacitor or similar)

# First2 — Sprint 7 Stories
## Polish & Personalization

| ID | Title | Status | Size | Priority |
|---|---|---|---|---|
| F2-47 | Add baby name field to onboarding date screen | Todo | S | 1 |
| F2-48 | Gear icon → re-enter onboarding | Todo | S | 2 |
| F2-38 | Baby name + age display (Home header + persistent) | Todo | M | 3 |
| F2-46 | Image audit & cleanup | Todo | M | 4 |
| F2-49 | UI consistency pass | Todo | S | 5 |

---

## F2-47 — Add baby name field to onboarding date screen
**Size:** S | **Priority:** 1 (data foundation for sprint)

**As a** new user completing onboarding,
**I want** to optionally enter my baby's name on the date screen,
**So that** the app can greet me personally throughout my experience.

**Acceptance Criteria:**
- [ ] Optional text input on date picker screen, label: "Baby's name (optional)"
- [ ] Placeholder: "e.g. Lila"
- [ ] Saves to localStorage key `babyName` on submit
- [ ] Pre-fills when user re-enters onboarding
- [ ] Empty = not set, UI falls back to generic copy
- [ ] Max 50 characters, matches existing input styling

---

## F2-48 — Gear icon → re-enter onboarding
**Size:** S | **Priority:** 2

**As a** returning user who wants to update my profile,
**I want** a gear icon in the header that takes me back into onboarding,
**So that** I can update my baby's name, date, or journey stage without needing a separate settings screen.

**Acceptance Criteria:**
- [ ] Lucide `Settings` icon in top-right of app header
- [ ] Navigates to start of onboarding flow
- [ ] Existing localStorage values pre-fill on re-entry
- [ ] On completing onboarding → returns to Home
- [ ] aria-label: "Edit profile"
- [ ] Icon color: Navy #1B2D5B or inherited

---

## F2-49 — Baby name + age display (Home header + persistent)
**Size:** M | **Priority:** 3 | **Depends on:** F2-47

**As a** returning user,
**I want** to see my baby's name and age on the Home screen and in the header,
**So that** the app feels personal and relevant to where I am in my journey.

**Acceptance Criteria:**

Home header:
- [ ] Name set: "Hi, [Name] is [X weeks/months] old 👶"
- [ ] Name not set: "Your baby is [X weeks/months] old 👶"
- [ ] Expecting: "You're [X weeks] along 🌱"
- [ ] Age: weeks if < 12 weeks, months if ≥ 12 weeks

Persistent header:
- [ ] Subtle name or age in app header/nav area
- [ ] No name → age only (e.g. "4 weeks")
- [ ] Responsive — doesn't crowd on small screens

---

## F2-46 — Image audit & cleanup
**Size:** M | **Priority:** 4 (independent)

**As a** user browsing content,
**I want** all post images to load correctly and look polished,
**So that** the app feels production-ready.

**Acceptance Criteria:**
- [ ] All 45 posts reviewed for image field
- [ ] No broken URLs or placeholder images
- [ ] Alt text on all images
- [ ] Posts without images use consistent fallback
- [ ] Audit log of changed posts delivered

---

## F2-49 — UI consistency pass
**Size:** S | **Priority:** 5 (final)

**As a** user navigating the app,
**I want** a consistent visual experience across all screens,
**So that** the app feels polished and intentional.

**Acceptance Criteria:**
- [ ] All screens reviewed: Home, Search, Bookmarks, Post detail, Onboarding
- [ ] Spacing, typography, color tokens consistent throughout
- [ ] No console errors on any screen
- [ ] Tested at iPhone SE + standard viewport
- [ ] Bugs found → new Linear tickets (not fixed in scope)