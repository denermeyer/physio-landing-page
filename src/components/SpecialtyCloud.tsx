import { useReveal } from '../hooks/useReveal';

const SPECIALTIES = [
  'Sports Rehab',
  'Post-Surgery Recovery',
  'Chronic Pain Management',
  'Women\'s Health',
  'Pediatric Physio',
  'Occupational Rehab',
  'Spinal & Neuro',
  'Dry Needling',
  'Hydrotherapy',
  'Musculoskeletal',
  'Pre & Post Natal',
  'Oncology Rehab',
];

export default function SpecialtyCloud() {
  const sectionRef = useReveal();

  return (
    <section ref={sectionRef} className="py-24 px-6 reveal">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-gray-500 text-sm font-semibold uppercase tracking-widest mb-8">
          Practices we work with
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          {SPECIALTIES.map((specialty) => (
            <span
              key={specialty}
              className="px-4 py-2 rounded-full border border-white/10 text-gray-300 text-sm font-medium bg-white/5 backdrop-blur-sm hover:border-blue-500/50 hover:text-white hover:-translate-y-0.5 transition-all duration-200 cursor-default"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
