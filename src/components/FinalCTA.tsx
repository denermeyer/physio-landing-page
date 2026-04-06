import { useReveal } from '../hooks/useReveal';

interface FinalCTAProps {
  onOpenForm: () => void;
}

export default function FinalCTA({ onOpenForm }: FinalCTAProps) {
  const sectionRef = useReveal();
  return (
    <section ref={sectionRef} className="py-32 px-6 reveal">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
          Ready to see{' '}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            what's possible
          </span>{' '}
          for your practice?
        </h2>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Request a free practice automation audit. No obligation, no sales pitch—just actionable insights specific to your operations.
        </p>
        <button
          onClick={onOpenForm}
          className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-12 py-5 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/50"
        >
          Request a Free Practice Audit
        </button>
      </div>
    </section>
  );
}
