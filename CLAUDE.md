# CLAUDE.md — First2

This file is the instruction manual for Claude Code. Read SPEC.md and STORIES.md before writing any code. Follow these conventions for the entire project lifecycle.

---

## Project Overview

First2 is a React web app (Vite) that serves as a curated resource hub for expecting and new parents. It is a read-only content experience in V1 — no backend, no auth, no database. Content lives in a local JSON file. See SPEC.md for full details.

**Live:** https://first2-phi.vercel.app
**Repo:** https://github.com/whytrabbit627/first2

---

## Golden Rules

1. **Read before you write.** Always read the relevant component or file before editing it.
2. **One story at a time.** Implement one user story fully before starting the next. Check in before moving between stories.
3. **Mobile first.** Every component is designed for 375px width before larger screens.
4. **No premature abstraction.** Don't build for V2 inside V1. If a feature is marked V2 in SPEC.md, leave a `// TODO V2:` comment and move on.
5. **Don't invent features.** If something isn't in STORIES.md, don't build it without asking first.
6. **Update Linear when a story is done.** When a user story is fully implemented and confirmed working in the browser, move the corresponding Linear issue to Done via the Linear MCP. Issue IDs follow the format F2-X and are listed in STORIES.md next to each story.

---

## Tech Stack

| Layer | Tool | Notes |
|-------|------|-------|
| Framework | React 18 (Vite) | Use functional components + hooks only. No class components. |
| Styling | Tailwind CSS v3 | Utility classes only. No custom CSS files unless absolutely necessary. |
| Routing | React Router v6 | Use `<Link>`, `useNavigate`, `useParams` |
| Search | Fuse.js | Client-side fuzzy search only |
| State | useState + useContext | No Redux, no Zustand in V1 |
| Persistence | localStorage | For bookmarks and user profile only |
| Icons | Lucide React | Consistent icon set throughout |
| PWA | Vite PWA plugin | manifest.json + service worker |

---

## Folder Structure

Strictly follow this structure. Do not create folders outside of it without asking.

```
src/
├── assets/                 # Static assets (logo, illustrations)
├── components/
│   ├── BottomNav/
│   ├── ContentCard/
│   ├── DetailModal/
│   ├── HamburgerMenu/      # Added Sprint 5
│   ├── SkeletonCard/
│   └── StageSheet/         # Reusable filter bottom sheet
├── context/
│   └── AppContext.jsx
├── data/
│   └── content.json
├── hooks/
│   ├── useBookmarks.js
│   └── useUserProfile.js
├── pages/
│   ├── Bookmarks/
│   ├── Category/
│   ├── Home/
│   ├── Onboarding/
│   └── Search/
├── scripts/
│   └── validate-content.js
└── App.jsx
```

---

## Design System — Stitch

First2 uses the Stitch design language as of Sprint 4. The No-Line Rule is in effect: **no 1px borders anywhere**. Use tonal background shifts or soft ambient shadows instead.

### Color Palette
Always use these Tailwind custom colors. They are defined in `tailwind.config.js`.

| Token | Hex | Tailwind class |
|-------|-----|----------------|
| Sage | `#B5C9B0` | `bg-sage` / `text-sage` |
| Sage dark | `#8FAF89` | `bg-sage-dark` |
| Terracotta | `#C47B5A` | `bg-terracotta` / `text-terracotta` |
| Terracotta dark | `#A8613F` | `bg-terracotta-dark` |
| Navy | `#1B2D5B` | `bg-navy` / `text-navy` |
| Cream | `#FAF8F4` | `bg-cream` |

### Typography
- Headlines: **Newsreader** (serif) — `font-serif`
- Body: **Manrope** (sans-serif) — default font
- Heading weight: `font-semibold text-navy`
- Body: `text-gray-700`
- Muted/secondary: `text-gray-400`
- Labels/pills: `text-sm font-medium`

### Spacing
- Page padding: `px-4 py-6`
- Card padding: `p-4`
- Section gaps: `gap-4` or `gap-6`
- Always use Tailwind spacing scale — no arbitrary values like `p-[13px]`

### Components
- Cards: `rounded-3xl shadow-ambient` (no borders — **not** `rounded-2xl shadow-sm`)
- Pills/filters: `rounded-full px-4 py-1.5 text-sm`
- Active pill: `bg-terracotta text-white`
- Inactive pill: `bg-gray-100 text-gray-600`
- Buttons (primary): `bg-terracotta text-white rounded-full px-6 py-3 font-medium` (pill-shaped — **not** `rounded-xl`)
- Touch targets: minimum `min-h-[44px] min-w-[44px]` on all interactive elements
- Shadows: use `shadow-ambient` (defined in tailwind.config.js — 32px blur, 6% opacity, tinted not pure black)

---

## Component Conventions

- One component per file
- Component file name matches the component name (PascalCase): `ContentCard.jsx`
- Props must be destructured at the top of the component
- Use default exports
- Keep components under ~150 lines. If longer, split into sub-components.

