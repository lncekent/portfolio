---
name: portfolio-task-state
description: Current task progress and checklist for the portfolio project. Use when checking what's done, what's pending, or what to work on next.
---

# Task State — Lance Kent Portfolio

**Last Updated:** 2026-08-08 (7:30 PM)  
**Total Commits:** 309  
**Timeline:** February 25, 2026 → Present  

## Completed Phases (all ✅)

1. Foundation & Setup (React, Vite, Tailwind, shadcn, Vercel)
2. Sidebar & Navigation (desktop + mobile drawer)
3. Home Page (hero banner, stats, highlights, marquee, skills, contact)
4. About Page (hero, education, experience, organizations, certificates)
5. Projects Page (featured grid, other grid, detail pages)
6. Achievements Page (card list with categories)
7. Blog Page (listing + detail with structured content rendering)
8. Resume Page (PDF viewer + download)
9. Dark Mode (full theme, transition animation, favicon swap, localStorage)
10. UX Polish (preloader, skeletons, offline detection, 404 page, animations)
11. Performance (Cloudinary CDN, GPU animations, video optimization, SVG tree-shaking)
12. DevOps (CI/CD, CODEOWNERS, SECURITY.md, LICENSE, README)
13. Content Updates (7 projects, 12 achievements, 8 blogs, experience updates)
14. GitHub Contributions Calendar (react-github-calendar, dynamic sizing, stats)

## Active Work: Responsiveness Enhancement ✅ COMPLETE

### Approach
- `zoom: calc(100vw / 1440)` on `#root` at ≥1440px scales everything on wide viewports
- `clamp(min, preferred-vw, max)` on all components so they grow/shrink fluidly
- min = original default size, max = high value for zoom-out scaling
- Don't modify `src/components/ui/` (shadcn primitives)

### Fluidity Applied To (All ✅):
- **Home** — Banner, Stats, Highlights, Skills, TechMarquee, ContactMe + skeleton
- **About** — Banner, About text, Highlights carousel, Certificates (list variant), Education, Experience, Organizations, ContactMe + skeleton
- **Projects** — Featured cards, Other Projects list, GitHub Calendar (dynamic blockSize + fontSize), ProjectSelected detail page, icons + skeleton
- **Achievements** — Card variant (image, footer, text), List variant (in About), Certificate dialog (uniform transform scale for zoom-out) + skeleton
- **Blog** — Blog list (featured + other posts), Recent Posts sidebar, Blog detail, pagination, icons + skeleton
- **Resume** — PDF scale formula (`windowWidth / 1150`), debounced resize, page-size reservation to prevent container collapse on re-render + skeleton
- **Sidebar** — Full desktop fluidity (avatar, text, nav links, icons, switch, footer)
- **BentoCard** — Global fluid padding, gap, rounded, icon sizing
- **ContactMe** — Fluid icons, gaps, text (shared component)

### Resume Page Special Handling:
- PDF scale computed as `windowWidth / 1150` (responsive to viewport)
- Debounced resize (200ms) prevents flicker during rapid zoom
- Page size reserved via inline `width`/`height` to prevent container collapse during re-render

### Achievements Dialog Special Handling:
- Dialog portaled outside `#root` (doesn't inherit app zoom)
- `transform: scale(uiScale)` applied when viewport ≥1440px
- Preserves original rectangle proportions at all zoom levels
- Mobile layout unchanged (uiScale=1, no transform)

### GitHub Calendar Special Handling:
- Full-width Projects page: blockSize computed from container width, calendar fills via `.fill` CSS class
- Sidebar (ProjectSelected): blockSize computed from stats panel height, horizontal scroll
- fontSize scales with blockSize, CSS variable `--calendar-font-size` drives all internal text
- Pagination overrides via descendant selectors on wrapper

## Active Work: Tablet View (md: 768px-1023px) 🟡

### Implemented:
- [x] Sidebar visible at md: breakpoint (`hidden md:block`)
- [x] Mobile bar/drawer hidden at md: (`md:hidden`)
- [x] App.jsx: `md:flex-row` + `lg:h-screen lg:overflow-hidden`
- [x] Sidebar: `md:w-[30%] lg:w-[23%]`, `sticky top-3`, scrollable via `overflow-y-auto`
- [x] Sidebar height: `lg:h-[calc(100vh-clamp(24px,1.7vw,8rem))]` + `md:max-h-[calc(100vh-...)]`
- [x] Bottom spacer div for scroll padding fix

### Pending:
- [ ] About page: 2-col layout tight at zoomed desktop — may need `[2fr_1.5fr]` or earlier breakpoint
- [ ] Verify all pages at md: breakpoint (768-1023px actual tablet device)
- [ ] Content containers: ensure `lg:` overflow/padding classes work correctly across all pages

## Known Issues / Notes
- Certificate dialog: portaled outside #root, uses JS-driven `transform: scale()` for zoom-out
- `overflow-y-auto` on scroll containers eats bottom padding — solved with spacer divs
- Sidebar `text-nowrap` items clip at narrow widths on high zoom — acceptable tradeoff
- `index.css` zoom rule: `zoom: calc(100vw / 1440)` at `@media (min-width: 1440px)`
- `.calendar-wrapper.fill` scoped CSS makes calendar fill only in full-width context
