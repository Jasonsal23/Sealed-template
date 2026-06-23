import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import WaxSeal from './WaxSeal';
import wedding from '../data/wedding';

export default function EnvelopeScene({ onRevealed }) {
  const [stage, setStage] = useState('sealed'); // sealed | cracking | flapping | rising | takeover
  const prefersReduced = useReducedMotion();

  const handleOpen = () => {
    if (stage !== 'sealed') return;

    if (prefersReduced) {
      onRevealed();
      return;
    }

    setStage('cracking');

    // Seal break ~0.5s → start flap
    setTimeout(() => setStage('flapping'), 500);
    // Flap open ~0.9s → letter rise
    setTimeout(() => setStage('rising'), 1300);
    // Letter rises ~0.9s → takeover
    setTimeout(() => setStage('takeover'), 2100);
    // Takeover expands → reveal landing
    setTimeout(() => onRevealed(), 2700);
  };

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
      {/* Script intro */}
      <motion.p
        className="font-script"
        style={{
          color: 'var(--ink)',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          marginBottom: '0.5rem',
          opacity: stage === 'takeover' ? 0 : 1,
          transition: 'opacity 0.4s',
        }}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: stage === 'takeover' ? 0 : 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {wedding.envelopeIntro}
      </motion.p>

      {/* Envelope wrapper */}
      <div style={{ position: 'relative', width: 'min(380px, 90vw)', aspectRatio: '1.6 / 1' }}>

        {/* Envelope body */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'var(--parchment)',
            borderRadius: '4px',
            boxShadow: 'inset 0 0 40px rgba(46,42,36,0.08), 0 8px 40px rgba(46,42,36,0.18)',
            border: '1px solid rgba(182,146,78,0.25)',
            overflow: 'hidden',
          }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* V-fold lines on the face */}
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }}
            viewBox="0 0 380 238"
            preserveAspectRatio="none"
          >
            <line x1="0" y1="238" x2="190" y2="119" stroke="#b6924e" strokeWidth="1" />
            <line x1="380" y1="238" x2="190" y2="119" stroke="#b6924e" strokeWidth="1" />
            <line x1="0" y1="0" x2="190" y2="119" stroke="#b6924e" strokeWidth="1" />
          </svg>

          {/* Gold thin border inner */}
          <div style={{
            position: 'absolute',
            inset: '6px',
            border: '0.5px solid rgba(182,146,78,0.3)',
            borderRadius: '2px',
          }} />
        </motion.div>

        {/* Back flap (3D flip) */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '55%',
            transformOrigin: 'top center',
            perspective: '1200px',
            transformStyle: 'preserve-3d',
            zIndex: 10,
          }}
          animate={
            stage === 'flapping' || stage === 'rising' || stage === 'takeover'
              ? { rotateX: -180, opacity: stage === 'takeover' ? 0 : 1 }
              : { rotateX: 0 }
          }
          transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Flap face (parchment triangle) */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <svg
              viewBox="0 0 380 210"
              style={{ width: '100%', height: '100%' }}
              preserveAspectRatio="none"
            >
              <polygon
                points="0,0 380,0 190,210"
                fill="var(--parchment)"
                stroke="rgba(182,146,78,0.25)"
                strokeWidth="1"
              />
              {/* Subtle shading for depth */}
              <polygon
                points="0,0 380,0 190,210"
                fill="rgba(46,42,36,0.04)"
              />
            </svg>
          </div>
        </motion.div>

        {/* Letter — rises out of envelope */}
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
                boxShadow: '0 12px 50px rgba(46,42,36,0.25)',
                border: '1px solid rgba(182,146,78,0.3)',
                textAlign: 'center',
                zIndex: 20,
              }}
              initial={{ y: 60, opacity: 0, scale: 0.92 }}
              animate={
                stage === 'takeover'
                  ? { y: 0, opacity: 1, scale: 3.5, filter: 'blur(4px)' }
                  : { y: -90, opacity: 1, scale: 1 }
              }
              exit={{ opacity: 0 }}
              transition={{
                duration: stage === 'takeover' ? 0.55 : 0.85,
                ease: stage === 'takeover' ? 'easeIn' : [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <p
                className="font-body"
                style={{ color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', margin: 0 }}
              >
                {wedding.letterGreeting}
              </p>
              <p
                className="font-script"
                style={{ color: 'var(--ink)', fontSize: 'clamp(1.1rem, 3vw, 1.6rem)', margin: 0 }}
              >
                {wedding.letterLine}
              </p>
              <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--gold)', opacity: 0.5 }} />
              <p
                className="font-display"
                style={{ color: 'var(--ink)', fontSize: 'clamp(1.3rem, 3.5vw, 2rem)', fontStyle: 'italic', margin: 0 }}
              >
                Eleanor &amp; Julian
              </p>
              <p
                className="font-body"
                style={{ color: 'var(--gold)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}
              >
                May 15, 2027
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wax seal — sits on flap seam */}
        <AnimatePresence>
          {stage === 'sealed' && (
            <motion.div
              key="seal"
              style={{
                position: 'absolute',
                top: '42%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 30,
              }}
              exit={
                prefersReduced
                  ? { opacity: 0 }
                  : { scale: 1.15, opacity: 0, y: -8, rotate: 5 }
              }
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <WaxSeal onOpen={handleOpen} isOpening={stage !== 'sealed'} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Prompt */}
      <motion.p
        className="font-body"
        style={{
          color: 'var(--gold)',
          fontSize: '0.75rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginTop: '0.5rem',
          opacity: stage === 'sealed' ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: stage === 'sealed' ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        {wedding.envelopePrompt}
      </motion.p>
    </motion.div>
  );
}
