import { useState, FormEvent } from 'react';
import { X, Loader2, CheckCircle, ChevronLeft } from 'lucide-react';

interface PracticeHealthCheckFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRACTICE_TYPES = [
  'Solo practitioner',
  'Small team (2–5 practitioners)',
  'Multi-location / large practice',
];

const PAIN_POINTS = [
  'Appointment no-shows & cancellations',
  'Manual booking & scheduling',
  'Patient follow-up & retention',
  'Billing & payment collection',
  'Scattered records & paperwork',
];

const EMPTY_CONTACT = { fullName: '', email: '', clinicName: '', phone: '' };

export default function PracticeHealthCheckForm({ isOpen, onClose }: PracticeHealthCheckFormProps) {
  const [step, setStep] = useState(1);
  const [practiceType, setPracticeType] = useState('');
  const [painPoint, setPainPoint] = useState('');
  const [contact, setContact] = useState(EMPTY_CONTACT);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const reset = () => {
    setStep(1);
    setPracticeType('');
    setPainPoint('');
    setContact(EMPTY_CONTACT);
    setIsSuccess(false);
  };

  const handleClose = () => { reset(); onClose(); };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => { handleClose(); }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-lg w-full animate-scale-in">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <h2 className="text-xl font-bold text-white">Practice Health Check</h2>
            {!isSuccess && (
              <p className="text-gray-400 text-sm mt-0.5">Step {step} of 3</p>
            )}
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        {!isSuccess && (
          <div className="flex gap-2 px-6 pt-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  s <= step ? 'bg-blue-500' : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        )}

        {/* Success state */}
        {isSuccess ? (
          <div className="p-10 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Request Submitted!</h3>
            <p className="text-gray-300">We'll be in touch within 24–48 hours.</p>
          </div>
        ) : (
          <div className="p-6">

            {/* Step 1: Practice type */}
            {step === 1 && (
              <div>
                <p className="text-white font-semibold mb-5">What best describes your practice?</p>
                <div className="space-y-3">
                  {PRACTICE_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => { setPracticeType(type); setStep(2); }}
                      className={`w-full text-left px-5 py-4 rounded-xl border transition-all ${
                        practiceType === type
                          ? 'border-blue-500 bg-blue-500/10 text-white'
                          : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Pain point */}
            {step === 2 && (
              <div>
                <p className="text-white font-semibold mb-5">What's your biggest admin challenge right now?</p>
                <div className="space-y-3 mb-6">
                  {PAIN_POINTS.map((point) => (
                    <button
                      key={point}
                      onClick={() => { setPainPoint(point); setStep(3); }}
                      className={`w-full text-left px-5 py-4 rounded-xl border transition-all ${
                        painPoint === point
                          ? 'border-blue-500 bg-blue-500/10 text-white'
                          : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {point}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              </div>
            )}

            {/* Step 3: Contact */}
            {step === 3 && (
              <form onSubmit={handleSubmit}>
                <p className="text-white font-semibold mb-5">Where should we send your audit report?</p>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Full Name <span className="text-red-400">*</span></label>
                    <input
                      required
                      type="text"
                      value={contact.fullName}
                      onChange={(e) => setContact({ ...contact, fullName: e.target.value })}
                      placeholder="John Smith"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Email <span className="text-red-400">*</span></label>
                    <input
                      required
                      type="email"
                      value={contact.email}
                      onChange={(e) => setContact({ ...contact, email: e.target.value })}
                      placeholder="john@clinic.com"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Clinic Name <span className="text-red-400">*</span></label>
                    <input
                      required
                      type="text"
                      value={contact.clinicName}
                      onChange={(e) => setContact({ ...contact, clinicName: e.target.value })}
                      placeholder="Smith Physiotherapy"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Phone <span className="text-gray-600">(optional)</span></label>
                    <input
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                      placeholder="+27 82 000 0000"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 mb-3"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                  ) : (
                    'Request Free Practice Audit'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
