# SPEC.md — First2

**Version:** Sprint 5
**Last updated:** March 2026
**Live app:** https://first2-phi.vercel.app
**GitHub:** https://github.com/whytrabbit627/first2

---

## Product Overview

First2 is a curated parenting resource app for expecting and new parents. It surfaces trusted, stage-relevant content across three categories: things to buy, health information, and informational resources. V1 is a read-only content experience — no backend, no auth, no database.

**Tagline:** "Your Curated Parenting Journey"

---

## Design System — Stitch

First2 uses the Stitch design language. Key principles:

**Color palette:**
| Token | Hex | Usage |
|---|---|---|
| Sage green | `#B5C9B0` | Primary brand, accents |
| Terracotta | `#C47B5A` | CTA buttons, active states |
| Navy | `#1B2D5B` | Headers, strong text |
| Cream | `#FAF8F4` | Page backgrounds |

**Typography:**
- Headlines: Newsreader (Google Fonts, serif)
- Body: Manrope (Google Fonts, sans-serif)

**The No-Line Rule:** No 1px borders. Use tonal background shifts (surface hierarchy) or soft ambient shadows instead.

**Elevation:** Shadows use `box-shadow: 0 8px 32px rgba(28,28,23,0.06)` — tinted, not pure black.

**Buttons:** Pill-shaped (`border-radius: 9999px`). Primary = terracotta fill. Secondary = outline or surface shift.

**Cards:** `border-radius: 1.5–2rem` ("huggable" feel). No borders.

**Logo:** Two overlapping hearts forming a "2", designed by Nanobananna.

---

## Tech Stack

| Layer | Tool | Version | Notes |
|---|---|---|---|
| Framework | React | 18 | Functional components + hooks only |
| Build | Vite | Latest | |
| Styling | Tailwind CSS | v3 | Utility classes only. v4 not used. |
| Routing | React Router | v6 | `<Link>`, `useNavigate`, `useParams` |
| Search | Fuse.js | Latest | Client-side fuzzy search |
| Icons | Lucide React | Latest | Consistent icon set |
| State | useState + useContext | — | No Redux, no Zustand in V1 |
| Persistence | localStorage | — | Bookmarks + user profile only |
| Hosting | Vercel | — | Auto-deploys from `main` branch |
| PWA | Vite PWA plugin | — | manifest.json + service worker |

---

## Folder Structure

```
first2/
├── public/
│   ├── icon-192.png        # PWA icon (maskable, Sprint 5)
│   ├── icon-512.png        # PWA icon (maskable, Sprint 5)
│   ├── favicon.png
│   └── manifest.json
├── src/
│   ├── assets/             # Static assets (logo, illustrations)
│   ├── components/
│   │   ├── BottomNav/
│   │   ├── ContentCard/
│   │   ├── DetailModal/
│   │   ├── StageSheet/     # Reusable filter bottom sheet
│   │   ├── HamburgerMenu/  # Sprint 5 addition
│   │   └── SkeletonCard/
│   ├── context/
│   │   └── AppContext.jsx  # userProfile, bookmarks
│   ├── data/
│   │   └── content.json    # All content items
│   ├── hooks/
│   │   ├── useUserProfile.js
│   │   └── useBookmarks.js
│   ├── pages/
│   │   ├── Onboarding/
│   │   ├── Home/
│   │   ├── Category/
│   │   ├── Search/
│   │   └── Bookmarks/
│   ├── scripts/
│   │   └── validate-content.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── SPEC.md
├── STORIES.md
└── CLAUDE.md
```

---

## Routing

| Route | Page | Notes |
|---|---|---|
| `/` | Onboarding or Home | Redirect to Onboarding if `userProfile` not in localStorage |
| `/home` | Home | Category cards + hamburger menu |
| `/category/:slug` | Category | Subcategory + stage + audience filters |
| `/search` | Search | Fuzzy search via Fuse.js |
| `/bookmarks` | Bookmarks | Saved items from localStorage |

---

## localStorage Schema

Use these exact keys. Do not invent new keys.

```js
localStorage.getItem('first2_profile')
// JSON: { journeyStage: 'expecting' | 'here', date: 'YYYY-MM-DD' }

localStorage.getItem('first2_bookmarks')
// JSON: array of content item id strings
```

Clearing `first2_profile` and navigating to `/` triggers the full onboarding flow (used by the hamburger menu "Update my journey" action).

---

## Content Data Model

All content lives in `src/data/content.json`. Each item:

```json
{
  "id": "string (unique)",
  "title": "string",
  "category": "items | health | resources",
  "subcategory": "string",
  "tags": ["string"],
  "description": "string",
  "link": "https://...",
  "imageUrl": "https://...",
  "audience": "all | mom | partner",
  "stage": "pregnancy | birth | newborn | first-year | all"
}
```

**Validation:** `scripts/validate-content.js` runs on `npm run dev` and `npm run build` and warns on missing required fields or invalid subcategory values.

---

## PWA Configuration

**manifest.json** must include:
```json
{
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "maskable any" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable any" }
  ]
}
```

Icons must be full-bleed (artwork to edges) with important content in the center 80% safe zone.

---

## Filtering Logic

Three filter dimensions on category pages:
1. **Subcategory** — horizontal scrollable pills at top (always visible)
2. **Stage** — inside StageSheet bottom sheet (All, Pregnancy, Birth, Newborn, First Year)
3. **Audience** — inside StageSheet bottom sheet (All, For Mom, For Partners, For Both)

Filters are applied with AND logic (all active filters must match).

Empty state when no results: show message + "Clear filters" button. The button must reset ALL active filters (subcategory → "All", stage → "All", audience → "All") and repopulate the list immediately.

---

## Hamburger Menu (Sprint 5)

Located in top-left of Home screen header. Opens a drawer/sheet with:
- "Update my journey" — clears `first2_profile` from localStorage, navigates to `/` (onboarding)
- Dismissible via close button or tap-outside
- Designed to scale: V2 will add Profile, Notifications, Preferences, About

---

## V1 Constraints (Do Not Build)

- ❌ No user authentication
- ❌ No backend or database
- ❌ No affiliate links (Sprint 7)
- ❌ No blog/markdown content (Sprint 6–7)
- ❌ No cross-device sync (V2 with accounts)
- ❌ No Profile tab
- ❌ No app store submission (V2)

Mark anything deferred with `// TODO V2:` comment.