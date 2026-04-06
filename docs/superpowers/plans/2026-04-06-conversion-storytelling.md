# Conversion Optimization & Interactive Storytelling — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Evolve the physio landing page from a static presentation into an interactive, high-conversion experience targeting physiotherapy clinic owners.

**Architecture:** Eight self-contained React components are added/upgraded on top of the existing page. Each component uses the existing design system (glassmorphism, blue-400/500 accents, useReveal hook). App.tsx is updated incrementally — each task wires its own component in immediately so the dev server stays live-testable throughout.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Vite, lucide-react. No new dependencies.

---

## Existing Codebase Overview

Read these files before starting. They define the patterns every new component must follow.

- `src/App.tsx` — root component, manages `isFormOpen` state, renders all sections
- `src/index.css` — global styles: `fadeIn`, `scaleIn`, `meshShift` keyframes; `.animate-fade-in`, `.reveal`, `.visible` utilities; `.mesh-bg` animated gradient
- `src/hooks/useReveal.ts` — IntersectionObserver hook, returns a `ref`. Apply to every new section's outer `<section>` element with className `reveal`.
- `src/components/Hero.tsx` — current static hero
- `src/components/AuditRequestForm.tsx` — current single-step modal form (will be fully replaced in Task 7)

**Design system to follow in all new components:**
- Card style: `bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8`
- Accent color: `text-blue-400`, `bg-blue-500/20`, `border-blue-500/50`
- Gradient text: `bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent`
- Button: `bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/50`
- Section wrapper: `<section ref={sectionRef} className="py-24 px-6 reveal">`

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `src/components/Hero.tsx` | Modify | Add typewriter cycling words |
| `src/components/StickyHeader.tsx` | Create | Scroll-progress bar + fast-track audit CTA |
| `src/components/BeforeAfterSlider.tsx` | Create | Drag-to-reveal manual vs automated workflow |
| `src/components/PatientCalculator.tsx` | Create | Interactive revenue/time recovery calculator |
| `src/components/SpecialtyCloud.tsx` | Create | Physio specialty tag cloud |
| `src/components/ImpactSnapshots.tsx` | Create | 3 illustrative result cards |
| `src/components/PracticeHealthCheckForm.tsx` | Create | 3-step replacement for AuditRequestForm |
| `src/components/ExitIntentModal.tsx` | Create | Exit-intent overlay with guide offer |
| `src/hooks/useExitIntent.ts` | Create | mouseleave detection with sessionStorage gate |
| `src/App.tsx` | Modify (incrementally) | Wire all new components into page |

---

## Task 1: Typewriter Hero Headlines

**Files:**
- Modify: `src/components/Hero.tsx`

Upgrade the static headline so the highlighted word cycles through physio pain points using a typewriter effect. The rest of the component (CTA button, subtitle) stays exactly as-is.

- [ ] **Step 1: Replace Hero.tsx with the upgraded version**

