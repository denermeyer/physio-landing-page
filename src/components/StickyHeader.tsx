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
