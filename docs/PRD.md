# PRD: Lance Kent Personal Portfolio

**Author:** Lance Kent Geoffrey B. Magollado  
**Date:** 2026-08-07  
**Version:** 1.0  
**URL:** https://lancekent.dev/

---

## 1. Product Overview

A modern, responsive personal portfolio website that showcases professional identity, technical skills, credentials, projects, and journey in the IT industry. The design follows a minimalist Bento-Grid aesthetic with personalized character assets for branding, smooth animations, and a premium UI inspired by Vercel's design language.

---

## 2. Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| UI Library | shadcn/ui (Radix primitives) |
| Icons | Lucide React + Custom SVGs (via vite-plugin-svgr) |
| Routing | React Router DOM v7 |
| Animations | tw-animate-css (Tailwind-native animation utilities) |
| PDF Viewer | react-pdf |
| GitHub Activity | react-github-calendar |
| Typing Effect | react-type-animation |
| Image/Video CDN | Cloudinary (optimized delivery with q_auto, f_auto) |
| Deployment | Vercel |
| Design Tool | Figma |
| Version Control | Git + GitHub |

---

## 3. Pages & Features

### 3.1 Home Page (`/`)

| Section | Description |
|---------|-------------|
| **Hero Banner** | Full-width video banner (light/dark variants) with overlay text, "Message Me" CTA, and "Open to Collaborate" live status badge |
| **Live Clock** | Real-time date and time display on the banner (top-right) |
| **Stats** | 4-card grid showing Experience (years), Certificates (count), Projects (count), Technologies (count) — dynamically computed from data |
| **Highlights Carousel** | Horizontal scrollable carousel of latest blog posts with navigation arrows |
| **Technologies Marquee** | Auto-scrolling dual-row marquee of tech stack icons with hover tooltips |
| **Skills Accordion** | Expandable accordion listing core skill categories with descriptions |
| **Contact Me** | Social media icon links (GitHub, Facebook, Email, Viber, Instagram, LinkedIn, WhatsApp) |

### 3.2 About Page (`/about`)

| Section | Description |
|---------|-------------|
| **About Hero Banner** | Introduction text with personal bio and CTA |
| **Education** | Timeline of academic history (QCU, Rosario Institute) with GWA, dates, descriptions |
| **Experience** | Professional experience cards (DEVCON Manila, HumAIn) with role, type, dates |
| **Organizations** | Organization involvement (LESIT) with role and description |
| **Highlights** | Scrollable carousel of blog highlights |
| **Certificates** | Achievement cards with filter/category system |
| **Contact Me** | Repeated contact section |

### 3.3 Projects Page (`/projects`)

| Section | Description |
|---------|-------------|
| **Featured Projects** | 3-column grid of top projects with thumbnail, title, date, description, "View Project" link |
| **Other Projects** | 4-column grid of remaining projects |
| **GitHub Contribution Calendar** | Live GitHub activity heatmap (dynamically sized blocks) with computed stats (total contributions, longest streak, current streak) |
| **Contact Me** | Repeated contact section |

### 3.4 Project Detail Page (`/projects-selected/:slug`)

| Section | Description |
|---------|-------------|
| **Hero Image** | Full-width project screenshot |
| **Project Info** | Title, role, type, duration, status, date |
| **Tech Stack Tags** | Horizontal list of technology badges |
| **Overview** | Project description/overview text |
| **Features** | Card grid of key features with title and description |
| **Gallery** | Image gallery of additional screenshots |
| **Links** | GitHub repository link, live demo link (where available) |

### 3.5 Achievements Page (`/achievements`)

| Section | Description |
|---------|-------------|
| **Achievement Cards** | Scrollable list of certifications and education achievements |
| **Each Card** | Issuer logo, title, date, description, verify credential link (where applicable), certificate image |
| **Categories** | Certification, Education |

### 3.6 Blog Page (`/blog`)

