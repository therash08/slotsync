<div align="center">

# ⚡ SlotSync
### University Routine Planning & Cross-Batch Clash Resolution Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.3.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/State-Zustand_5-443E3B?style=for-the-badge)](https://zustand-demo.pmnd.rs/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br />

**SlotSync** is an intelligent university routine orchestration platform engineered specifically for students taking **retake, backlog, or improvement courses** alongside junior batches. It automatically cross-examines timetable routines, pinpoints time collisions with minute-level precision, explores compatible section permutations, and builds multi-criteria optimized academic schedules.

</div>

---

## 🌟 Key Highlights

- **Dual Theme Architecture**:
  - **`☀ Warm Light`**: `#FAF8F5` base, soft studio illumination, warm stone borders (`#E7E2DA`), and `#4F46E5` primary indigo.
  - **`◐ Motion Black`**: `#07080D` obsidian base, `#10131C` card surface, signature 20-second slow ambient glow drift (`@keyframes ambientGlowDrift`), and `#6366F1` / `#8B5CF6` electric violet accents.
  - **Zero-Flicker Hydration**: Inline `<head>` script instantly applies stored theme preference from `localStorage`.
- **Tasteful 3D Experience**:
  - **Hero 3D Schedule Planner**: GPU-accelerated CSS-3D perspective timetable with a 7-stage automated clash-to-resolution sequence and subtle mouse-tilt parallax.
  - **Sync Orb**: Central pulsing core with 3 synchronized gimbal orbital rings that accelerate during schedule generation.
- **6-Stage Optimization Pipeline**:
  - Full modal visualization: `Current Routine` → `Selected Courses` → `Conflict Analysis` → `Section Matching` → `Optimization` → `Schedule Results`.
- **Circular SVG Score Ring**:
  - 0–100 weighted schedule fit score with sequential diagnostic bullet points.
- **Interactive Clash Resolver**:
  - Live landing page demo comparing timetable collisions with 1-click alternative section swapping (`CSE 3301` vs `CSE 2203`).
- **Before / After Comparison Slider**:
  - Drag slider contrasting chaotic PDF routine sheets with SlotSync's unified 4-day schedule.

---

## 🧠 Algorithmic Core

### 1. Conflict Detection Engine (`lib/schedule/conflict.ts`)
Validates every pair of scheduled class sessions $(S_A, S_B)$ across all registered and junior batch courses:

$$\text{Clash}(S_A, S_B) \iff (S_A.\text{day} = S_B.\text{day}) \land (S_A.\text{start} < S_B.\text{end}) \land (S_B.\text{start} < S_A.\text{end})$$

- Pinpoints exact overlap intervals (e.g. `Sunday 11:30 AM – 12:30 PM`).
- Produces clear, natural-language clash diagnostics:
  > *"CSE 2203 (Batch 62-A) overlaps with CSE 3301 (Batch 61-A) on Sunday from 11:30 AM to 12:30 PM."*

### 2. Multi-Criteria Schedule Optimizer (`lib/schedule/optimizer.ts`)
Computes candidate routine combinations across all available junior batch sections, honoring pinned/locked sections:

$$\text{Score} = w_1 \cdot C_{\text{conflict}} + w_2 \cdot C_{\text{campus}} + w_3 \cdot C_{\text{gap}} + w_4 \cdot C_{\text{pref}}$$

| Metric | Weight | Description |
|---|:---:|---|
| **Conflict Penalty** | **40%** | Zero-tolerance for overlapping class sessions |
| **Campus Day Efficiency** | **25%** | Maximizes free days (rewards 4-day or 3-day weeks) |
| **Idle Gap Optimization** | **20%** | Minimizes dead hours between consecutive classes |
| **Student Preferences** | **15%** | Matches preferred time slots (Morning / Afternoon / Evening) |

---

## 📱 Page & Route Directory

| Route | View | Capabilities |
|---|---|---|
| `/` | **Landing Page** | 3D Hero Schedule, Sync Orb, Metric strip, Interactive Conflict Demo, Before/After Slider, Features Grid, FAQ |
| `/onboarding` | **Onboarding Wizard** | 4-step setup: University Info, Academic Batch/Section, Scheduling Preferences, Confirmation |
| `/dashboard` | **Overview** | Adaptive Welcome Banner, Semester status cards, Upcoming classes, Saved routines, Weekly preview |
| `/dashboard/routine` | **My Routine** | 5-day academic grid (Sun–Thu), Week/List toggle, Course Detail Drawer with section locking |
| `/dashboard/plan` | **Plan Courses** | Course catalog with semester filters, 1-click Add as Retake / Improvement, Selection manager |
| `/dashboard/generate` | **Schedule Generator** | Preference controls (day slider, off-days), 6-stage visual pipeline modal, Circular score cards |
| `/dashboard/saved` | **Saved Schedules** | Routine archive, Rename schedule modal, Duplicate routine, Direct comparison launcher |
| `/dashboard/compare` | **Compare Schedules** | Side-by-side matrix comparing scores, campus days, idle gaps, and synchronized calendars |
| `/dashboard/courses` | **Course Directory** | Filterable course library with real-time routine compatibility chips (Compatible / Conflict) |
| `/dashboard/settings` | **Settings** | Student profile form, Academic config, Dual Large Theme Preview Cards with UI mockups |
| `/admin` | **Admin Console** | System statistics, CSV/Excel routine parser simulation, Health status |
| `/admin/routine-versions` | **Routine History** | Version timeline (v3.0, v2.1, v1.0), Version diff inspection modal, 1-click rollback |

