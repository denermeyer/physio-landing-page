interface FinalCTAProps {
  onOpenForm: () => void;
}

export default function FinalCTA({ onOpenForm }: FinalCTAProps) {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Ready to see what's possible for your practice?
        </h2>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Request a free practice automation audit. No obligation, no sales pitch—just actionable insights specific to your operations.
        </p>
        <button
          onClick={onOpenForm}
          className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-12 py-5 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Request a Free Practice Audit
        </button>
      </div>
    </section>
  );
}
