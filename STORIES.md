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
**As a parent, I want to tell the app whether I'm expecting or my baby is already here, so that the app knows where I am in my journey.**

- [ ] Screen is shown on first launch only
- [ ] Two clear options: "I'm expecting" and "My baby is here"
- [ ] Selection is required — no skip option
- [ ] Selection is stored in localStorage under `userProfile.journeyStage`
- [ ] Tapping either option advances to the date input screen

**Sprint:** 1

---

### S-002 — Due date / birth date entry
**As a parent, I want to enter my expected due date or baby's birth date, so that the app can surface relevant content in the future.**

- [ ] "I'm expecting" path shows a date picker labeled "When is your baby due?"
- [ ] "My baby is here" path shows a date picker labeled "When was your baby born?"
- [ ] Date is required to proceed
- [ ] Date is stored in localStorage (`userProfile.expectedDueDate` or `userProfile.actualBirthDate`)
- [ ] On submit, user lands on Home screen
- [ ] Onboarding is not shown again on subsequent launches

**Sprint:** 1

---

## Feature Area 2: Navigation & Home

### S-003 — Home screen with category cards
**As a parent, I want to see the three main content categories clearly on the home screen, so that I can quickly find what I'm looking for.**

- [ ] Home screen displays three category cards: Items to Buy, Health, Informational Resources
- [ ] Each card shows category name, a short descriptor, and a relevant icon
- [ ] Tapping a card navigates to that category's content list
- [ ] Design uses First2 color palette (sage, terracotta, navy, cream)

**Sprint:** 1

---

### S-004 — Bottom navigation bar
**As a parent, I want persistent navigation at the bottom of the screen, so that I can move between sections without losing my place.**

- [ ] Bottom nav is present on all screens except Onboarding
- [ ] Four tabs: Home, Search, Bookmarks, (reserved for V2: Profile)
- [ ] Active tab is visually distinct (terracotta accent)
- [ ] Nav is mobile-friendly with tap targets ≥ 44px

**Sprint:** 1

---

## Feature Area 3: Content Browsing

### S-005 — Category content list
**As a parent, I want to browse all resources within a category, so that I can explore everything available in one area.**

- [ ] Category page displays all content cards for that category
- [ ] Each card shows: title, subcategory label, short description, thumbnail image, bookmark icon
- [ ] Cards are scrollable in a clean vertical list
- [ ] Category name and item count shown in page header

**Sprint:** 1

---

### S-006 — Subcategory filtering
**As a parent, I want to filter content by subcategory (e.g. "Hospital Bag" within Items to Buy), so that I can narrow down to exactly what I need.**

- [ ] Horizontally scrollable subcategory pill filters appear at top of category page
- [ ] Tapping a pill filters the list to that subcategory only
- [ ] "All" pill is always present and selected by default
- [ ] Active filter pill is visually distinct (terracotta fill)
- [ ] Filter state resets when leaving and re-entering the page

**Sprint:** 1

---

### S-007 — Audience filtering
**As a partner, I want to filter content specifically for dads/partners, so that I can find resources relevant to my role.**

- [ ] Audience filter options: All, For Mom, For Partners, For Both
- [ ] Filter available on category and search results pages
- [ ] Filters on `audience` field in content.json
- [ ] Default is "All"

**Sprint:** 2

---

### S-008 — Stage filtering
**As a parent, I want to filter content by journey stage (pregnancy, newborn, first year), so that I can find what's relevant to where I am right now.**

- [ ] Stage filter options: All, Pregnancy, Birth, Newborn, First Year
- [ ] Filter available on category and search results pages
- [ ] Filters on `stage` field in content.json
- [ ] Default is "All"

**Sprint:** 2

---

### S-009 — Content card detail view
**As a parent, I want to tap on a resource card to see full details before visiting the link, so that I can decide if it's worth opening.**

- [ ] Tapping a card opens a detail view (modal or page)
- [ ] Detail view shows: full title, full description, image, tags, audience, stage, source link
- [ ] "Visit resource" button opens external link in new tab / browser
- [ ] Bookmark button present on detail view
- [ ] Easy back navigation

**Sprint:** 1

---

## Feature Area 4: Search

### S-010 — Global search
**As a parent, I want to search across all content from anywhere in the app, so that I can find a specific resource quickly without browsing.**

- [ ] Search bar accessible from bottom nav (Search tab)
- [ ] Search runs client-side via Fuse.js across title, description, tags, subcategory fields
- [ ] Results appear as user types (no submit button required)
- [ ] Results display as standard content cards
- [ ] Empty state shown when no results found ("No results for X — try different keywords")
- [ ] Search clears on tab exit

**Sprint:** 1

---