---

## 🏗️ Project Architecture

```
SlotSync/
├── app/
│   ├── (auth & onboarding)/
│   │   └── onboarding/           # Student onboarding flow
│   ├── admin/                    # Administrative portal & routine parser
│   ├── dashboard/                # Main authenticated application
│   │   ├── compare/              # Side-by-side routine comparison
│   │   ├── courses/              # Course directory & course details
│   │   ├── generate/             # Schedule generator & optimizer
│   │   ├── notifications/        # Academic notification center
│   │   ├── plan/                 # Retake/Improvement course selector
│   │   ├── routine/              # Weekly timetable view
│   │   ├── saved/                # Saved routine manager
│   │   └── settings/             # Profile & Appearance settings
│   ├── globals.css               # Dual-theme design tokens & animations
│   ├── layout.tsx                # Root layout with zero-flicker hydration script
│   └── page.tsx                  # High-conversion landing page
├── components/
│   ├── 3d/                       # Hero3DSchedule, SyncOrb (CSS 3D perspective)
│   ├── courses/                  # Course cards, drawers, search filters
│   ├── landing/                  # InteractiveConflictDemo, BeforeAfterSlider
│   ├── layout/                   # Navbar, DashboardHeader, AppSidebar, Footer, ThemeToggle
│   ├── schedule/                 # WeeklyCalendar, ScheduleScoreCard, GenerationPipelineModal
│   └── ui/                       # Accessible Button, Modal, Drawer, Toast, Badge
├── lib/
│   ├── mock-data/                # Comprehensive university routines & courses
│   ├── schedule/                 # conflict.ts, optimizer.ts, metrics.ts
│   ├── motion.ts                 # Centralized Framer Motion variants & transitions
│   └── utils.ts                  # Time calculation, class merging, date utilities
├── stores/
│   ├── useScheduleStore.ts       # Routine, selected courses, locks, generated schedules
│   ├── useThemeStore.ts          # Dual theme state (warm-light | motion-black)
│   └── useUserStore.ts           # Student profile, academic batch, notifications
└── types/
    └── index.ts                  # Strict TypeScript interfaces & models
```

---

## 🎨 Dual Theme System

| Token | `☀ Warm Light` | `◐ Motion Black` |
|---|---|---|
| **Background** | `#FAF8F5` (Refined Studio Ivory) | `#07080D` (Deep Obsidian) |
| **Card Surface** | `#FFFFFF` | `#10131C` |
| **Primary Accent** | `#4F46E5` (Indigo) | `#6366F1` (Electric Indigo) |
| **Secondary Accent**| `#7C3AED` (Violet) | `#8B5CF6` (Neon Violet) |
| **Borders** | `#E7E2DA` (Warm Stone) | `rgba(148, 163, 184, 0.14)` |
| **Ambient Motion** | Soft Amber/Indigo aura | `@keyframes ambientGlowDrift` (20s loop) |
| **Selector UI** | Segmented pill & Dropdown with live miniature swatches |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.17.0` or higher (Node.js 20+ recommended)
- **npm** or **pnpm**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/SlotSync.git
   cd SlotSync
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   npm run start
   ```

---

## 🛠️ Tech Stack & Dependencies

- **Core**: [Next.js 16 (App Router)](https://nextjs.org/) & [React 19](https://react.dev/)
- **Engine**: [Turbopack](https://turbo.build/pack)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Store**: [Zustand](https://github.com/pmndrs/zustand) with `localStorage` persistence
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: [Geist Sans & Geist Mono](https://vercel.com/font)

---

## 📬 Contact & Support

For queries, feature requests, or university schedule integration:

- **Developer**: [therash792@gmail.com](mailto:therash792@gmail.com)
- **Project**: SlotSync Academic System • Fall 2026

---

<div align="center">
  <sub>Built for students navigating cross-batch university schedules. © 2026 SlotSync. All rights reserved.</sub>
</div>
# slotsync