| Section | Description |
|---------|-------------|
| **Blog List** | Cards with thumbnails, titles, dates |
| **Navigation** | Click-through to individual blog post |

### 3.7 Blog Detail Page (`/blog-selected/:slug`)

| Section | Description |
|---------|-------------|
| **Content Rendering** | Dynamic rendering of structured content: paragraphs, subtitles, lists, quotes, button groups, images |
| **Content Images** | Supporting photographs for each blog post |
| **Rich Content Types** | paragraph, subtitle, list (with keywords), quote, button-group |

### 3.8 Resume Page (`/resume`)

| Section | Description |
|---------|-------------|
| **PDF Viewer** | Embedded PDF viewer of resume document |
| **Download** | Direct download capability via sidebar link |

### 3.9 404 Not Found Page (`/*`)

| Section | Description |
|---------|-------------|
| **Error Display** | Custom 404 page for invalid routes |

---

## 4. Core UI/UX Features

### 4.1 Navigation & Layout

- **Desktop (≥1024px):** Fixed sidebar navigation (left) + scrollable content area (right)
- **Mobile (<1024px):** Compact top bar with hamburger menu → slide-in drawer navigation
- **Sidebar Contents:** Avatar, name, subtitle, resume download button, page nav links, dark mode toggle, footer credit
- **SPA Navigation:** Client-side routing with React Router — no page reloads

### 4.2 Bento Grid Design System

- Consistent card containers (`BentoCard` component) with icon + title header and flexible body
- Rounded corners (`rounded-[10px]`), consistent padding (`p-4`), card background color
- Grid layouts using CSS Grid with responsive column configurations
- Cards shrink gracefully on smaller viewports

### 4.3 Dark Mode

- Manual toggle (Switch component) in sidebar
- Persisted to `localStorage`
- Theme transition animation: full-screen blur overlay with avatar ping effect during switch
- Dynamic favicon swap (daytime/nighttime avatar)
- CSS custom properties (oklch color space) for all theme colors
- Class-based strategy (`.dark` on `<html>`)

### 4.4 Animations & Transitions

- **Page enter:** Fade-in animations with staggered delays (`animate-in fade-in duration-700 delay-*`)
- **Theme transition:** Full-screen overlay with blur + ping animation
- **Hover effects:** Scale transforms on project images, color transitions on links
- **Marquee:** Continuous auto-scroll for tech stack icons with pause-on-hover
- **Carousel:** Smooth horizontal scrolling with left/right navigation arrows

### 4.5 Loading States

- **Preloader:** Full-screen preloader on initial page load (1.5s)
- **Skeleton Loading:** Every page section has a corresponding skeleton state (1s delay)
- **Module-level caching:** `isLoaded` flags prevent re-showing skeletons on revisit

### 4.6 Offline Detection

- Real-time online/offline status detection via `navigator.onLine` + event listeners
- Custom offline notice component displayed when connection lost

### 4.7 Performance Optimizations

- Cloudinary CDN with `q_auto,f_auto` for automatic quality/format optimization
- Video with `preload="auto"`, `playsInline`, `muted` for auto-play compliance
- SVG icons loaded via `vite-plugin-svgr` for tree-shaking
- Module-level `isLoaded` flags to prevent re-renders
- `transform-gpu`, `will-change-transform`, `backface-hidden` for smooth animations

---

## 5. Data Architecture

All content is centralized in `src/data.jsx`:

| Export | Type | Content |
|--------|------|---------|
| `achievementsData` | Array (12 items) | Certifications & education achievements |
| `techStackData` | Array (21 items) | Technology icons for marquee |
| `blogsData` | Array (8 items) | Blog posts with structured content |
| `projectsData` | Array (7 items) | Project case studies with full details |
| `skillsData` | Array (4 items) | Skill categories with SVG icons |
| `educationData` | Array (2 items) | Academic history |
| `experienceData` | Array (2 items) | Professional experience |
| `orgcomData` | Array (1 item) | Organization involvement |

