# SlotSync

### Course Planner for Leading University

> **Build your semester without the clashes.**

SlotSync is a university course-planning application for Leading University students who need to take **retake, backlog, or improvement courses** alongside their current-semester courses.

Instead of collecting several batch routines and comparing class times manually, students can bring their current courses and additional course options into one planning workspace, identify timetable clashes, and explore compatible sections.

**Project stage:** Active frontend development  
**University scope:** Leading University  
**Storage model:** Browser-local profiles and plans  
**Backend:** Not included in the current frontend scope

> **Development notice:** This README describes the existing project foundation and the updated frontend product scope. The latest profile flow, navigation changes, and complete department coverage are development targets unless confirmed in the running build. Demo routines are not official university schedules.

---

## Contents

- [Why SlotSync?](#why-slotsync)
- [Project Scope and Status](#project-scope-and-status)
- [Department Coverage](#department-coverage)
- [Student Profile and Local Storage](#student-profile-and-local-storage)
- [Features and Navigation](#features-and-navigation)
- [Planning Workflow](#planning-workflow)
- [Conflict Detection and Section Matching](#conflict-detection-and-section-matching)
- [Routine Data and Academic Context](#routine-data-and-academic-context)
- [Themes, Illustrations, and Motion](#themes-illustrations-and-motion)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Validation Checklist](#validation-checklist)
- [Limitations and Roadmap](#limitations-and-roadmap)
- [Developer](#developer)
- [License](#license)

## Why SlotSync?

A student may have a regular semester routine but also need to repeat or improve a course offered by another batch. A suitable course section must fit around the student's existing classes, including any additional courses already selected.

The same course may have several section options, each with different weekly meetings. Choosing a section without checking every meeting can introduce an unexpected clash.

SlotSync focuses on one practical question:

> **Which section of my retake or improvement course can I take without clashing with the courses I am already taking?**

The goal is to make that decision easier, without requiring students to gather and compare multiple routine sheets themselves.

## Project Scope and Status

SlotSync is a student planning tool, not a learning management system, university ERP, or official registration portal.

| Area | Scope and status |
| --- | --- |
| Existing project foundation | The supplied project documentation describes course exploration, weekly routines, clash detection, schedule generation, comparison, saving, and two interface themes. |
| Updated student experience | Local profile creation, direct dashboard entry, and a central Course & Section Explorer are part of the updated frontend scope. |
| Department coverage | All ten departments listed below are in scope. Complete course and routine coverage must be checked against the actual datasets. |
| Account security | Secure authentication and university identity verification are not part of the frontend-only version. |
| Persistence | Plans and profile preferences are intended to persist in the current browser, not through a cloud account. |
| Backend services | Server-side accounts, synchronization, and university integrations are future work. |

This document does not certify that every new feature is complete or that every department has a verified academic dataset. Features should be marked complete only after implementation and testing.

## Department Coverage

The department selector and dataset structure are intended to cover:

| Label | Label |
| --- | --- |
| ENG | CSE |
| EEE | Civil |
| ARCH | Tourism |
| Law | BBA |
| Public Health | IST |

These are the project's requested department labels. Abbreviations are retained without inventing official full program names.

Each department's planning experience should provide its own course catalog, available batches and sections, academic-term routines, and retake/improvement section options. Courses from one department must not be displayed under another department merely to populate an empty screen.

**A department appearing in a selector does not mean its complete official curriculum or routine has been loaded.** Department-wide demo coverage and verified university data are separate milestones.

Where real routines are unavailable, clearly labeled demonstration datasets can support the planning workflow. An unavailable context should show a useful explanation rather than silently loading another department's routine.

## Student Profile and Local Storage

### Profile creation

The updated frontend flow uses these fields:

| Field | Purpose |
| --- | --- |
| Student ID | Student-entered identifier, preserved as text. |
| Full name | Profile display name. |
| Department | Default department for planning. |
| Batch | Default batch context. |
| Section | Default section context. |

The intended flow is **Create profile & continue**: validate the fields, save a local profile, and open the dashboard directly.

No password, email confirmation, OTP, or backend approval is required in this local-profile flow. Academic term is selected in the planning workspace from the available routine data.

### Returning to the application

The application should restore the active local profile and its saved planning state after browser storage loads. A returning student should not need to enter the same information on every visit.

If multiple local profiles are implemented, their plans and notifications must remain associated with the correct profile. Selecting a saved profile is a convenience feature, not authentication.

### Privacy and persistence

Local profiles are **not verified university accounts**. Student IDs are not checked against university records, and the frontend does not provide a secure account boundary on a shared browser.

Data saved locally is not automatically available on another browser or device. Clearing site data can remove saved profiles and routines. Passwords, verification tokens, and other authentication secrets are outside this local storage model.

Use the notice **“Saved on this device”** for local schedules. Storage failures should be reported instead of showing a false save confirmation.

## Features and Navigation

The updated student-facing navigation is organized around the following areas. Individual routes may differ while existing pages are being consolidated.

### Overview

Overview brings together the student's academic context, selected courses, and planning status.

Department, batch, and section are prefilled from the profile. The student selects an academic term, loads the corresponding routine, and confirms which current courses they are actually taking.

A batch routine is a starting point, not an assumption that the student takes every listed course. Current-course counts, added-course counts, and unresolved-clash summaries should reflect the active plan.

The main next action is **Add retake or improvement course**.

### My Routine

My Routine brings confirmed current courses and selected additional courses into one weekly timetable.

Class blocks show course identity, section, and time, with Retake or Improvement labels where relevant. Room, faculty, and full meeting details are shown when available in the dataset.

Repeated meetings of the same course use consistent visual identification. A list or agenda view supports smaller screens and alternative ways of reading the routine.

Current-course sections remain unchanged unless the student explicitly replaces the current routine.

### Course & Section Explorer

This is the main problem-solving area of SlotSync.

**Browse by Course** lets students search their department's catalog by course code or name. Opening a course gathers its scheduled offerings across relevant batches and sections for the selected academic term.

**Browse by Batch & Section** lets students inspect a group's complete routine without replacing their own plan. A selected course offering can then be checked against their current and already added courses.

Each offering should show its batch, section, complete weekly meetings, and compatibility status. A catalog entry and an offering in the selected term are different: a course may exist in the catalog without being scheduled that term.

| Status | Meaning |
| --- | --- |
| Fits your current plan | The offering's known meetings do not overlap the selected plan. |
| Clashes with selected courses | At least one meeting overlaps another selected class. |
| Schedule information incomplete | Compatibility cannot be established from the available information. |
| Not offered in this term | No offering is available in the selected dataset and academic term. |

Students can preview a section, inspect a clash, add a suitable offering, or review alternatives. Adding another course must check it against the entire active plan, not only the original semester routine.

### Compare Schedules

Schedule comparison helps students understand differences between candidate or saved plans, especially the sections chosen for additional courses.

Useful comparison metrics include remaining clashes, campus days, and weekly idle time when those values are calculated by the application. Opening a comparison must not automatically replace the active routine.

A routine should not receive an invented score or a "best" label without an implemented ranking method.

### Saved Schedules

The saved-plan workflow covers naming, reopening, renaming, activating, and deleting a schedule.

A saved plan should retain its profile association, academic context, and selected course offerings. If the underlying dataset changes, unavailable offerings should require review rather than being silently replaced.

Schedules in the frontend-only version are device-local; cloud synchronization is not implied.

### Notifications

Notifications support planning events such as a newly detected clash, a compatible alternative, a resolved clash, or a successful save.

A conflict notice should identify the affected courses and provide a useful action such as **Review clash**. Repeated checks should not create duplicate notices, and resolved conflicts should not remain labeled as active problems.

These are local in-app notifications. Live push delivery, email alerts, and background monitoring are not included in the frontend-only scope.

### Settings

Settings covers profile details, academic defaults, theme preferences, supported notification preferences, and explicit local-data management.

Changing a profile default should not silently overwrite an active or saved routine. Clearing local data requires confirmation.

## Planning Workflow

```text
Create or restore a local student profile
                  |
                  v
Select academic term and confirm current courses
                  |
                  v
Open Course & Section Explorer
                  |
                  v
Choose retake or improvement courses
                  |
                  v
Review offerings across batches and sections
                  |
                  v
Check all meetings against the complete plan
                  |
            +-----+-----+
            |           |
            v           v
      Section fits   Clash or missing data
            |           |
            v           v
      Add to plan    Review details or alternatives
            |           |
            +-----+-----+
                  |
                  v
View the combined routine
                  |
                  v
Compare alternatives and save locally
```

If no complete compatible combination exists, preserve the student's selections and explain the obstruction. Do not remove a course or change a current section simply to produce a successful-looking result.

## Conflict Detection and Section Matching

### Overlap rule

For two ordinary same-day meetings in the same scheduling context:

```text
same day
AND meetingA.start < meetingB.end
AND meetingB.start < meetingA.end
```

Both comparisons must be true for the time intervals to overlap. Back-to-back meetings are not overlaps under this rule; a separate buffer rule would need to be explicitly defined.

For example, a class from **10:00–11:30** overlaps a class from **11:00–12:30**, but not one starting at **11:30**.

### Complete offering checks

A course section may have several weekly meetings. Compatibility requires checking every meeting, including linked lectures or labs represented in the dataset.

An additional offering must be checked against confirmed current courses and all other selected additional courses. Missing times are an unknown result, not proof of compatibility.

### Matching multiple additional courses

When searching combinations, sections must fit together globally. Two sections can each fit the original routine while still clashing with one another.

The first priority is preserving current-course selections and avoiding time overlaps. Campus-day or idle-time metrics can help compare valid options where supported, but should not override unresolved conflicts.

A successful result means **no time overlaps were found in the selected routine data**. It does not establish open seats, prerequisites, enrollment eligibility, or university registration approval.

## Routine Data and Academic Context

The planning model distinguishes:

```text
Department
  -> Academic term
     -> Batch and section
        -> Course offering
           -> Weekly class meetings
```

A course catalog entry describes a subject. A course offering identifies where and when that subject is taught in a particular term and section.

The student's profile, confirmed current routine, and browsed batch/section are separate contexts. Exploring another section must not change the student's own routine. Displayed labels must correspond to the actual loaded meetings.

### Data provenance

Demo data is for illustration and testing. Supplied data must retain its source and academic context; an uploaded or manually entered routine is not automatically verified as official or current.

Where demo routines are used, display:

> **Demo course and routine data — not an official university schedule.**

When official data is available, its source, term, and relevant version should be identifiable. Students should verify applicable routine information before registration.

## Themes, Illustrations, and Motion

### Warm Light

The updated light-theme direction combines soft ivory/lavender backgrounds, a deep-purple sidebar, rounded light cards, warm orange navigation accents, and restrained purple controls.

### Motion Black

The corresponding dark direction uses charcoal or deep-plum surfaces, readable text, lavender accents, and subtle separation between background, workspace, and cards.

### Academic illustrations

Profile setup and suitable empty states can feature original illustrations of students arranging course cards around a weekly calendar. They should support the course-planning theme without imitating official university branding or covering important controls.

### Motion and accessibility goals

Animation is limited to helpful transitions, selection feedback, dialog entrances, and small decorative movements. The working timetable stays flat and stable.

Keyboard navigation, visible focus, readable contrast, mobile access, and reduced-motion support are design and validation requirements, not claims of a completed accessibility audit.

## Technology Stack

The project documentation identifies the following stack. Exact installed versions are determined by `package.json` and the lockfile.

| Technology | Role |
| --- | --- |
| Next.js 16 | Application framework and App Router. |
| React 19 | Component-based user interface. |
| TypeScript | Shared types and application logic. |
| Tailwind CSS v4 | Styling, responsive layouts, and theme tokens. |
| Framer Motion | UI transitions and decorative animation. |
| Zustand | Frontend state management. |
| Local Storage | Appropriate browser-local profile and planning state. |
| Lucide React | Interface icons. |
| Turbopack | Development tooling in the documented Next.js setup. |

No backend service is required by the frontend-only product scope.

## Getting Started

### Prerequisites

Use a Node.js release compatible with the Next.js version installed in the project. Follow the repository's `package.json` engine requirements and any supplied runtime-version file rather than relying on an outdated minimum in documentation.

The commands below use npm. Use the package manager associated with the repository's lockfile.

### Clone the project

Replace `<repository-url>` with the actual repository URL; a verified repository address was not provided for this README.

```bash
git clone <repository-url> slotsync
cd slotsync
```

### Install dependencies

```bash
npm install
```

### Start development

```bash
npm run dev
```

Open the local address printed by the development server. The default address documented for the project is:

```text
http://localhost:3000
```

### Create and run a production build

The supplied project documentation includes these commands:

```bash
npm run build
npm run start
```

Confirm the available scripts in `package.json`. To list them:

```bash
npm run
```

Run linting, type checks, and tests through the scripts actually provided by the repository. This README does not claim that those checks have passed.

## Project Structure

The following is a high-level summary of the documented organization, not a guarantee that every route has already been renamed for the updated navigation:

```text
app/
  onboarding/       # Student setup flow
  dashboard/        # Routine-planning workspace
  page.tsx          # Landing page

components/
  courses/          # Course selection and details
  landing/          # Public-page sections
  layout/           # Sidebar, header, and shared layout
  schedule/         # Timetable and comparison components
  ui/               # Reusable controls and feedback

lib/
  mock-data/        # Local demonstration datasets
  schedule/         # Conflict detection, matching, and metrics

stores/             # Profile, schedule, and theme state
types/              # Shared application types
```

Existing experimental or administrative routes are separate from the student-facing scope. Their presence does not imply secure administration, verified imports, or a working backend.

## Validation Checklist

Before marking an update complete, validate the profile-to-saved-routine journey for each populated department context.

| Area | Required checks |
| --- | --- |
| Profiles and navigation | Direct dashboard entry, refresh restoration, explicit exit, and no redirect loops. |
| Sidebar | Collapse/expand without navigation, visible controls in both states, and a usable mobile drawer. |
| Academic context | Correct department, term, batch, section, and loaded meeting data; no stale CSE fallback. |
| Matching | Compatible section, overlapping section, back-to-back classes, recurring meetings, and no-solution cases. |
| Additional courses | Retake/improvement courses checked against one another as well as current courses. |
| Data and persistence | Missing data handled honestly, correct profile association, saved-plan restoration, and storage-failure feedback. |
| Interface | Both themes, readable primary buttons, keyboard access, reduced motion, and no clipped timetable columns. |

Record actual results separately. This checklist is not evidence that tests were executed.

## Limitations and Roadmap

### Current frontend limitations

Profiles are local rather than authenticated. Plans are not synchronized across devices, and browser-storage removal can delete local data. Department datasets may be incomplete or demonstrative.

Compatibility depends on accurate meeting information. The application does not confirm course eligibility, seats, or approval to register. It is not presented as an official university service.

### Frontend completion priorities

The immediate work is to stabilize navigation and persistence, complete the updated profile flow, populate clearly labeled datasets across all ten requested departments, and verify accurate cross-batch section matching.

Additional priorities include consistent academic context, accessible mobile routines, meaningful local notifications, and reliable comparison and saving.

### Future backend direction

The planned backend stack is **Django, Django REST Framework, and PostgreSQL**.

Future work may include verified student accounts, cross-device synchronization, university routine imports, CSV/Excel parsing, routine version management, server-side optimization, calendar export, and notifications backed by real routine updates.

These are roadmap items, not claims about the current frontend implementation.

## Developer

**Developed by:** Rash  
**Email:** [therash792@gmail.com](mailto:therash792@gmail.com)  
**GitHub:** [therash08](https://github.com/therash08)

Built to reduce the effort of planning courses across batches and sections.

## License

Copyright (c) 2026 SlotSync. All rights reserved.

This project and its source code may not be copied, modified, distributed, or reused without permission from the developer.

---

**SlotSync — Build your semester without the clashes.**