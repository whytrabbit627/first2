# CLAUDE.md — First2

This file is the instruction manual for Claude Code. Read SPEC.md and STORIES.md before writing any code. Follow these conventions for the entire project lifecycle.

---

## Project Overview

First2 is a React web app (Vite) that serves as a curated resource hub for expecting and new parents. It is a read-only content experience in V1 — no backend, no auth, no database. Content lives in a local JSON file. See SPEC.md for full details.

---

## Golden Rules

1. **Read before you write.** Always read the relevant component or file before editing it.
2. **One story at a time.** Implement one user story fully before starting the next. Check in before moving between stories.
3. **Mobile first.** Every component is designed for 375px width before larger screens.
4. **No premature abstraction.** Don't build for V2 inside V1. If a feature is marked V2 in SPEC.md, leave a `// TODO V2:` comment and move on.
5. **Don't invent features.** If something isn't in STORIES.md, don't build it without asking first.

---

## Tech Stack

| Layer | Tool | Notes |
|-------|------|-------|
| Framework | React 18 (Vite) | Use functional components + hooks only. No class components. |
| Styling | Tailwind CSS | Utility classes only. No custom CSS files unless absolutely necessary. |
| Routing | React Router v6 | Use `<Link>`, `useNavigate`, `useParams` |
| Search | Fuse.js | Client-side fuzzy search only |
| State | useState + useContext | No Redux, no Zustand in V1 |
| Persistence | localStorage | For bookmarks and user profile only |
| Icons | Lucide React | Consistent icon set throughout |

---

## Folder Structure

Strictly follow this structure. Do not create folders outside of it without asking.

```
src/
├── data/
│   └── content.json
├── components/
│   ├── Layout/
│   ├── ContentCard/
│   ├── CategoryView/
│   ├── SearchBar/
│   └── BookmarkButton/
├── pages/
│   ├── Onboarding.jsx
│   ├── Home.jsx
│   ├── Category.jsx
│   ├── Search.jsx
│   └── Bookmarks.jsx
├── hooks/
│   ├── useBookmarks.js
│   └── useUserProfile.js
├── context/
│   └── AppContext.jsx
└── App.jsx
```

---

## Design System

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
| White | `#FFFFFF` | `bg-white` |

### Typography
- Headings: `font-semibold text-navy`
- Body: `text-gray-700`
- Muted/secondary: `text-gray-400`
- Labels/pills: `text-sm font-medium`

### Spacing
- Page padding: `px-4 py-6`
- Card padding: `p-4`
- Section gaps: `gap-4` or `gap-6`
- Always use Tailwind spacing scale — no arbitrary values like `p-[13px]`

### Components
- Cards: `rounded-2xl shadow-sm bg-white`
- Pills/filters: `rounded-full px-4 py-1.5 text-sm`
- Active pill: `bg-terracotta text-white`
- Inactive pill: `bg-gray-100 text-gray-600`
- Buttons (primary): `bg-terracotta text-white rounded-xl px-6 py-3 font-medium`
- Touch targets: minimum `min-h-[44px] min-w-[44px]` on all interactive elements

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
- Placeholder content (3-5 items per category) is acceptable in Sprint 1

---

## localStorage Schema

Use these exact keys. Do not invent new localStorage keys.

```js
localStorage.getItem('first2_profile')   // JSON: { journeyStage, expectedDueDate, actualBirthDate }
localStorage.getItem('first2_bookmarks') // JSON: array of content item IDs
```

---

## Routing

| Route | Page | Notes |
|-------|------|-------|
| `/` | Onboarding or Home | Redirect to Onboarding if profile not set |
| `/home` | Home | Category selector |
| `/category/:slug` | Category | e.g. `/category/items` |
| `/search` | Search | |
| `/bookmarks` | Bookmarks | |

---

## State Management

- `useUserProfile` hook handles reading/writing profile to localStorage
- `useBookmarks` hook handles reading/writing bookmarks to localStorage
- Shared state (profile, bookmarks) should be lifted into `AppContext.jsx` and consumed via `useContext`
- No prop drilling beyond 2 levels — use context instead

---

## Do Nots

- ❌ No class components
- ❌ No inline styles (use Tailwind only)
- ❌ No hardcoded colors outside of `tailwind.config.js`
- ❌ No `any` types (if TypeScript is ever introduced)
- ❌ No external API calls in V1
- ❌ No user authentication code in V1
- ❌ No building V2 features — leave `// TODO V2:` comments instead
- ❌ No installing packages without flagging it first

---

## Commands

```bash
npm run dev       # Start local dev server (localhost:5173)
npm run build     # Production build
npm run preview   # Preview production build locally
```

---

## Check-in Protocol

Claude Code should check in with the user:
- Before starting each new user story
- When a design decision isn't covered by this file or SPEC.md
- When a new package install is needed
- When something in the existing code needs to be refactored to proceed
- After completing each story (brief summary of what was built)

Do not proceed to the next story without explicit confirmation.
