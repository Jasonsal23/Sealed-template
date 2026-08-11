import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import SpiderWebScene from './components/SpiderWebScene';
import LandingSpider from './components/LandingSpider';

export default function App() {
  const [stage, setStage] = useState('web'); // 'web' | 'landing'

  useEffect(() => {
    document.title = 'Miles & Gwen — Save the Date · September 4, 2027';
  }, []);

  return (
    <AnimatePresence mode="wait">
      {stage === 'web' ? (
        <SpiderWebScene key="web" onComplete={() => setStage('landing')} />
      ) : (
        <LandingSpider key="landing" />
      )}
    </AnimatePresence>
  );
}