Data-driven rendering — adding a new project/blog/achievement only requires adding an object to the respective array.

---

## 6. Responsive Design Strategy

### Breakpoints

| Breakpoint | Width | Behavior |
|------------|-------|----------|
| Default | 0–639px | Single column, stacked layout, drawer navigation |
| `sm` | 640px+ | Minor spacing/sizing adjustments |
| `lg` | 1024px+ | Desktop sidebar + multi-column content grids |

### Current Responsive Patterns

- Mobile-first approach with `lg:` breakpoint for desktop
- Sidebar: `hidden lg:block` (desktop) / `lg:hidden` (mobile top bar + drawer)
- Grids: `grid-cols-1 lg:grid-cols-[2fr_1fr]`, `grid-cols-2 lg:grid-cols-4`
- Text: Mix of fixed sizes and `clamp()` values for fluid typography
- Images: `object-cover` with aspect ratio containers
- Carousel: Horizontal scroll with `min-w-[220px]` items

### Zoom Behavior (Current)

- Zoom-out: `@media (min-width: 1440px) { #root { zoom: calc(100vw / 1440) } }` scales proportionally
- See `docs/task_state.md` for active responsiveness enhancement work

---

## 7. Component Architecture

```
src/components/
├── BentoCard.jsx           # Reusable card wrapper (icon, title, children)
├── Sidebar.jsx             # Full navigation (desktop sidebar + mobile drawer)
├── ContactMe.jsx           # Social media links card (reused across pages)
├── Preloader.jsx           # Initial loading screen
├── OfflineNotice.jsx       # No-internet fallback UI
├── home/
│   ├── HomeContent.jsx     # Hero banner, stats, highlights carousel
│   ├── HomeSubContent.jsx  # Technologies, skills, contact
│   └── TechMarquee.jsx     # Auto-scrolling tech icon marquee
├── about/
│   ├── AboutContent.jsx    # About hero, highlights, education/experience
│   └── AboutSubContent.jsx # Certificates, contact
├── projects/
│   ├── ProjectsContent.jsx         # Featured + other projects grid
│   ├── ProjectSubContent.jsx       # GitHub calendar, contact
│   └── ProjectSelectedContent.jsx  # Individual project detail view
├── achievements/
│   └── AchievementsContent.jsx     # Achievement card list
├── blog/
│   ├── BlogContent.jsx             # Blog list
│   └── BlogSubContent.jsx          # Individual blog post rendering
├── resume/
│   └── ResumeContent.jsx           # PDF viewer
└── ui/                             # shadcn/ui primitives (accordion, button, carousel, etc.)
```

---

## 8. Deployment & Infrastructure

| Item | Detail |
|------|--------|
| Hosting | Vercel |
| Domain | lancekent.dev |
| CDN | Cloudinary (images, videos) |
| Build | `npm run build` (Vite production build) |
| Routing | `vercel.json` configured for SPA fallback |
| CI | GitHub Actions (`.github/workflows/test.yml`) |
| Environment | `.env` for any runtime configuration |

---

## 9. Design Principles

1. **Minimalist Bento-Grid** — Clean, scannable card-based layouts inspired by Apple/Vercel aesthetics
2. **Personalized Branding** — Custom character avatars (daytime/nighttime variants) as personal brand identity
3. **Content-First** — Data-driven architecture where content updates require zero component changes
4. **Performance-Conscious** — Skeletons, CDN-optimized assets, GPU-accelerated animations
5. **Accessible** — Semantic HTML, keyboard-navigable, proper alt text, color contrast via oklch
6. **Progressive Enhancement** — Works on mobile, enhanced on desktop

---

## 10. Future Considerations

- Enhanced zoom-in/zoom-out responsiveness (active — see `docs/task_state.md`)
- Additional breakpoints (`xl`, `2xl`) for ultra-wide screens
- Container queries for component-level responsiveness
- Blog CMS integration (currently static data)
- Analytics integration
- SEO optimization (meta tags, Open Graph)
