import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';

export default function PatientCalculator() {
  const [patients, setPatients] = useState(50);
  const [sessionFee, setSessionFee] = useState(600);
  const [adminHours, setAdminHours] = useState(8);
  const sectionRef = useReveal();

  const hoursRecoveredPerMonth = Math.round(adminHours * 4 * 0.6);
  const revenueEquivalent = hoursRecoveredPerMonth * sessionFee;
  const extraPatients = Math.round(hoursRecoveredPerMonth * 0.8);

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-black/40 reveal">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Interactive Calculator
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What's your admin{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              costing you?
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Adjust the sliders to see how much time and revenue your clinic could recover.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Sliders */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-white font-semibold">Active Patients</label>
                  <span className="text-blue-400 font-bold">{patients}</span>
                </div>
                <input
                  type="range" min={10} max={200} step={5}
                  value={patients}
                  onChange={(e) => setPatients(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>10</span><span>200</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-white font-semibold">Avg Session Fee</label>
                  <span className="text-blue-400 font-bold">R{sessionFee}</span>
                </div>
                <input
                  type="range" min={200} max={2000} step={50}
                  value={sessionFee}
                  onChange={(e) => setSessionFee(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>R200</span><span>R2,000</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-white font-semibold">Admin Hours / Week</label>
                  <span className="text-blue-400 font-bold">{adminHours}h</span>
                </div>
                <input
                  type="range" min={1} max={20} step={1}
                  value={adminHours}
                  onChange={(e) => setAdminHours(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1h</span><span>20h</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="flex flex-col justify-center gap-6">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-blue-400 mb-1">{hoursRecoveredPerMonth}h</div>
                <div className="text-gray-300 text-sm">hours recovered per month</div>
              </div>
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-1">R{revenueEquivalent.toLocaleString()}</div>
                <div className="text-gray-300 text-sm">revenue equivalent per month</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-white mb-1">+{extraPatients}</div>
                <div className="text-gray-300 text-sm">additional patients per month</div>
              </div>
              <p className="text-xs text-gray-500 text-center">
                Based on a 60% admin reduction — a conservative estimate for fully automated practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
