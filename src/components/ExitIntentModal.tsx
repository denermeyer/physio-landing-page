import { useState } from 'react';
import { X, Loader2, CheckCircle } from 'lucide-react';

interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenMainForm: () => void;
}

export default function ExitIntentModal({ isOpen, onClose, onOpenMainForm }: ExitIntentModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = async () => {
    if (!email) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSubmitting(false);
    setIsDone(true);
    setTimeout(() => { onClose(); setIsDone(false); setEmail(''); }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-[60] animate-fade-in">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-modal-title"
        className="bg-gray-900 border border-gray-800 rounded-2xl max-w-md w-full p-8 relative animate-scale-in"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isDone ? (
          <div className="text-center py-4">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <p className="text-white font-bold text-lg">Guide on its way!</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="inline-block bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                Free Resource
              </div>
              <h3 id="exit-modal-title" className="text-2xl font-bold text-white mb-3">
                Before you go — get the free guide
              </h3>
              <p className="text-gray-300 leading-relaxed">
                <span className="text-white font-semibold">5 Admin Tasks Physio Clinics Can Automate Today.</span>
                {' '}No fluff, no sales pitch — just the five highest-impact automations for clinic owners.
              </p>
            </div>

            <div className="flex gap-3 mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !email}
                className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold px-5 py-3 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Me the Guide'}
              </button>
            </div>

            <button
              onClick={() => { onClose(); onOpenMainForm(); }}
              className="w-full text-center text-blue-400 hover:text-blue-300 text-sm transition-colors block mb-2"
            >
              I'd rather book the full audit →
            </button>

            <button
              onClick={onClose}
              className="w-full text-center text-gray-500 hover:text-gray-400 text-xs transition-colors block"
            >
              No thanks
            </button>
          </>
        )}
      </div>
    </div>
  );
}
