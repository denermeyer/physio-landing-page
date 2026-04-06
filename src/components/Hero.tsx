import { useState, useEffect, useCallback } from 'react';

const WORDS = ['manual booking', 'no-show follow-ups', 'scattered records', 'billing admin'];

interface HeroProps {
  onOpenForm: () => void;
}

export default function Hero({ onOpenForm }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const nextWord = useCallback(() => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentIndex((i) => (i + 1) % WORDS.length);
      setIsFlipping(false);
    }, 500);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextWord, 3000);
    return () => clearInterval(interval);
  }, [nextWord]);

  const nextIndex = (currentIndex + 1) % WORDS.length;

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in">
          Your clinic is still losing hours to{' '}
          <span className="inline-block overflow-hidden h-[1.15em] align-bottom relative">
            <span
              className={`inline-flex flex-col transition-transform duration-500 ease-in-out ${
                isFlipping ? '-translate-y-1/2' : 'translate-y-0'
              }`}
            >
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {WORDS[currentIndex]}
              </span>
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {WORDS[nextIndex]}
              </span>
            </span>
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
