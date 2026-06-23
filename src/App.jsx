import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import EnvelopeScene from './components/EnvelopeScene';
import Landing from './components/Landing';

export default function App() {
  const [stage, setStage] = useState('sealed'); // sealed | revealed
  const landingRef = useRef(null);

  const handleRevealed = () => {
    setStage('revealed');
  };

  // Move focus to landing heading when it mounts
  useEffect(() => {
    if (stage === 'revealed') {
      const heading = document.getElementById('landing-heading');
      if (heading) {
        setTimeout(() => heading.focus(), 100);
      }
    }
  }, [stage]);

  return (
    <AnimatePresence mode="wait">
      {stage === 'sealed' ? (
        <EnvelopeScene key="envelope" onRevealed={handleRevealed} />
      ) : (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Landing ref={landingRef} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
