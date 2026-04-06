import { useState } from 'react';
import Hero from './components/Hero';
import WhoItsFor from './components/WhoItsFor';
import Process from './components/Process';
import AuditOffer from './components/AuditOffer';
import WhatHappensNext from './components/WhatHappensNext';
import FinalCTA from './components/FinalCTA';
import AuditRequestForm from './components/AuditRequestForm';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white">
      <Hero onOpenForm={() => setIsFormOpen(true)} />
      <WhoItsFor />
      <Process />
      <AuditOffer onOpenForm={() => setIsFormOpen(true)} />
      <WhatHappensNext />
      <FinalCTA onOpenForm={() => setIsFormOpen(true)} />

      <footer className="py-8 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p>AI Automation Agency for Physiotherapy Practices</p>
        </div>
      </footer>

      <AuditRequestForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  );
}

export default App;
