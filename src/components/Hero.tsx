interface HeroProps {
  onOpenForm: () => void;
}

export default function Hero({ onOpenForm }: HeroProps) {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in">
          Your practice shouldn't run on
          <span className="text-blue-400"> manual workarounds</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto animate-fade-in-delay-1">
          Physiotherapy clinic owners waste hours each week on repetitive admin, disconnected booking systems, and scattered patient records. Automation fixes this systematically.
        </p>
        <button
          onClick={onOpenForm}
          className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-10 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl animate-fade-in-delay-2"
        >
          Request a Free Practice Audit
        </button>
      </div>
    </section>
  );
}
