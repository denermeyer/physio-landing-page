import { FileText, Target, Lightbulb } from 'lucide-react';

interface AuditOfferProps {
  onOpenForm: () => void;
}

export default function AuditOffer({ onOpenForm }: AuditOfferProps) {
  const benefits = [
    {
      icon: FileText,
      title: 'Current Workflow Analysis',
      description: 'Detailed review of your existing systems, tools, and processes'
    },
    {
      icon: Target,
      title: 'Bottleneck Identification',
      description: 'Clear documentation of where time is wasted and errors occur'
    },
    {
      icon: Lightbulb,
      title: 'Custom Recommendations',
      description: 'Practice-specific automation opportunities ranked by impact'
    }
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-12 md:p-16">
          <div className="text-center mb-12">
            <div className="inline-block bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Free, No Obligation
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Free Practice Automation Audit
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Get a comprehensive review of your current workflows and a clear roadmap of automation opportunities specific to your practice.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 text-center"
                >
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-8">
            <p className="text-gray-300 text-center leading-relaxed">
              <span className="font-semibold text-white">The audit has standalone value.</span> You'll receive actionable insights whether or not you decide to work with us. No sales pitch, no strings attached.
            </p>
          </div>

          <div className="text-center">
            <button
              onClick={onOpenForm}
              className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-12 py-5 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/50"
            >
              Request Your Free Audit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
