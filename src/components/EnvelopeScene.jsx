import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import WaxSeal from './WaxSeal';
import wedding from '../data/wedding';

export default function EnvelopeScene({ onRevealed }) {
  const [stage, setStage] = useState('sealed'); // sealed | flapping | rising | takeover
  const [fontsReady, setFontsReady] = useState(false);
  const prefersReduced = useReducedMotion();

  // Wait for Pinyon Script to load before animating in the script text
  useEffect(() => {
    document.fonts.ready.then(() => setFontsReady(true));
  }, []);

  const handleOpen = () => {
    if (stage !== 'sealed') return;

    if (prefersReduced) {
      onRevealed();
      return;
    }

    // Flap opens immediately (seal fades with it), then letter rises
    setStage('flapping');
    setTimeout(() => setStage('rising'), 1100);
    setTimeout(() => setStage('takeover'), 2000);
    setTimeout(() => onRevealed(), 2650);
  };

  const isOpen = stage !== 'sealed';

  return (
    <motion.div
      className="envelope-scene"
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--cream)',
        gap: '1rem',
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Script intro — only animates in after fonts are ready */}
      <motion.p
        className="font-script"
        style={{
          color: 'var(--ink)',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          marginBottom: '0.5rem',
          margin: 0,
        }}
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: fontsReady && stage !== 'takeover' ? 1 : 0,
          y: fontsReady ? 0 : -10,
        }}
        transition={{ duration: 0.7, delay: fontsReady ? 0.15 : 0, ease: 'easeOut' }}
      >
        {wedding.envelopeIntro}
      </motion.p>

      {/* Envelope wrapper */}
      <motion.div
        style={{
          position: 'relative',
          width: 'min(380px, 90vw)',
          aspectRatio: '1.6 / 1',
          perspective: '1200px',
        }}
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.75, ease: 'easeOut', delay: 0.1 }}
      >

        {/* Envelope body */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'var(--parchment)',
            borderRadius: '3px',
            boxShadow: 'inset 0 0 40px rgba(26,40,32,0.07), 0 8px 40px rgba(26,40,32,0.2)',
            border: '1px solid rgba(168,124,58,0.22)',
            overflow: 'hidden',
          }}
        >
          {/* V-fold crease lines */}
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.14 }}
            viewBox="0 0 380 238"
            preserveAspectRatio="none"
          >
            <line x1="0" y1="238" x2="190" y2="119" stroke="var(--gold)" strokeWidth="1" />
            <line x1="380" y1="238" x2="190" y2="119" stroke="var(--gold)" strokeWidth="1" />
            <line x1="0" y1="0" x2="190" y2="119" stroke="var(--gold)" strokeWidth="1" />
          </svg>
          {/* Inner gold border */}
          <div style={{
            position: 'absolute',
            inset: '6px',
            border: '0.5px solid rgba(168,124,58,0.28)',
            borderRadius: '2px',
          }} />
        </div>

        {/* Back flap — 3D rotates open; seal is a child so it folds up with it */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '55%',
            transformOrigin: 'top center',
            transformStyle: 'preserve-3d',
            zIndex: 10,
          }}
          animate={isOpen ? { rotateX: -180, opacity: stage === 'takeover' ? 0 : 1 } : { rotateX: 0 }}
          transition={{ duration: 0.95, ease: [0.22, 0.61, 0.36, 1] }}
        >
          {/* Flap triangle */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <svg
              viewBox="0 0 380 210"
              style={{ width: '100%', height: '100%' }}
              preserveAspectRatio="none"
            >
              <polygon
                points="0,0 380,0 190,210"
                fill="var(--parchment)"
                stroke="rgba(168,124,58,0.22)"
                strokeWidth="1"
              />
              <polygon points="0,0 380,0 190,210" fill="rgba(26,40,32,0.03)" />
            </svg>
          </div>

          {/* Wax seal — attached to the flap at the seam, rotates up with it on open */}
          <div
            style={{
              position: 'absolute',
              bottom: '-60px',
              left: '50%',
              transform: 'translateX(-50%)',
              pointerEvents: isOpen ? 'none' : 'auto',
            }}
          >
            <WaxSeal onOpen={handleOpen} isOpening={isOpen} />
          </div>
        </motion.div>

        {/* Letter — rises out */}
        <AnimatePresence>
          {(stage === 'rising' || stage === 'takeover') && (
            <motion.div
              key="letter"
              style={{
                position: 'absolute',
                left: '8%',
                right: '8%',
                bottom: '10%',
                backgroundColor: 'var(--parchment)',
                borderRadius: '2px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
                gap: '0.5rem',
                boxShadow: '0 12px 50px rgba(26,40,32,0.22)',
                border: '1px solid rgba(168,124,58,0.28)',
                textAlign: 'center',
                zIndex: 20,
              }}
              initial={{ y: 60, opacity: 0, scale: 0.92 }}
              animate={
                stage === 'takeover'
                  ? { y: 0, opacity: 1, scale: 3.5, filter: 'blur(4px)' }
                  : { y: -95, opacity: 1, scale: 1 }
              }
              exit={{ opacity: 0 }}
              transition={{
                duration: stage === 'takeover' ? 0.55 : 0.88,
                ease: stage === 'takeover' ? 'easeIn' : [0.22, 0.61, 0.36, 1],
              }}
            >
              <p className="font-body" style={{ color: 'var(--gold)', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', margin: 0 }}>
                {wedding.letterGreeting}
              </p>
              <p className="font-script" style={{ color: 'var(--ink)', fontSize: 'clamp(1.1rem, 3vw, 1.6rem)', margin: 0 }}>
                {wedding.letterLine}
              </p>
              <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--gold)', opacity: 0.45 }} />
              <p className="font-display" style={{ color: 'var(--ink)', fontSize: 'clamp(1.3rem, 3.5vw, 2rem)', fontStyle: 'italic', margin: 0 }}>
                {wedding.partnerA} &amp; {wedding.partnerB}
              </p>
              <p className="font-body" style={{ color: 'var(--gold)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>
                {wedding.dateDisplay.replace('Saturday, the ', '').replace(' of ', ' ')} · {wedding.date.slice(0, 4)}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>

      {/* Prompt */}
      <motion.p
        className="font-body"
        style={{
          color: 'var(--gold)',
          fontSize: '0.72rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginTop: '0.5rem',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: fontsReady && stage === 'sealed' ? 1 : 0 }}
        transition={{ duration: 0.6, delay: fontsReady ? 0.7 : 0 }}
      >
        {wedding.envelopePrompt}
      </motion.p>
    </motion.div>
  );
}
