# Design Spec: Conversion Optimization & Interactive Storytelling
**Date:** 2026-04-06
**Project:** physio-landing-page

## Overview

Evolve the physio landing page from a premium static presentation into a high-conversion, interactive experience. Modelled on the TRW AI Automation Course 2 professor's implementation, adapted specifically for the physiotherapy clinic owner niche. All existing sections that convert well are preserved; new interactive components are layered on top.

---

## Checklist

### 1. Interactive Value Tools

- [ ] **Patient Revenue Calculator**
  - Sliders: number of active patients (10–200), average session fee (R200–R2000), admin hours per week (1–20)
  - Output: estimated hours recovered per month, revenue equivalent of that time
  - Positioned after WhoItsFor section
  - Stat updates live as sliders move

- [ ] **Multi-Step Practice Health Check Form** (replaces AuditRequestForm modal)
  - Step 1: Practice type (Solo practitioner / Small team 2–5 / Multi-location)
  - Step 2: Biggest pain point (Appointment no-shows / Manual booking & scheduling / Patient follow-up / Billing & payments / Scattered records)
  - Step 3: Contact details (name, email, clinic name, phone optional)
  - Progress indicator across all 3 steps
  - Same simulated submit behaviour (1s delay, success state, no backend)

### 2. Social Proof & Authority

- [ ] **Physio Specialty Cloud**
  - Monochrome tag cloud showing physio practice types: Sports Rehab, Post-Surgery Recovery, Chronic Pain, Women's Health, Pediatric Physio, Occupational Rehab, Spinal & Neuro, Dry Needling
  - Subtle hover lift on each tag
  - Label: "Practices we work with"

- [ ] **Impact Snapshots** (3 illustrative result cards)
  - Card 1: "Sports clinic — reduced no-shows by 70% with automated reminders"
  - Card 2: "Solo practitioner — reclaimed 8 hours/week from manual admin"
  - Card 3: "Multi-room clinic — grew 40% patient capacity without new staff"
  - Each card has a subtle data visualisation bar (e.g. 70% fill)
  - Labelled "Illustrative results" — honest, not fake testimonials

### 3. Visual Storytelling

- [ ] **Typewriter Hero Headlines** (upgrades existing Hero)
  - H1 remains: "Your practice shouldn't run on manual **[word]**"
  - Cycling words (typewriter effect): "no-shows" → "manual booking" → "scattered records" → "billing delays"
  - Preserve existing gradient styling on the animated word
  - Preserve existing CTA button

- [ ] **Before/After Workflow Slider**
  - Drag divider to reveal left (Before) vs right (After) panel
  - Before: phone calls → paper schedule → manual reminders → chasing payments
  - After: online booking → auto-confirmations → smart reminders → automated billing
  - Each panel shows ~4 workflow steps with icons
  - Positioned after WhoItsFor, before Calculator

### 4. Conversion & Navigation Polish

- [ ] **Sticky Fast-Track Header**
  - Appears after user scrolls past Hero
  - Minimal: logo/brand name left, "Request Audit" button right
  - Scroll progress bar at very top (thin blue line)
  - Fades in on scroll, does not show on initial load

- [ ] **Exit-Intent Value Modal**
  - Triggers when mouse moves toward top of viewport (leaving behaviour)
  - Offer: "Before you go — get our free guide: 5 Admin Tasks Physio Clinics Can Automate Today"
  - Two buttons: "Send Me the Guide" (opens form) and "No thanks"
  - Only fires once per session (sessionStorage flag)
  - Same simulated submit (no real email send)

---

## Page Order (Final)

1. Sticky Fast-Track Header (overlay, always on top after scroll)
2. Hero — typewriter upgrade
3. WhoItsFor — unchanged
4. Before/After Workflow Slider — new
5. Patient Revenue Calculator — new
6. Process — unchanged
7. Physio Specialty Cloud + Impact Snapshots — new
8. AuditOffer — unchanged
9. WhatHappensNext — unchanged
10. FinalCTA — unchanged
11. Multi-Step Practice Health Check Form (modal, replaces AuditRequestForm)
12. Exit-Intent Modal (overlay, session-triggered)

---

## Technical Approach

### Architecture
- All new features are separate components in `src/components/`
- No new dependencies — use existing React, Tailwind, lucide-react
- Typewriter effect: plain `useEffect` + `setInterval`, no library
- Before/After slider: mouse/touch drag with `onMouseMove` / `onTouchMove`
- Calculator: local `useState` for slider values, derived output (no external state)
- Exit-intent: `document.addEventListener('mouseleave')` on `componentDidMount`, `sessionStorage` to gate

### Preserving Existing Work
- `useReveal` hook stays unchanged — apply to all new sections
- Glassmorphism card pattern (`bg-white/5 backdrop-blur-md border border-white/10 rounded-xl`) used throughout new components for visual consistency
- Blue accent system (`blue-400` / `blue-500`, gradient `from-blue-400 to-cyan-400`) carried through all new elements

### No Backend
- Form submission stays simulated (1s delay)
- Exit-intent guide offer is also simulated
- No environment variables, no Supabase, no API calls

---

## Out of Scope
- Founder's Note section (no real client history yet)
- Real email capture / backend integration
- Analytics / tracking
- Mobile-specific layout overhauls (responsive Tailwind only)
