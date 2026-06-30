import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import ConstellationScene from './components/ConstellationScene';
import Landing from './components/Landing';
import wedding from './data/wedding';

export default function App() {
  const [stage, setStage] = useState('sealed');
  const landingRef = useRef(null);

  useEffect(() => {
    document.title = `${wedding.partnerA} & ${wedding.partnerB} — Save the Date`;
  }, []);

  const handleRevealed = () => setStage('revealed');

  useEffect(() => {
    if (stage === 'revealed') {
      const heading = document.getElementById('landing-heading');
      if (heading) setTimeout(() => heading.focus(), 100);
    }
  }, [stage]);

  return (
    <AnimatePresence mode="wait">
      {stage === 'sealed' ? (
        <ConstellationScene key="constellation" onRevealed={handleRevealed} />
      ) : (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <Landing ref={landingRef} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
