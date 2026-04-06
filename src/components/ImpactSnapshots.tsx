import { useReveal } from '../hooks/useReveal';

const SNAPSHOTS = [
  {
    clinic: 'Sports Rehab Clinic',
    result: 'Reduced no-shows by 70%',
    detail: 'Automated SMS + WhatsApp reminders 48h and 2h before appointments.',
    metric: 70,
  },
  {
    clinic: 'Solo Practitioner',
    result: 'Reclaimed 8 hours/week',
    detail: 'Eliminated manual booking calls, patient intake forms, and end-of-day admin.',
    metric: 80,
  },
  {
    clinic: 'Multi-Room Physio Practice',
    result: '+40% patient capacity',
    detail: 'Grew appointment volume without hiring extra admin staff.',
    metric: 40,
  },
];

export default function ImpactSnapshots() {
  const sectionRef = useReveal();

  return (
    <section ref={sectionRef} className="py-12 px-6 reveal">
      <div className="max-w-5xl mx-auto">
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest text-center mb-8">
          Illustrative results — based on typical automation outcomes
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {SNAPSHOTS.map((s) => (
            <div
              key={s.clinic}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-blue-500/30 transition-colors"
            >
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-3">
                {s.clinic}
              </p>
              <p className="text-white font-bold text-lg mb-2">{s.result}</p>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{s.detail}</p>

              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"
                  style={{ width: `${s.metric}%` }}
                />
              </div>
              <p className="text-right text-xs text-blue-400 mt-1 font-semibold">{s.metric}%</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
