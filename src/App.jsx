import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import WrittenInLightScene from './components/WrittenInLightScene';
import LandingV6 from './components/LandingV6';

export default function App() {
  const [stage, setStage] = useState('writing'); // 'writing' | 'landing'

  useEffect(() => {
    document.title = 'Vivienne & Callum — Save the Date · October 18, 2027';
  }, []);

  return (
    <AnimatePresence mode="wait">
      {stage === 'writing' ? (
        <WrittenInLightScene key="writing" onComplete={() => setStage('landing')} />
      ) : (
        <LandingV6 key="landing" />
      )}
    </AnimatePresence>
  );
}