### Example component structure
```jsx
// ContentCard.jsx
export default function ContentCard({ item, onBookmarkToggle, isBookmarked }) {
  return (
    // ...
  )
}
```

---

## Data & Content

- All content lives in `src/data/content.json`
- Never hardcode content strings inside components
- Each content item must match the schema defined in SPEC.md
- Use the `id` field as the React `key` prop whenever mapping over content
- Run the validation script after any edits to content.json

---

## localStorage Schema

Use these exact keys. Do not invent new localStorage keys.

```js
localStorage.getItem('first2_profile')
// JSON: { journeyStage: 'expecting' | 'here', date: 'YYYY-MM-DD' }

localStorage.getItem('first2_bookmarks')
// JSON: array of content item IDs
```

Clearing `first2_profile` and navigating to `/` triggers the full onboarding flow. This is how the hamburger menu "Update my journey" action works.

---

## Routing

| Route | Page | Notes |
|-------|------|-------|
| `/` | Onboarding or Home | Redirect to Onboarding if `first2_profile` not set |
| `/home` | Home | Category cards + hamburger menu |
| `/category/:slug` | Category | Subcategory + stage + audience filters |
| `/search` | Search | |
| `/bookmarks` | Bookmarks | |

---

## State Management

- `useUserProfile` hook handles reading/writing profile to localStorage
- `useBookmarks` hook handles reading/writing bookmarks to localStorage
- Shared state (profile, bookmarks) should be lifted into `AppContext.jsx` and consumed via `useContext`
- No prop drilling beyond 2 levels — use context instead

---

## Filtering Logic

Three filter dimensions on category pages:
1. **Subcategory** — horizontal scrollable pills at top (always visible)
2. **Stage** — inside StageSheet bottom sheet (All, Pregnancy, Birth, Newborn, First Year)
3. **Audience** — inside StageSheet bottom sheet (All, For Mom, For Partners, For Both)

Filters are applied with AND logic. Empty state when no results: show message + "Clear filters" button. The button **must** reset ALL active filters (subcategory → "All", stage → "All", audience → "All") and repopulate the list immediately.

---

## Sprint 5 Stories (recommended build order)

1. **F2-36 — Bug: "Clear filters" does nothing** 🔴 Urgent
   - Find where the empty state "Clear filters" button is rendered
   - Wire its `onClick` to reset subcategory, stage, AND audience to their defaults
   - Test: filter to 0 results → tap "Clear filters" → list repopulates

2. **F2-37 — Hamburger menu**
   - Add `<Menu>` icon (Lucide) to top-left of Home screen header
   - Opens a drawer/sheet matching Stitch design (cream bg, rounded corners, ambient shadow)
   - Single action: "Update my journey" → `localStorage.removeItem('first2_profile')` → `navigate('/')`
   - Dismissible via X button or tap-outside overlay
   - Leave `{/* TODO V2: Profile, Notifications, Preferences, About */}` placeholder comment in menu

3. **F2-12 + F2-11 — Stage and audience filtering** (build together — they share StageSheet)
   - Stage options: All, Pregnancy, Birth, Newborn, First Year (filters on `stage` field)
   - Audience options: All, For Mom, For Partners, For Both (filters on `audience` field)
   - Both default to "All"

4. **F2-20 — Content JSON validation**
   - Verify/update `scripts/validate-content.js` to check all required fields
   - Must warn (not error) with offending item ID

5. **F2-19 — Seed content library**
   - Expand content.json to minimum 5 items per subcategory
   - All items need: id, title, category, subcategory, tags, description, link, imageUrl, audience, stage
   - Run validation script after seeding

6. **F2-35 — PWA icon integration** ⚠️ Blocked on design asset from Nanobananna
   - Do not start until 1024×1024 master PNG is provided
   - Resize to 192×192 and 512×512
   - Update `manifest.json`: `"purpose": "maskable any"` on all icon entries
   - Regenerate favicon.png

---

## Do Nots

- ❌ No class components
- ❌ No inline styles (use Tailwind only)
- ❌ No hardcoded colors outside of `tailwind.config.js`
- ❌ No external API calls in V1
- ❌ No user authentication code in V1
- ❌ No building V2 features — leave `// TODO V2:` comments instead
- ❌ No installing packages without flagging it first
- ❌ No new localStorage keys

---

## Commands

```bash
npm run dev       # Start local dev server (localhost:5173)
npm run build     # Production build
npm run preview   # Preview production build locally
```

Reset onboarding for testing (browser console):
```js
localStorage.clear()
```
Or use the hamburger menu → "Update my journey" once F2-37 is built.

---

## Check-in Protocol

Claude Code should check in with the user:
- Before starting each new user story
- When a design decision isn't covered by this file or SPEC.md
- When a new package install is needed
- When something in the existing code needs to be refactored to proceed
- After completing each story (brief summary of what was built)

Do not proceed to the next story without explicit confirmation.