```tsx
import { useState, useEffect } from 'react';

const WORDS = ['no-shows', 'manual booking', 'scattered records', 'billing delays'];

interface HeroProps {
  onOpenForm: () => void;
}

export default function Hero({ onOpenForm }: HeroProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPausing, setIsPausing] = useState(false);

  useEffect(() => {
    if (isPausing) return;

    const current = WORDS[wordIndex];

    if (!isDeleting) {
      if (displayed.length < current.length) {
        const t = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          100
        );
        return () => clearTimeout(t);
      } else {
        setIsPausing(true);
        const t = setTimeout(() => {
          setIsPausing(false);
          setIsDeleting(true);
        }, 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length - 1)),
          60
        );
        return () => clearTimeout(t);
      } else {
        setIsDeleting(false);
        setWordIndex((i) => (i + 1) % WORDS.length);
      }
    }
  }, [displayed, isDeleting, isPausing, wordIndex]);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in">
          Your practice shouldn't run on
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {' '}{displayed}
            <span className="animate-pulse">|</span>
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto animate-fade-in-delay-1">
          Physiotherapy clinic owners waste hours each week on repetitive admin,
          disconnected booking systems, and scattered patient records. Automation
          fixes this systematically.
        </p>
        <button
          onClick={onOpenForm}
          className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-10 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/50 animate-fade-in-delay-2"
        >
          Request a Free Practice Audit
        </button>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run dev server and verify**

Run: `npm run dev`

Open `http://localhost:5173`. The hero headline should show "Your practice shouldn't run on" and then cycle: "no-shows" types in, pauses, deletes, "manual booking" types in, etc. The blinking cursor `|` should pulse after the typed word.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: add typewriter cycling words to Hero headline"
```

---

## Task 2: Sticky Fast-Track Header

**Files:**
- Create: `src/components/StickyHeader.tsx`
- Modify: `src/App.tsx`

Minimal sticky header that fades in after the user scrolls past the hero. Has a scroll-progress bar at the very top and a quick "Request Audit" button.

- [ ] **Step 1: Create StickyHeader.tsx**

```tsx
import { useState, useEffect } from 'react';

interface StickyHeaderProps {
  onOpenForm: () => void;
}

export default function StickyHeader({ onOpenForm }: StickyHeaderProps) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrollTop > 80);
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
      }`}
    >
      {/* Scroll progress bar */}
      <div className="h-0.5 bg-white/10 w-full">
        <div
          className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header bar */}
      <div className="bg-gray-950/80 backdrop-blur-md border-b border-white/10 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-white font-semibold text-sm tracking-wide">
            PhysioFlow Automation
          </span>
          <button
            onClick={onOpenForm}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-5 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-blue-500/25"
          >
            Request Audit
          </button>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Add StickyHeader to App.tsx**

Open `src/App.tsx`. Add the import and render it as the first child inside the root `<div>`:

```tsx
import { useState } from 'react';
import Hero from './components/Hero';
import WhoItsFor from './components/WhoItsFor';
import Process from './components/Process';
import AuditOffer from './components/AuditOffer';
import WhatHappensNext from './components/WhatHappensNext';
import FinalCTA from './components/FinalCTA';
import AuditRequestForm from './components/AuditRequestForm';
import StickyHeader from './components/StickyHeader';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen text-white relative">
      <div className="mesh-bg fixed inset-0 -z-10" />
      <StickyHeader onOpenForm={() => setIsFormOpen(true)} />
      <Hero onOpenForm={() => setIsFormOpen(true)} />
      <WhoItsFor />
      <Process />
      <AuditOffer onOpenForm={() => setIsFormOpen(true)} />
      <WhatHappensNext />
      <FinalCTA onOpenForm={() => setIsFormOpen(true)} />

      <footer className="py-8 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p>AI Automation Agency for Physiotherapy Practices</p>
        </div>
      </footer>

      <AuditRequestForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  );
}

export default App;
```

- [ ] **Step 3: Verify**

Scroll down past the hero. The header should fade in with the brand name and "Request Audit" button. The thin blue progress bar at the very top should grow as you scroll. Clicking "Request Audit" should open the form modal.

- [ ] **Step 4: Commit**

```bash
git add src/components/StickyHeader.tsx src/App.tsx
git commit -m "feat: add sticky header with scroll progress bar"
```

---

## Task 3: Before/After Workflow Slider

**Files:**
- Create: `src/components/BeforeAfterSlider.tsx`
- Modify: `src/App.tsx`

A drag-to-reveal component. Left side shows the manual workflow, right side shows the automated workflow. A draggable vertical divider reveals more of either side.

- [ ] **Step 1: Create BeforeAfterSlider.tsx**

```tsx
import { useState, useRef, useEffect } from 'react';
import { useReveal } from '../hooks/useReveal';

const BEFORE_STEPS = [
  { label: 'Phone calls to book appointments', icon: '📞' },
  { label: 'Paper schedule & manual entry', icon: '📋' },
  { label: 'Manually sending reminder texts', icon: '✍️' },
  { label: 'Chasing outstanding payments', icon: '💸' },
];

