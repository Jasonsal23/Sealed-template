import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import EnvelopeCathedral from './components/EnvelopeCathedral';
import LandingCathedral from './components/LandingCathedral';

export default function App() {
  const [stage, setStage] = useState('sealed'); // 'sealed' | 'landing'

  useEffect(() => {
    document.title = 'Isabella & Matteo — Save the Date · June 12, 2027';
  }, []);

  return (
    <AnimatePresence mode="wait">
      {stage === 'sealed' ? (
        <EnvelopeCathedral key="envelope" onComplete={() => setStage('landing')} />
      ) : (
        <LandingCathedral key="landing" />
      )}
    </AnimatePresence>
  );
}
