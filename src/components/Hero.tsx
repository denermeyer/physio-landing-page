const WORDS = [
  'manual booking',
  'no-show follow-ups',
  'scattered records',
  'billing admin',
  'paper intake forms',
  'appointment reminders',
  'staff scheduling',
  'insurance claims',
  'patient waitlists',
  'compliance paperwork',
];

interface HeroProps {
  onOpenForm: () => void;
}

export default function Hero({ onOpenForm }: HeroProps) {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in">
          Your clinic is still losing hours to{' '}
          <span className="inline-block overflow-hidden h-[1.15em] align-bottom">
            <span className="slot-strip">
              {[...WORDS, WORDS[0]].map((word, i) => (
                <span
                  key={i}
                  className="block h-[1.15em] leading-[1.15em] bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
                >
                  {word}
                </span>
              ))}
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
