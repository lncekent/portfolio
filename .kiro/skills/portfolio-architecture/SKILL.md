---
name: portfolio-architecture
description: Detailed component architecture, file map, and layout patterns for the Lance Kent portfolio. Use when modifying components, understanding layout structure, or debugging responsive issues.
---

# Portfolio Architecture Reference

## Layout Structure

```
App.jsx (root)
├── flex container: bg-[#ECECEC] dark:bg-[#2e2e2e] flex-col lg:flex-row lg:h-screen overflow-hidden lg:gap-3
├── Sidebar (left, desktop: w-[18%], mobile: hidden + drawer)
└── Routes (right, flex-1, scrollable content)
```

## Component Tree

```
src/components/
├── BentoCard.jsx           — Reusable card (icon + title header + children body)
├── Sidebar.jsx             — Desktop nav (fixed width) + Mobile drawer
├── ContactMe.jsx           — Social links card (reused on Home, About, Projects)
├── Preloader.jsx           — Initial 1.5s loading screen
├── OfflineNotice.jsx       — No-internet fallback
├── home/
│   ├── HomeContent.jsx     — Hero video banner, Stats grid, Highlights carousel
│   ├── HomeSubContent.jsx  — Technologies marquee, Skills accordion, Contact
│   └── TechMarquee.jsx     — Dual-row auto-scroll tech icons
├── about/
│   ├── AboutContent.jsx    — Hero, Highlights, Education, Experience
│   └── AboutSubContent.jsx — Certificates, Contact
├── projects/
│   ├── ProjectsContent.jsx         — Featured (3-col) + Other projects
│   ├── ProjectSubContent.jsx       — GitHub calendar, Contact
│   └── ProjectSelectedContent.jsx  — Individual project detail
├── achievements/
│   └── AchievementsContent.jsx     — Achievement cards list
├── blog/
│   ├── BlogContent.jsx             — Blog list
│   └── BlogSubContent.jsx          — Blog post renderer
├── resume/
│   └── ResumeContent.jsx           — PDF viewer
└── ui/                             — shadcn primitives (DO NOT MODIFY)
```

## Page Layout Patterns

| Page | Grid | Structure |
|------|------|-----------|
| Home | `lg:grid-cols-[2fr_1fr]` | Content (left) + SubContent (right) |
| About | `lg:grid-cols-[2fr_2fr]` | Content (left) + SubContent (right) |
| Projects | Single column | Featured grid + Other grid + Calendar |
| Achievements | Single column | Scrollable card list |
| Blog | Two-column | List + Detail |
| Resume | Single column | PDF viewer |

## Sidebar Details

- **Desktop:** `<nav>` with `hidden lg:block max-h-screen w-[18%] bg-card rounded-[10px] p-4 my-3 ml-3`
- **Mobile top bar:** `lg:hidden block w-full bg-transparent px-3 pt-3` → h-14 bar with avatar + hamburger
- **Mobile drawer:** Fixed overlay + `w-[75%]` slide-in panel from left

## Responsive Breakpoints Used

| Class prefix | Width | Usage |
|-------------|-------|-------|
| (none) | 0+ | Mobile-first defaults |
| `sm:` | 640px | Minor size adjustments |
| `lg:` | 1024px | Desktop sidebar + multi-column |

## Data Layer

All in `src/data.jsx`:
- `achievementsData` (12 items) — certificates, education achievements
- `techStackData` (21 items) — tech icons for marquee
- `blogsData` (8 items) — blog posts with structured content
- `projectsData` (7 items) — project case studies
- `skillsData` (4 items) — skill categories with SVG icons
- `educationData` (2 items) — academic history
- `experienceData` (2 items) — work experience
- `orgcomData` (1 item) — organization membership

## Current Responsiveness Issue (Active Fix)

**Zoom-in problem (sidebar):**
- `w-[18%]` = ~184px at 1024px viewport → too narrow
- `text-nowrap` on heading/footer → text clips/overflows
- No min-width protection

**Zoom-out problem (content):**
- `zoom: calc(100vw / 1440)` in index.css scales everything but never fills extra space
- Static grid columns (`lg:grid-cols-3`, `lg:grid-cols-4`) don't adapt to ultra-wide
- Fixed pixel sizes inside cards
