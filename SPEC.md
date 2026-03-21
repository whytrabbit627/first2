# SPEC.md — First2

## Elevator Pitch
First2 is a beautifully designed resource hub for expecting and new parents — covering everything from pregnancy through the first year of a baby's life. It is not a tracker. It is a curated, searchable, bookmarkable library of vetted resources organized into three clear categories: things to buy, health guidance, and informational content.

---

## Target Users
- Primary: Expecting mothers AND their partners (equal weight — both audiences are first-class citizens)
- Context: First-time parents who feel overwhelmed by the volume and noise of information online
- Key insight: They don't need more information — they need someone to cut through the noise for them

---

## Core Problem
Expecting and new parents are flooded with information from unreliable, ad-heavy, or overwhelming sources. There is no single beautiful, trustworthy, curated place to go that covers the full journey from pregnancy → birth → first year — for both mom AND partner.

---

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Frontend | React (via Vite) | Component-based, scales to V2 admin panel, industry standard |
| Styling | Tailwind CSS | Utility-first, fast to build clean UI |
| Routing | React Router | Standard SPA routing |
| State | React useState / useContext | Sufficient for V1 (bookmarks, search, filters, onboarding) |
| Content | Local JSON file | Hand-curated, no backend needed in V1 |
| Search | Client-side (Fuse.js) | Lightweight fuzzy search across all content |
| Deployment | Vercel | Auto-deploys on push to main |
| Version Control | GitHub | Source of truth |

---

## Architecture Overview

```
src/
├── data/
│   └── content.json        # All curated content lives here (V1)
├── components/
│   ├── Layout/             # Header, nav, footer
│   ├── ContentCard/        # Individual resource card
│   ├── CategoryView/       # Filtered list by category
│   ├── SearchBar/          # Global search input
│   └── BookmarkButton/     # Toggle bookmark on any card
├── pages/
│   ├── Onboarding.jsx      # First launch: stage + dates (required, no skip)
│   ├── Home.jsx            # Landing / category selector
│   ├── Category.jsx        # Full list for a category
│   ├── Search.jsx          # Search results view
│   └── Bookmarks.jsx       # User's saved items
├── hooks/
│   ├── useBookmarks.js     # Bookmark logic (localStorage)
│   └── useUserProfile.js   # Onboarding state (localStorage)
└── App.jsx
```

---

## Data Model

Each piece of content in `content.json` follows this shape:

```json
{
  "id": "unique-slug",
  "title": "Honest Company Diapers",
  "category": "items",
  "subcategory": "diapers",
  "tags": ["newborn", "essentials", "day-one"],
  "description": "Why you need this and why we recommend it — plain, friendly language.",
  "link": "https://...",
  "imageUrl": "https://...",
  "audience": ["mom", "partner", "both"],
  "stage": ["pregnancy", "birth", "newborn", "first-year"]
}
```

### User Profile (localStorage, V1)
```json
{
  "journeyStage": "expecting" | "baby-here",
  "expectedDueDate": "2025-08-15",
  "actualBirthDate": null,
  "bookmarks": ["id-1", "id-2"]
}
```
Note: `expectedDueDate` and `actualBirthDate` are captured in V1 and used for content personalization in V2.
Cross-device bookmark sync deferred to V2 (requires user accounts).

---

## Onboarding Flow (First Launch)

**Required — no skip option.** Two inputs, shown once, stored in localStorage.

**Path A — "I'm expecting"**
1. Select "I'm expecting"
2. Enter expected due date (required)
3. Land on Home

**Path B — "My baby is here"**
1. Select "My baby is here"
2. Enter baby's birth date (required)
3. Land on Home

> V2 Note: These dates will power smart content surfacing — e.g. suppressing crib content during pregnancy, surfacing sleep training content at ~4 months post-birth.

---

## Content Categories (V1)

### 1. Items to Buy (`category: "items"`)
- Pregnancy comfort (pillows, belly bands, maternity clothing)
- Hospital bag (birth bag essentials for mom, partner, baby)
- Nursery essentials (day-one must-haves)
- Feeding (bottles, breast pumps, nursing pillows, formula prep)
- Diapers + wipes
- Strollers + car seats
- Sleep gear (white noise, sleep sacks, bassinet)
- Postpartum recovery for mom (peri bottles, sitz baths, nursing bras)

### 2. Health (`category: "health"`)
- Foods to eat / avoid during pregnancy
- Foods to eat / avoid during breastfeeding
- Supplements (prenatal vitamins, etc.)
- Exercise — prenatal
- Exercise — postpartum
- Mental health + postpartum depression resources
- Sleep survival for new parents

### 3. Informational Resources (`category: "resources"`)
- Pregnancy + birth (videos, articles)
- Baby 101 (feeding, diapering, bathing)
- For dads + partners
- Birth plan templates
- Finding a pediatrician checklist
- Insurance + admin (what to prepare before baby arrives)
- Postpartum mental health

---

## V1 Feature Set

| Feature | In Scope | Notes |
|---------|----------|-------|
| Onboarding (stage + dates, required) | ✅ | No skip — 2 inputs only |
| Browse by category | ✅ | 3 top-level categories |
| Browse by subcategory | ✅ | Filterable within category |
| Content card (title, description, link, image) | ✅ | |
| Bookmarks | ✅ | localStorage only in V1 |
| Universal search | ✅ | Fuzzy search via Fuse.js |
| Tag filtering | ✅ | |
| Audience filter (mom / partner / both) | ✅ | |
| Stage filter (pregnancy / newborn / first-year) | ✅ | |
| Smart content personalization (based on dates) | ❌ | V2 — data captured in V1 |
| Cross-device bookmark sync | ❌ | V2 — requires user accounts |
| Admin content panel | ❌ | V2 |
| User accounts / auth | ❌ | V2 |
| Affiliate links | ❌ | V2 — requires dedicated research sprint |
| Community / comments | ❌ | V3+ |
| Own video content | ❌ | V2+ |
| PWA (installable) | ⚠️ | Stretch goal V1 |

---

## Design System

### Brand
- **App name:** First2
- **Tagline:** Your Curated Parenting Journey
- **Logo:** Two overlapping hearts forming a "2" — provided as PNG asset

### Color Palette (derived from logo)
| Token | Value | Usage |
|-------|-------|-------|
| Sage green | `#B5C9B0` | Backgrounds, cards, primary surfaces |
| Terracotta | `#C47B5A` | Accent, CTAs, active states, icons |
| Navy | `#1B2D5B` | Primary text, headings |
| Cream | `#FAF8F4` | Page background |
| White | `#FFFFFF` | Cards, elevated surfaces |

### Principles
- Mobile-first — most users will be on their phones
- Warm but not cutesy — useful, not bubbly
- Typography-forward — content is the hero
- V1 goal: beautiful functionality. Further visual polish in V2.

---

## Out of Scope (V1)
- User authentication or accounts
- Backend / database (content lives in JSON)
- Admin CMS panel (content managed by editing JSON directly)
- Smart content personalization (V2)
- Cross-device bookmarks (V2)
- Affiliate links (V2 — separate research sprint)
- Community features (V3+)
- Native mobile app (PWA stretch goal)

---

## Open Questions
_None — all decisions resolved. Ready for STORIES.md._
