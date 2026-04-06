import { Calendar, MessageCircle, ClipboardList, UserCheck } from 'lucide-react';

export default function WhatHappensNext() {
  const steps = [
    {
      icon: Calendar,
      title: 'We schedule a brief intro call',
      description: 'A 15-minute conversation to understand your practice, current challenges, and confirm the audit is a good fit.',
      timeline: 'Within 24-48 hours'
    },
    {
      icon: MessageCircle,
      title: 'No sales pitch, just questions',
      description: 'We ask about your workflows, tools, team structure, and pain points. This is about understanding, not selling.',
      timeline: 'During intro call'
    },
    {
      icon: ClipboardList,
      title: 'You receive clear recommendations',
      description: 'A detailed report outlining automation opportunities, estimated time savings, and implementation considerations.',
      timeline: '3-5 business days'
    },
    {
      icon: UserCheck,
      title: 'You decide what makes sense',
      description: 'Review the audit, ask questions, and determine next steps on your timeline. Zero pressure to move forward.',
      timeline: 'Your timeline'
    }
  ];

  return (
    <section className="py-24 px-6 bg-black/40">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">
          What Happens Next
        </h2>
        <p className="text-xl text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          A transparent process from request to recommendations.
        </p>

        <div className="space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <div key={index} className="relative">
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-blue-500/50 transition-colors">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Icon className="w-7 h-7 text-blue-400" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-semibold text-blue-400">
                          Step {index + 1}
                        </span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{step.timeline}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {!isLast && (
                  <div className="w-0.5 h-6 bg-gray-800 ml-[27px] my-1" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
