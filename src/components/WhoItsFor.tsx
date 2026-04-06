import { Check, X } from 'lucide-react';

export default function WhoItsFor() {
  const forItems = [
    'Clinic owners spending 10+ hours weekly on admin tasks',
    'Practices using 3+ disconnected software tools',
    'Teams copying patient data between systems manually',
    'Owners wanting to focus on patient care, not paperwork',
    'Clinics experiencing scheduling conflicts and double-bookings',
    'Practices ready to systematically improve operations'
  ];

  const notForItems = [
    'Large hospital groups with dedicated IT departments',
    'Fully automated clinics with integrated systems',
    'Those seeking quick fixes or overnight transformations',
    'Practices unwilling to evaluate current processes',
    'Clinics expecting automation without any involvement',
    'Those looking for generic software recommendations'
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          Who this is for
          <span className="text-gray-500"> (and who it isn't)</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 hover:border-blue-500/50 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Check className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">This is for you if...</h3>
            </div>
            <ul className="space-y-4">
              {forItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 hover:border-red-500/50 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                <X className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">This isn't for you if...</h3>
            </div>
            <ul className="space-y-4">
              {notForItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300">
                  <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
