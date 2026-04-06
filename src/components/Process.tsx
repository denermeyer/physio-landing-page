import { Search, AlertCircle, Wrench, Handshake } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

export default function Process() {
  const sectionRef = useReveal();
  const steps = [
    {
      icon: Search,
      title: 'Understand Current Systems',
      description: 'We map your existing workflows, software tools, and pain points. No assumptions—just detailed observation of how your practice actually operates today.'
    },
    {
      icon: AlertCircle,
      title: 'Identify Bottlenecks',
      description: 'We pinpoint where time is wasted, where errors occur, and where manual processes create friction. Focus on impact, not complexity.'
    },
    {
      icon: Wrench,
      title: 'Design Practical Automations',
      description: 'We build solutions specific to your practice. Each automation addresses a real problem, integrates with your systems, and requires minimal disruption.'
    },
    {
      icon: Handshake,
      title: 'Collaborative Decision-Making',
      description: 'You stay in control. We present options, explain trade-offs, and implement only what makes sense for your practice. No forced solutions.'
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-black/40 reveal">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">
          Our Process
        </h2>
        <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
          A systematic approach to understanding your practice and building automation that actually works.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 hover:border-blue-500/50 transition-all hover:transform hover:scale-105"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-400 font-semibold mb-2">
                      Step {index + 1}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed pl-[72px]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