### S-011 — Search result highlighting
**As a parent, I want to see which part of a result matched my search, so that I can quickly confirm it's what I'm looking for.**

- [ ] Matched text is visually highlighted in result cards
- [ ] Highlight color uses terracotta at low opacity

**Sprint:** 2

---

## Feature Area 5: Bookmarks

### S-012 — Bookmark a resource
**As a parent, I want to bookmark any resource with one tap, so that I can save it to come back to later.**

- [ ] Bookmark icon (outline = not saved, filled = saved) on every content card and detail view
- [ ] Tapping toggles bookmark state immediately
- [ ] Bookmark state persisted in localStorage
- [ ] Visual feedback on tap (small animation or color change)

**Sprint:** 1

---

### S-013 — View all bookmarks
**As a parent, I want to see all my saved resources in one place, so that I can quickly return to things I've flagged.**

- [ ] Bookmarks tab shows all saved items as content cards
- [ ] Items grouped by category (Items, Health, Resources)
- [ ] Empty state if no bookmarks yet ("Nothing saved yet — tap the bookmark icon on any resource")
- [ ] Removing a bookmark from this view removes it immediately from the list

**Sprint:** 1

---

### S-014 — Remove a bookmark
**As a parent, I want to remove a bookmark I no longer need, so that my saved list stays relevant.**

- [ ] Bookmark icon on saved cards is filled/active
- [ ] Tapping it removes the item from bookmarks immediately
- [ ] No confirmation dialog required (low-stakes action)

**Sprint:** 1

---

## Feature Area 6: Content Data

### S-015 — Seed content library
**As the content manager (me), I want a well-structured content.json with real seeded content across all three categories, so that the app has meaningful content to display at launch.**

- [ ] Minimum 5 items per subcategory at launch
- [ ] All items follow the defined data model (id, title, category, subcategory, tags, description, link, imageUrl, audience, stage)
- [ ] Content is accurate, friendly in tone, and genuinely useful
- [ ] Images sourced from free/open image sources or product pages

**Sprint:** 2

---

### S-016 — Content JSON validation
**As a developer, I want the content.json to be validated against the schema on build, so that malformed entries don't silently break the UI.**

- [ ] A simple validation script checks required fields on `npm run dev` or `npm run build`
- [ ] Console warning (not error) if any item is missing required fields
- [ ] Identifies the offending item by ID

**Sprint:** 2

---

## Feature Area 7: UI Polish & Mobile

### S-017 — Mobile-first responsive layout
**As a parent using my phone, I want the app to feel native and comfortable on a small screen, so that I can use it one-handed while doing other things.**

- [ ] All layouts designed for 375px width minimum
- [ ] Touch targets ≥ 44px throughout
- [ ] No horizontal scroll anywhere (except subcategory pills — intentional)
- [ ] Text is legible at default mobile font sizes
- [ ] Tested on iPhone Safari and Android Chrome

**Sprint:** 1

---

### S-018 — Loading and empty states
**As a parent, I want clear feedback when content is loading or a section is empty, so that the app never feels broken.**

- [ ] Skeleton loaders shown while content renders
- [ ] Empty states have a helpful message and icon for: Bookmarks, Search results, filtered category with no matches

**Sprint:** 2

---

### S-019 — PWA installability (stretch)
**As a parent, I want to install First2 on my phone's home screen, so that it feels like a real app without going through an app store.**

- [ ] App has a valid web manifest (name, icons, theme color)
- [ ] Service worker registered for basic offline support
- [ ] "Add to Home Screen" prompt works on iOS Safari and Android Chrome
- [ ] Splash screen uses First2 logo and sage green background

**Sprint:** 3 (stretch)

---

## Story Summary by Sprint

### Sprint 1 — Core experience (MVP)
| ID | Story |
|----|-------|
| S-001 | Journey stage selection |
| S-002 | Due date / birth date entry |
| S-003 | Home screen with category cards |
| S-004 | Bottom navigation bar |
| S-005 | Category content list |
| S-006 | Subcategory filtering |
| S-009 | Content card detail view |
| S-010 | Global search |
| S-012 | Bookmark a resource |
| S-013 | View all bookmarks |
| S-014 | Remove a bookmark |
| S-017 | Mobile-first responsive layout |

### Sprint 2 — Depth + content
| ID | Story |
|----|-------|
| S-007 | Audience filtering |
| S-008 | Stage filtering |
| S-011 | Search result highlighting |
| S-015 | Seed content library |
| S-016 | Content JSON validation |
| S-018 | Loading and empty states |

### Sprint 3 — Polish + stretch
| ID | Story |
|----|-------|
| S-019 | PWA installability |
| TBD | V2 features (admin panel, accounts, personalization, affiliate links) |
