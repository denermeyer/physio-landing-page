import { useState, useCallback } from 'react';
import Hero from './components/Hero';
import WhoItsFor from './components/WhoItsFor';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import PatientCalculator from './components/PatientCalculator';
import Process from './components/Process';
import SpecialtyCloud from './components/SpecialtyCloud';
import ImpactSnapshots from './components/ImpactSnapshots';
import AuditOffer from './components/AuditOffer';
import WhatHappensNext from './components/WhatHappensNext';
import FinalCTA from './components/FinalCTA';
import StickyHeader from './components/StickyHeader';
import PracticeHealthCheckForm from './components/PracticeHealthCheckForm';
import ExitIntentModal from './components/ExitIntentModal';
import { useExitIntent } from './hooks/useExitIntent';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  const openForm = useCallback(() => setIsFormOpen(true), []);

  useExitIntent(useCallback(() => setIsExitModalOpen(true), []));

  return (
    <div className="min-h-screen text-white relative">
      <div className="mesh-bg fixed inset-0 -z-10" />
      <StickyHeader onOpenForm={openForm} />
      <Hero onOpenForm={openForm} />
      <WhoItsFor />
      <BeforeAfterSlider />
      <PatientCalculator />
      <Process />
      <SpecialtyCloud />
      <ImpactSnapshots />
      <AuditOffer onOpenForm={openForm} />
      <WhatHappensNext />
      <FinalCTA onOpenForm={openForm} />

      <footer className="py-8 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p>AI Automation Agency for Physiotherapy Practices</p>
        </div>
      </footer>

      <PracticeHealthCheckForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />

      <ExitIntentModal
        isOpen={isExitModalOpen}
        onClose={() => setIsExitModalOpen(false)}
        onOpenMainForm={() => { setIsExitModalOpen(false); setIsFormOpen(true); }}
      />
    </div>
  );
}

export default App;
