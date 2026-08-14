import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import EnvelopeNoir from './components/EnvelopeNoir';
import LandingNoir from './components/LandingNoir';

export default function App() {
  const [stage, setStage] = useState('envelope'); // 'envelope' | 'landing'

  useEffect(() => {
    document.title = 'Serena & Dorian — Save the Date · November 6, 2027';
  }, []);

  return (
    <AnimatePresence mode="wait">
      {stage === 'envelope' ? (
        <EnvelopeNoir key="envelope" onComplete={() => setStage('landing')} />
      ) : (
        <LandingNoir key="landing" />
      )}
    </AnimatePresence>
  );
}
