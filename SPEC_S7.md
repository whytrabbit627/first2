# First2 — Sprint 7 Spec
## Polish & Personalization

**Sprint Goal:** Make the app feel like *your* app. Baby name captured in onboarding, surfaced throughout the UI, profile editable via gear icon, and images cleaned up across all 45 posts.

**Design Principles:**
- Warm but not cutesy. Personalization should feel natural, not forced.
- Fallback gracefully — if no baby name is set, copy defaults to generic ("Your baby is 4 weeks old").
- No new dependencies. All changes use existing localStorage + React state patterns.

---

## Stories

---

### F2-47 — Add baby name field to onboarding date screen

**What:** Add an optional text input for baby name on the existing onboarding screen that collects the due/birth date.

**Why:** Name is contextually paired with the date — both are "about your baby" data. Capturing them together is natural and avoids a separate settings screen.

**Acceptance Criteria:**
- [ ] Text input appears on the date picker screen (below or above the date field)
- [ ] Label: "Baby's name (optional)"
- [ ] Input is optional — user can skip and proceed without entering a name
- [ ] Name saves to localStorage key `babyName` on form submit
- [ ] Name pre-fills correctly when user re-enters onboarding to edit
- [ ] Placeholder text: "e.g. Lila"
- [ ] Matches existing input styling (Tailwind, design system colors)

**Notes:**
- Max length: 50 characters
- No validation needed beyond max length
- Empty string treated as "not set" — UI falls back to generic copy

---

### F2-48 — Gear icon → re-enter onboarding

**What:** Add a gear/settings icon to the app's top header. Tapping it routes the user back into the onboarding flow so they can update name, date, and journey stage.

**Why:** Gives users a discoverable way to edit their profile without building a bespoke settings screen. Reuses the onboarding flow we already have.

**Acceptance Criteria:**
- [ ] Gear icon (Lucide `Settings` icon) appears in top-right of app header
- [ ] Tapping it navigates to the start of the onboarding flow
- [ ] On completing onboarding again, user is returned to Home (not stuck in a loop)
- [ ] Existing localStorage values (name, date, stage) pre-fill correctly when re-entering
- [ ] Icon is accessible (aria-label: "Edit profile")
- [ ] Icon uses Navy #1B2D5B or inherits header text color

**Notes:**
- This is a route navigation change, not a modal
- Test the full re-entry loop: gear → onboarding → complete → home

---

### F2-38 — Baby name + age display (Home header + persistent)

**What:** Personalize the Home screen header and a persistent UI element to show baby name (if set) and dynamically calculated age.

**Why:** Core personalization feature. Turns a generic app into "my app."

**Acceptance Criteria:**

**Home header:**
- [ ] If name is set: "Hi, [Name] is [X weeks/months] old 👶"
- [ ] If name not set: "Your baby is [X weeks/months] old 👶"
- [ ] Age calculates dynamically from stored birth/due date
- [ ] Age displays as weeks if < 12 weeks, months if ≥ 12 weeks
- [ ] If journey stage is "Expecting": "You're [X weeks] along 🌱"

**Persistent header element:**
- [ ] Subtle name or age indicator in the app header/nav area
- [ ] Exact placement: small subtext or badge beneath/beside the app logo
- [ ] If no name set, show age only (e.g. "4 weeks")
- [ ] Does not crowd the header — falls back gracefully on small screens

**Age calculation logic:**
```
const today = new Date();
const birthDate = new Date(localStorage.getItem('babyBirthDate'));
const diffDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
const weeks = Math.floor(diffDays / 7);
const months = Math.floor(diffDays / 30.44);
display = weeks < 12 ? `${weeks} weeks` : `${months} months`;
```

**Notes:**
- Depends on F2-47 (name in localStorage) — build after F2-47 is complete
- Edge case: if birth date is in the future (expecting), show weeks along not age

---

### F2-46 — Image audit & cleanup

**What:** Audit all 45 markdown posts for missing, broken, placeholder, or low-quality images. Replace or remove as needed.

**Why:** Content shipped in Sprint 6. Images need a QA pass before the app looks production-ready.

**Acceptance Criteria:**
- [ ] All 45 posts reviewed for frontmatter `image:` field
- [ ] No broken image URLs (404s)
- [ ] No generic placeholder images remaining
- [ ] Images are appropriately sized (not oversized for mobile)
- [ ] Alt text present on all images
- [ ] Posts without a suitable image use a consistent fallback (category color block or default illustration)

**Notes:**
- Deliverable: updated markdown files + a simple audit log (which posts were changed)
- Image sources: use royalty-free sources (Unsplash, Pexels) or existing app assets

---

### F2-49 — UI consistency pass

**What:** A focused spot-check across all screens for spacing, typography, and color token consistency — particularly after the Sprint 6 architecture changes.

**Why:** Markdown post pages, the new modal CTA, and any Sprint 7 changes may have introduced subtle inconsistencies.

**Acceptance Criteria:**
- [ ] All screens reviewed: Home, Search, Bookmarks, Post detail, Onboarding flow
- [ ] Spacing consistent (no orphaned margins/padding from old components)
- [ ] Typography: headings, body, captions all using correct Tailwind classes
- [ ] Colors: all UI elements using design system tokens (Sage, Terracotta, Navy, Cream)
- [ ] Bottom nav renders correctly across iPhone SE (small) and standard viewport sizes
- [ ] No console errors on any screen

**Notes:**
- This is a visual QA story, not a feature. Claude Code pass + manual browser check.
- Log any bugs found as new Linear issues rather than fixing them in scope here

---

## Out of Scope (Sprint 7)

- Affiliate link wiring (Sprint 8)
- Cross-device bookmark sync (V2, requires auth)
- Push notifications (V2)
- App store submission (future sprint)

---

## Build Sequence

1. **F2-47** — Onboarding name field (data foundation)
2. **F2-48** — Gear icon (navigation plumbing)
3. **F2-38** — Name + age display (depends on F2-47 data)
4. **F2-46** — Image audit (independent, can run in parallel)
5. **F2-49** — UI consistency pass (final, eyes-on everything)