const AFTER_STEPS = [
  { label: 'Online booking — 24/7, no calls', icon: '🖥️' },
  { label: 'Auto-synced digital calendar', icon: '📅' },
  { label: 'Smart reminders sent automatically', icon: '🔔' },
  { label: 'Automated billing & follow-ups', icon: '✅' },
];

export default function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const sectionRef = useReveal();

  const clamp = (val: number) => Math.min(Math.max(val, 5), 95);

  const getPos = (clientX: number) => {
    if (!containerRef.current) return 50;
    const rect = containerRef.current.getBoundingClientRect();
    return clamp(((clientX - rect.left) / rect.width) * 100);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging.current) setSliderPos(getPos(e.clientX));
    };
    const onMouseUp = () => { isDragging.current = false; };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  const onTouchMove = (e: React.TouchEvent) => {
    setSliderPos(getPos(e.touches[0].clientX));
  };

  return (
    <section ref={sectionRef} className="py-24 px-6 reveal">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
          Manual vs{' '}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Automated
          </span>
        </h2>
        <p className="text-gray-400 text-center mb-12 text-lg">
          Drag the divider to compare workflows
        </p>

        <div
          ref={containerRef}
          className="relative h-80 rounded-2xl overflow-hidden cursor-col-resize select-none border border-white/10"
          onMouseDown={() => { isDragging.current = true; }}
          onTouchMove={onTouchMove}
        >
          {/* AFTER (right, full width, shown behind) */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/60 to-gray-950 p-8 flex flex-col justify-center">
            <div className="text-blue-400 font-bold text-sm mb-4 uppercase tracking-widest">After — Automated</div>
            <div className="space-y-3">
              {AFTER_STEPS.map((s, i) => (
                <div key={i} className="flex items-center gap-3 text-white">
                  <span className="text-xl">{s.icon}</span>
                  <span className="text-sm md:text-base">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* BEFORE (left, clipped to sliderPos%) */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-950 p-8 flex flex-col justify-center overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <div className="text-red-400 font-bold text-sm mb-4 uppercase tracking-widest">Before — Manual</div>
            <div className="space-y-3">
              {BEFORE_STEPS.map((s, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-300">
                  <span className="text-xl">{s.icon}</span>
                  <span className="text-sm md:text-base">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider handle */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white/60"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-xl flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M5 4l-3 4 3 4M11 4l3 4-3 4" stroke="#1e3a5f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add BeforeAfterSlider to App.tsx**

Insert it after `<WhoItsFor />`:

```tsx
import BeforeAfterSlider from './components/BeforeAfterSlider';

// In JSX, after <WhoItsFor />:
<WhoItsFor />
<BeforeAfterSlider />
<Process />
```

Full updated App.tsx imports block:
```tsx
import { useState } from 'react';
import Hero from './components/Hero';
import WhoItsFor from './components/WhoItsFor';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import Process from './components/Process';
import AuditOffer from './components/AuditOffer';
import WhatHappensNext from './components/WhatHappensNext';
import FinalCTA from './components/FinalCTA';
import AuditRequestForm from './components/AuditRequestForm';
import StickyHeader from './components/StickyHeader';
```

- [ ] **Step 3: Verify**

Scroll to the Before/After section. You should see a split panel. Drag the white circle handle left and right — the left (Before/manual) panel should reveal and hide against the right (After/automated) panel. Works on touch too.

- [ ] **Step 4: Commit**

```bash
git add src/components/BeforeAfterSlider.tsx src/App.tsx
git commit -m "feat: add before/after workflow drag slider"
```

---

## Task 4: Patient Revenue Calculator

**Files:**
- Create: `src/components/PatientCalculator.tsx`
- Modify: `src/App.tsx`

Interactive sliders showing how many hours and how much revenue a clinic recovers by automating admin.

- [ ] **Step 1: Create PatientCalculator.tsx**

```tsx
import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';

export default function PatientCalculator() {
  const [patients, setPatients] = useState(50);
  const [sessionFee, setSessionFee] = useState(600);
  const [adminHours, setAdminHours] = useState(8);
  const sectionRef = useReveal();

  const hoursRecoveredPerMonth = Math.round(adminHours * 4 * 0.6);
  const revenueEquivalent = hoursRecoveredPerMonth * sessionFee;
  const extraPatients = Math.round(hoursRecoveredPerMonth * 0.8);

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-black/40 reveal">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Interactive Calculator
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What's your admin{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              costing you?
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Adjust the sliders to see how much time and revenue your clinic could recover.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Sliders */}
            <div className="space-y-8">
              {/* Active patients */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-white font-semibold">Active Patients</label>
                  <span className="text-blue-400 font-bold">{patients}</span>
                </div>
                <input
                  type="range" min={10} max={200} step={5}
                  value={patients}
                  onChange={(e) => setPatients(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>10</span><span>200</span>
                </div>
              </div>

              {/* Session fee */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-white font-semibold">Avg Session Fee</label>
                  <span className="text-blue-400 font-bold">R{sessionFee}</span>
                </div>
                <input
                  type="range" min={200} max={2000} step={50}
                  value={sessionFee}
                  onChange={(e) => setSessionFee(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>R200</span><span>R2,000</span>
                </div>
              </div>

              {/* Admin hours */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-white font-semibold">Admin Hours / Week</label>
                  <span className="text-blue-400 font-bold">{adminHours}h</span>
                </div>
                <input
                  type="range" min={1} max={20} step={1}
                  value={adminHours}
                  onChange={(e) => setAdminHours(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1h</span><span>20h</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="flex flex-col justify-center gap-6">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-blue-400 mb-1">{hoursRecoveredPerMonth}h</div>
                <div className="text-gray-300 text-sm">hours recovered per month</div>
              </div>
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-1">R{revenueEquivalent.toLocaleString()}</div>
                <div className="text-gray-300 text-sm">revenue equivalent per month</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-white mb-1">+{extraPatients}</div>
                <div className="text-gray-300 text-sm">additional patients per month</div>
              </div>
              <p className="text-xs text-gray-500 text-center">
                Based on a 60% admin reduction — a conservative estimate for fully automated practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add PatientCalculator to App.tsx**

Insert it after `<BeforeAfterSlider />`:

```tsx
import PatientCalculator from './components/PatientCalculator';

// In JSX:
<BeforeAfterSlider />
<PatientCalculator />
<Process />
```

- [ ] **Step 3: Verify**

Scroll to the calculator. Move each slider — the three result cards (hours recovered, revenue equivalent, additional patients) should update live. Numbers should be realistic: at 8h/week admin, 50 patients, R600 fee → ~19h recovered, ~R11,400 equivalent.

- [ ] **Step 4: Commit**

```bash
git add src/components/PatientCalculator.tsx src/App.tsx
git commit -m "feat: add interactive patient revenue calculator"
```

---

## Task 5: Physio Specialty Cloud

**Files:**
- Create: `src/components/SpecialtyCloud.tsx`
- Modify: `src/App.tsx`

A monochrome tag cloud showing the types of physio practices served. Positioned before AuditOffer.

- [ ] **Step 1: Create SpecialtyCloud.tsx**

```tsx
import { useReveal } from '../hooks/useReveal';

const SPECIALTIES = [
  'Sports Rehab',
  'Post-Surgery Recovery',
  'Chronic Pain Management',
  'Women\'s Health',
  'Pediatric Physio',
  'Occupational Rehab',
  'Spinal & Neuro',
  'Dry Needling',
  'Hydrotherapy',
  'Musculoskeletal',
  'Pre & Post Natal',
  'Oncology Rehab',
];

export default function SpecialtyCloud() {
  const sectionRef = useReveal();

  return (
    <section ref={sectionRef} className="py-24 px-6 reveal">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-gray-500 text-sm font-semibold uppercase tracking-widest mb-8">
          Practices we work with
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          {SPECIALTIES.map((specialty) => (
            <span
              key={specialty}
              className="px-4 py-2 rounded-full border border-white/10 text-gray-300 text-sm font-medium bg-white/5 backdrop-blur-sm hover:border-blue-500/50 hover:text-white hover:-translate-y-0.5 transition-all duration-200 cursor-default"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add SpecialtyCloud to App.tsx**

Insert after `<Process />`:

```tsx
import SpecialtyCloud from './components/SpecialtyCloud';

// In JSX:
<Process />
<SpecialtyCloud />
<AuditOffer onOpenForm={() => setIsFormOpen(true)} />
```

- [ ] **Step 3: Verify**

Scroll to the specialty cloud. All 12 tags should display in a wrapping flex row. Hovering any tag should lift it slightly and brighten the border to blue.

- [ ] **Step 4: Commit**

```bash
git add src/components/SpecialtyCloud.tsx src/App.tsx
git commit -m "feat: add physio specialty cloud section"
```

---

## Task 6: Impact Snapshots

**Files:**
- Create: `src/components/ImpactSnapshots.tsx`
- Modify: `src/App.tsx`

Three illustrative result cards with a data bar. Positioned between SpecialtyCloud and AuditOffer.

- [ ] **Step 1: Create ImpactSnapshots.tsx**

```tsx
import { useReveal } from '../hooks/useReveal';

const SNAPSHOTS = [
  {
    clinic: 'Sports Rehab Clinic',
    result: 'Reduced no-shows by 70%',
    detail: 'Automated SMS + WhatsApp reminders 48h and 2h before appointments.',
    metric: 70,
    color: 'blue',
  },
  {
    clinic: 'Solo Practitioner',
    result: 'Reclaimed 8 hours/week',
    detail: 'Eliminated manual booking calls, patient intake forms, and end-of-day admin.',
    metric: 80,
    color: 'cyan',
  },
  {
    clinic: 'Multi-Room Physio Practice',
    result: '+40% patient capacity',
    detail: 'Grew appointment volume without hiring extra admin staff.',
    metric: 40,
    color: 'blue',
  },
];

export default function ImpactSnapshots() {
  const sectionRef = useReveal();

  return (
    <section ref={sectionRef} className="py-12 px-6 reveal">
      <div className="max-w-5xl mx-auto">
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest text-center mb-8">
          Illustrative results — based on typical automation outcomes
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {SNAPSHOTS.map((s) => (
            <div
              key={s.clinic}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-blue-500/30 transition-colors"
            >
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-3">
                {s.clinic}
              </p>
              <p className="text-white font-bold text-lg mb-2">{s.result}</p>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{s.detail}</p>

              {/* Data bar */}
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-1000`}
                  style={{ width: `${s.metric}%` }}
                />
              </div>
              <p className="text-right text-xs text-blue-400 mt-1 font-semibold">{s.metric}%</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add ImpactSnapshots to App.tsx**

Insert after `<SpecialtyCloud />`:

```tsx
import ImpactSnapshots from './components/ImpactSnapshots';

// In JSX:
<SpecialtyCloud />
<ImpactSnapshots />
<AuditOffer onOpenForm={() => setIsFormOpen(true)} />
```

- [ ] **Step 3: Verify**

Three cards should appear after the specialty cloud. Each has a practice type, bold result stat, description, and a filled bar at the bottom reflecting the percentage. The "Illustrative results" disclaimer should be visible above the cards.

- [ ] **Step 4: Commit**

```bash
git add src/components/ImpactSnapshots.tsx src/App.tsx
git commit -m "feat: add impact snapshots with data bars"
```

---

## Task 7: Multi-Step Practice Health Check Form

**Files:**
- Create: `src/components/PracticeHealthCheckForm.tsx`
- Modify: `src/App.tsx` (swap AuditRequestForm → PracticeHealthCheckForm)

Replace the single-step form with a 3-step flow: practice type → biggest pain point → contact details.

- [ ] **Step 1: Create PracticeHealthCheckForm.tsx**

```tsx
import { useState, FormEvent } from 'react';
import { X, Loader2, CheckCircle, ChevronLeft } from 'lucide-react';

interface PracticeHealthCheckFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRACTICE_TYPES = [
  'Solo practitioner',
  'Small team (2–5 practitioners)',
  'Multi-location / large practice',
];

const PAIN_POINTS = [
  'Appointment no-shows & cancellations',
  'Manual booking & scheduling',
  'Patient follow-up & retention',
  'Billing & payment collection',
  'Scattered records & paperwork',
];

const EMPTY_CONTACT = { fullName: '', email: '', clinicName: '', phone: '' };

export default function PracticeHealthCheckForm({ isOpen, onClose }: PracticeHealthCheckFormProps) {
  const [step, setStep] = useState(1);
  const [practiceType, setPracticeType] = useState('');
  const [painPoint, setPainPoint] = useState('');
  const [contact, setContact] = useState(EMPTY_CONTACT);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const reset = () => {
    setStep(1);
    setPracticeType('');
    setPainPoint('');
    setContact(EMPTY_CONTACT);
    setIsSuccess(false);
  };

  const handleClose = () => { reset(); onClose(); };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => { handleClose(); }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-lg w-full animate-scale-in">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <h2 className="text-xl font-bold text-white">Practice Health Check</h2>
            {!isSuccess && (
              <p className="text-gray-400 text-sm mt-0.5">Step {step} of 3</p>
            )}
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress dots */}
        {!isSuccess && (
          <div className="flex gap-2 px-6 pt-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  s <= step ? 'bg-blue-500' : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        )}

        {/* Success */}
        {isSuccess ? (
          <div className="p-10 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Request Submitted!</h3>
            <p className="text-gray-300">We'll be in touch within 24–48 hours.</p>
          </div>
        ) : (

          <div className="p-6">
            {/* Step 1: Practice type */}
            {step === 1 && (
              <div>
                <p className="text-white font-semibold mb-5">What best describes your practice?</p>
                <div className="space-y-3">
                  {PRACTICE_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => { setPracticeType(type); setStep(2); }}
                      className={`w-full text-left px-5 py-4 rounded-xl border transition-all ${
                        practiceType === type
                          ? 'border-blue-500 bg-blue-500/10 text-white'
                          : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Biggest pain point */}
            {step === 2 && (
              <div>
                <p className="text-white font-semibold mb-5">What's your biggest admin challenge right now?</p>
                <div className="space-y-3 mb-6">
                  {PAIN_POINTS.map((point) => (
                    <button
                      key={point}
                      onClick={() => { setPainPoint(point); setStep(3); }}
                      className={`w-full text-left px-5 py-4 rounded-xl border transition-all ${
                        painPoint === point
                          ? 'border-blue-500 bg-blue-500/10 text-white'
                          : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {point}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              </div>
            )}

            {/* Step 3: Contact */}
            {step === 3 && (
              <form onSubmit={handleSubmit}>
                <p className="text-white font-semibold mb-5">Where should we send your audit report?</p>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Full Name <span className="text-red-400">*</span></label>
                    <input
                      required
                      type="text"
                      value={contact.fullName}
                      onChange={(e) => setContact({ ...contact, fullName: e.target.value })}
                      placeholder="John Smith"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Email <span className="text-red-400">*</span></label>
                    <input
                      required
                      type="email"
                      value={contact.email}
                      onChange={(e) => setContact({ ...contact, email: e.target.value })}
                      placeholder="john@clinic.com"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Clinic Name <span className="text-red-400">*</span></label>
                    <input
                      required
                      type="text"
                      value={contact.clinicName}
                      onChange={(e) => setContact({ ...contact, clinicName: e.target.value })}
                      placeholder="Smith Physiotherapy"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Phone <span className="text-gray-600">(optional)</span></label>
                    <input
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                      placeholder="+27 82 000 0000"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 mb-3"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                  ) : (
                    'Request Free Practice Audit'
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update App.tsx to use PracticeHealthCheckForm**

Replace the `AuditRequestForm` import and usage:

```tsx
import { useState } from 'react';
import Hero from './components/Hero';
import WhoItsFor from './components/WhoItsFor';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import PatientCalculator from './components/PatientCalculator';
import Process from './components/Process';
import SpecialtyCloud from './components/SpecialtyCloud';
import ImpactSnapshots from './components/ImpactSnapshots';
import AuditOffer from './components/AuditOffer';
import WhatHappensNext from './components/WhatHappensNext';
import FinalCTA from './components/FinalCTA';
import StickyHeader from './components/StickyHeader';
import PracticeHealthCheckForm from './components/PracticeHealthCheckForm';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen text-white relative">
      <div className="mesh-bg fixed inset-0 -z-10" />
      <StickyHeader onOpenForm={() => setIsFormOpen(true)} />
      <Hero onOpenForm={() => setIsFormOpen(true)} />
      <WhoItsFor />
      <BeforeAfterSlider />
      <PatientCalculator />
      <Process />
      <SpecialtyCloud />
      <ImpactSnapshots />
      <AuditOffer onOpenForm={() => setIsFormOpen(true)} />
      <WhatHappensNext />
      <FinalCTA onOpenForm={() => setIsFormOpen(true)} />

      <footer className="py-8 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p>AI Automation Agency for Physiotherapy Practices</p>
        </div>
      </footer>

      <PracticeHealthCheckForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  );
}

export default App;
```

Note: `AuditRequestForm.tsx` can be deleted after this step: `git rm src/components/AuditRequestForm.tsx`

- [ ] **Step 3: Verify**

Click "Request a Free Practice Audit" anywhere on the page. The modal should open on Step 1 with 3 practice type cards. Clicking one should advance to Step 2 (pain points). Selecting a pain point advances to Step 3 (contact form). The blue progress bar should fill across 3 segments. Submitting should show the green success state.

- [ ] **Step 4: Commit**

```bash
git rm src/components/AuditRequestForm.tsx
git add src/components/PracticeHealthCheckForm.tsx src/App.tsx
git commit -m "feat: replace single form with 3-step practice health check"
```

---

## Task 8: Exit-Intent Modal

**Files:**
- Create: `src/hooks/useExitIntent.ts`
- Create: `src/components/ExitIntentModal.tsx`
- Modify: `src/App.tsx`

Fires once per session when the user's mouse moves toward the top of the viewport (leaving behaviour). Offers a free guide — simulated submit only.

- [ ] **Step 1: Create useExitIntent.ts**

```ts
import { useEffect } from 'react';

export function useExitIntent(callback: () => void) {
  useEffect(() => {
    if (sessionStorage.getItem('exitIntentShown')) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5) {
        sessionStorage.setItem('exitIntentShown', 'true');
        callback();
      }
    };

    // Small delay so it doesn't fire immediately on page load
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [callback]);
}
```

- [ ] **Step 2: Create ExitIntentModal.tsx**

```tsx
import { useState } from 'react';
import { X, Loader2, CheckCircle } from 'lucide-react';

interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenMainForm: () => void;
}

export default function ExitIntentModal({ isOpen, onClose, onOpenMainForm }: ExitIntentModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = async () => {
    if (!email) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSubmitting(false);
    setIsDone(true);
    setTimeout(() => { onClose(); setIsDone(false); setEmail(''); }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-[60] animate-fade-in">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-md w-full p-8 relative animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isDone ? (
          <div className="text-center py-4">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <p className="text-white font-bold text-lg">Guide on its way!</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="inline-block bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                Free Resource
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Before you go — get the free guide
              </h3>
              <p className="text-gray-300 leading-relaxed">
                <span className="text-white font-semibold">5 Admin Tasks Physio Clinics Can Automate Today.</span>
                {' '}No fluff, no sales pitch — just the five highest-impact automations for clinic owners.
              </p>
            </div>

            <div className="flex gap-3 mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !email}
                className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold px-5 py-3 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Me the Guide'}
              </button>
            </div>

            <button
              onClick={() => { onClose(); onOpenMainForm(); }}
              className="w-full text-center text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              I'd rather book the full audit →
            </button>

            <button
              onClick={onClose}
              className="w-full text-center text-gray-500 hover:text-gray-400 text-xs mt-2 transition-colors"
            >
              No thanks
            </button>
          </>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Add ExitIntentModal to App.tsx**

Final complete App.tsx:

```tsx
import { useState, useCallback } from 'react';
import Hero from './components/Hero';
import WhoItsFor from './components/WhoItsFor';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import PatientCalculator from './components/PatientCalculator';
import Process from './components/Process';
import SpecialtyCloud from './components/SpecialtyCloud';
import ImpactSnapshots from './components/ImpactSnapshots';
import AuditOffer from './components/AuditOffer';
import WhatHappensNext from './components/WhatHappensNext';
import FinalCTA from './components/FinalCTA';
import StickyHeader from './components/StickyHeader';
import PracticeHealthCheckForm from './components/PracticeHealthCheckForm';
import ExitIntentModal from './components/ExitIntentModal';
import { useExitIntent } from './hooks/useExitIntent';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  const openForm = useCallback(() => setIsFormOpen(true), []);

  useExitIntent(useCallback(() => setIsExitModalOpen(true), []));

  return (
    <div className="min-h-screen text-white relative">
      <div className="mesh-bg fixed inset-0 -z-10" />
      <StickyHeader onOpenForm={openForm} />
      <Hero onOpenForm={openForm} />
      <WhoItsFor />
      <BeforeAfterSlider />
      <PatientCalculator />
      <Process />
      <SpecialtyCloud />
      <ImpactSnapshots />
      <AuditOffer onOpenForm={openForm} />
      <WhatHappensNext />
      <FinalCTA onOpenForm={openForm} />

      <footer className="py-8 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p>AI Automation Agency for Physiotherapy Practices</p>
        </div>
      </footer>

      <PracticeHealthCheckForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />

      <ExitIntentModal
        isOpen={isExitModalOpen}
        onClose={() => setIsExitModalOpen(false)}
        onOpenMainForm={() => { setIsExitModalOpen(false); setIsFormOpen(true); }}
      />
    </div>
  );
}

export default App;
```

- [ ] **Step 4: Verify**

Open dev tools → Application → Session Storage. Clear it. Move your mouse quickly to the very top of the browser window (as if closing the tab). After 3 seconds from page load, the exit-intent modal should appear. Entering an email and clicking "Send" should show the checkmark. Clicking "I'd rather book the full audit" should close this modal and open the main form. The modal should NOT re-appear if you trigger it a second time (sessionStorage gate).

- [ ] **Step 5: Final full-page check**

Scroll through the entire page top to bottom. Verify:
- Typewriter cycles through 4 words
- Sticky header appears on scroll with progress bar
- Before/After slider is draggable
- Calculator sliders update results live
- WhoItsFor, Process, AuditOffer, WhatHappensNext, FinalCTA all present
- Specialty cloud and Impact Snapshots appear before AuditOffer
- Every "Request Audit" button opens the 3-step form
- Exit-intent fires once on mouse-leave

- [ ] **Step 6: Commit**

```bash
git add src/hooks/useExitIntent.ts src/components/ExitIntentModal.tsx src/App.tsx
git commit -m "feat: add exit-intent modal with guide offer"
```

---

## Implementation Complete

All 8 tasks done. Run `npm run build` to verify no TypeScript errors before deploying.

```bash
npm run build
```

Expected: no errors, `dist/` folder generated. Then deploy via Vercel dashboard.
