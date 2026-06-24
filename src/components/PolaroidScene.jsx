import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import wedding from '../data/wedding';

export default function PolaroidScene({ onRevealed }) {
  const [stage, setStage] = useState('idle'); // idle | developing | departing
  const [fontsReady, setFontsReady] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    document.fonts.ready.then(() => setFontsReady(true));
  }, []);

  const handleTap = () => {
    if (stage !== 'idle') return;
    if (prefersReduced) { onRevealed(); return; }
    setStage('developing');
    setTimeout(() => setStage('departing'), 2300);
    setTimeout(onRevealed, 3200);
  };

  const isDeparting = stage === 'departing';
  const isIdle = stage === 'idle';

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--cream)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.75rem',
      }}
    >
      {/* Script greeting above */}
      <motion.p
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          color: 'var(--espresso)',
          margin: 0,
          lineHeight: 1,
        }}
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: fontsReady ? (isDeparting ? 0 : 1) : 0,
          y: isDeparting ? -20 : 0,
        }}
        transition={{ duration: isDeparting ? 0.35 : 0.7 }}
      >
        {wedding.envelopeIntro}
      </motion.p>

      {/* Polaroid frame */}
      <motion.div
        role="button"
        aria-label="Tap to develop your invitation photo"
        tabIndex={0}
        onClick={handleTap}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleTap()}
        style={{
          width: 'min(265px, 74vw)',
          backgroundColor: '#ffffff',
          padding: '12px 12px 62px',
          boxShadow: '0 8px 48px rgba(30,22,18,0.16), 0 2px 8px rgba(30,22,18,0.08)',
          cursor: isIdle ? 'pointer' : 'default',
          userSelect: 'none',
          outline: 'none',
          position: 'relative',
        }}
        animate={
          isDeparting
            ? { rotate: 12, y: '130vh', opacity: 0 }
            : { rotate: -3 }
        }
        transition={
          isDeparting
            ? { duration: 0.9, ease: [0.4, 0, 1, 1] }
            : { type: 'spring', stiffness: 90, damping: 16 }
        }
        whileHover={isIdle ? { rotate: -1, scale: 1.025, boxShadow: '0 14px 56px rgba(30,22,18,0.22)' } : {}}
        whileFocus={{ outlineOffset: '4px' }}
      >
        {/* Photo area */}
        <div style={{ width: '100%', aspectRatio: '1', overflow: 'hidden', position: 'relative' }}>
          <motion.img
            src={wedding.polaroidImage}
            alt={`${wedding.partnerA} and ${wedding.partnerB}`}
            loading="eager"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            animate={{
              filter: isIdle
                ? 'brightness(1.95) saturate(0.04) blur(3px) contrast(0.6)'
                : 'brightness(1) saturate(1) blur(0px) contrast(1)',
            }}
            transition={{ duration: 1.6, ease: [0.25, 0, 0.45, 1] }}
          />
          {/* Development sheen sweep */}
          <motion.div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)',
              pointerEvents: 'none',
            }}
            animate={
              stage === 'developing'
                ? { x: ['100%', '-100%'], opacity: [0, 1, 0] }
                : { opacity: 0 }
            }
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
          />
        </div>

        {/* Polaroid caption */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '62px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
          }}
        >
          <span
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: '1.6rem',
              color: '#3d2e27',
              lineHeight: 1,
            }}
          >
            {wedding.partnerA} & {wedding.partnerB}
          </span>
          <span
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: '0.56rem',
              color: '#9a8a82',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}
          >
            March 2027
          </span>
        </div>

        {/* Idle: subtle rose pulse border */}
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            boxShadow: 'inset 0 0 0 2px var(--rose)',
            opacity: 0,
            pointerEvents: 'none',
          }}
          animate={isIdle ? { opacity: [0, 0.28, 0] } : { opacity: 0 }}
          transition={{
            duration: 2.6,
            repeat: isIdle ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Tap prompt */}
      <motion.p
        style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: '0.68rem',
          color: 'var(--rose)',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          margin: 0,
        }}
        animate={
          !isIdle
            ? { opacity: 0, y: 6 }
            : { opacity: [0.45, 1, 0.45] }
        }
        transition={
          !isIdle
            ? { duration: 0.3 }
            : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        {wedding.envelopePrompt}
      </motion.p>
    </motion.div>
  );
}
