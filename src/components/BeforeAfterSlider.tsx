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

  useEffect(() => {
    const getPos = (clientX: number) => {
      if (!containerRef.current) return 50;
      const rect = containerRef.current.getBoundingClientRect();
      return Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 5), 95);
    };

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
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pos = Math.min(Math.max(((e.touches[0].clientX - rect.left) / rect.width) * 100, 5), 95);
    setSliderPos(pos);
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
          {/* BEFORE (base layer, full width, manual workflow) */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-950 p-8 flex flex-col justify-center">
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

          {/* AFTER (top layer, clipped to sliderPos%) */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-950/60 to-gray-950 p-8 flex flex-col justify-center overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
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

          {/* Drag handle */}
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
