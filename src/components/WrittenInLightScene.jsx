import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'motion/react';
import wedding from '../data/wedding';

// Deterministic star field
function lcg(seed) {
  let s = seed >>> 0;
  return () => { s = (Math.imul(1664525, s) + 1013904223) >>> 0; return s / 0x100000000; };
}
const _r = lcg(31415);
const BG_STARS = Array.from({ length: 140 }, () => ({
  cx: `${_r() * 100}%`,
  cy: `${_r() * 100}%`,
  r: 0.3 + _r() * 1.2,
  opacity: 0.04 + _r() * 0.13,
}));

const PHRASES = [
  {
    id: 'invite',
    text: "You're invited",
    style: {
      fontFamily: "'Great Vibes', cursive",
      fontSize: 'clamp(2.4rem, 7vw, 5rem)',
      color: '#f5edd8',
      fontWeight: 400,
      lineHeight: 1.3,
    },
    startAt: 0.4,
    duration: 1.9,
  },
  {
    id: 'names',
    text: `${wedding.partnerA} & ${wedding.partnerB}`,
    style: {
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: 'clamp(3rem, 10vw, 7.5rem)',
      fontStyle: 'italic',
      fontWeight: 300,
      color: '#f5edd8',
      letterSpacing: '-0.01em',
      lineHeight: 1.1,
    },
    startAt: 3.0,
    duration: 2.5,
  },
  {
    id: 'date',
    text: wedding.writeDate,
    style: {
      fontFamily: "'Jost', sans-serif",
      fontSize: 'clamp(0.6rem, 1.8vw, 0.88rem)',
      color: '#c8a84c',
      letterSpacing: '0.25em',
      textTransform: 'uppercase',
      fontWeight: 400,
      lineHeight: 2.2,
    },
    startAt: 6.2,
    duration: 1.6,
  },
  {
    id: 'venue',
    text: `${wedding.venueName}  ·  ${wedding.venueCity}`,
    style: {
      fontFamily: "'Jost', sans-serif",
      fontSize: 'clamp(0.55rem, 1.4vw, 0.72rem)',
      color: 'rgba(245,237,216,0.35)',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      fontWeight: 300,
      lineHeight: 2.2,
    },
    startAt: 8.4,
    duration: 1.4,
  },
];

// ── PhraseReveal ────────────────────────────────────────────────────────────
function PhraseReveal({ phrase, skipAnimation, onMovePen, onDone }) {
  const ref = useRef(null);
  const progress = useMotionValue(0);
  const clipRight = useTransform(progress, [0, 1], ['100%', '0%']);
  const clipPath = useTransform(clipRight, r => `inset(0 ${r} 0 0)`);

  useEffect(() => {
    // Reduced-motion: skip to revealed immediately
    if (skipAnimation) {
      const t = setTimeout(() => {
        progress.set(1);
        onDone?.();
      }, phrase.startAt * 1000);
      return () => clearTimeout(t);
    }

    let stopFn = null;
    const timer = setTimeout(() => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();

      stopFn = animate(progress, 1, {
        duration: phrase.duration,
        ease: 'linear',
        onUpdate: (val) => {
          onMovePen(
            rect.left + rect.width * val,
            rect.top + rect.height * 0.68,
          );
        },
        onComplete: () => {
          onDone?.();
        },
      });
    }, phrase.startAt * 1000);

    return () => {
      clearTimeout(timer);
      stopFn?.();
    };
  }, []);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Invisible spacer — establishes layout + measurement ref */}
      <span
        ref={ref}
        style={{ ...phrase.style, opacity: 0, display: 'block', whiteSpace: 'nowrap' }}
        aria-hidden="true"
      >
        {phrase.text}
      </span>

      {/* Clip-path revealed text */}
      <motion.span
        style={{
          position: 'absolute',
          inset: 0,
          display: 'block',
          whiteSpace: 'nowrap',
          ...phrase.style,
          clipPath,
        }}
        aria-label={phrase.text}
      >
        {phrase.text}
      </motion.span>
    </div>
  );
}

// ── Main scene ──────────────────────────────────────────────────────────────
export default function WrittenInLightScene({ onComplete }) {
  const [fontsReady, setFontsReady] = useState(false);
  const [phase, setPhase] = useState('idle'); // idle | writing | done
  const penRef = useRef(null);
  const canvasRef = useRef(null);
  const spawnRef = useRef(null);
  const completedRef = useRef(0);
  const reducedMotion = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // Gate on font load to avoid FOUT on first phrase
  useEffect(() => {
    document.fonts.ready.then(() => setFontsReady(true));
  }, []);

  useEffect(() => {
    if (!fontsReady) return;
    const t = setTimeout(() => setPhase('writing'), 250);
    return () => clearTimeout(t);
  }, [fontsReady]);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    const ctx = canvas.getContext('2d');
    const particles = [];
    let animId;
    let lastT = performance.now();

    spawnRef.current = (x, y) => {
      for (let i = 0; i < 5; i++) {
        particles.push({
          x, y,
          vx: (Math.random() - 0.5) * 3,
          vy: -Math.random() * 2.5 - 0.5,
          life: 1,
          decay: 0.028 + Math.random() * 0.022,
          size: 1 + Math.random() * 2,
          hue: 38 + Math.random() * 20,
        });
      }
    };

    const frame = (t) => {
      const dt = Math.min((t - lastT) / 1000, 0.05);
      lastT = t;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gentle gravity
        p.life -= p.decay;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life * 0.8;
        ctx.fillStyle = `hsl(${p.hue}, 72%, ${52 + p.life * 22}%)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(frame);
    };

    animId = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', setSize);
    };
  }, []);

  // Direct DOM update for pen tip (avoids 60fps re-renders)
  const movePen = useCallback((x, y) => {
    const el = penRef.current;
    if (!el) return;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.opacity = '1';
    if (!reducedMotion.current) spawnRef.current?.(x, y);
  }, []);

  const hidePen = useCallback(() => {
    if (penRef.current) penRef.current.style.opacity = '0';
  }, []);

  const handlePhraseDone = useCallback(() => {
    hidePen();
    completedRef.current += 1;
    if (completedRef.current >= PHRASES.length) {
      setTimeout(() => setPhase('done'), 500);
    }
  }, [hidePen]);

  const handleTap = () => {
    if (phase !== 'done') return;
    onComplete();
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75 }}
      onClick={handleTap}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#090c15',
        cursor: phase === 'done' ? 'pointer' : 'default',
        overflow: 'hidden',
      }}
    >
      {/* Star field */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        aria-hidden="true"
      >
        {BG_STARS.map((s, i) => (
          <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="white" opacity={s.opacity} />
        ))}
      </svg>

      {/* Subtle center glow that grows as phrases appear */}
      <motion.div
        animate={phase === 'done' ? { opacity: 1 } : { opacity: 0.4 }}
        transition={{ duration: 2 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(200,168,76,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}
      />

      {/* Phrases */}
      {phase !== 'idle' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(0.1rem, 1vw, 0.5rem)',
            padding: 'clamp(2rem, 5vw, 4rem)',
            textAlign: 'center',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        >
          {PHRASES.map((phrase) => (
            <PhraseReveal
              key={phrase.id}
              phrase={phrase}
              skipAnimation={reducedMotion.current}
              onMovePen={movePen}
              onDone={handlePhraseDone}
            />
          ))}
        </div>
      )}

      {/* Glowing pen tip */}
      <div
        ref={penRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: '-100px',
          top: '-100px',
          transform: 'translate(-50%, -50%)',
          width: 20,
          height: 20,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(248,216,80,0.8) 30%, transparent 70%)',
          boxShadow:
            '0 0 8px 2px rgba(248,216,80,0.8), 0 0 20px 6px rgba(248,216,80,0.4), 0 0 50px 18px rgba(200,168,76,0.15)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          zIndex: 20,
        }}
      />

      {/* Tap prompt */}
      <AnimatePresence>
        {phase === 'done' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, delay: 0.6 }}
            style={{
              position: 'absolute',
              bottom: 'clamp(2rem, 5vw, 3.5rem)',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: "'Jost', sans-serif",
              fontSize: '0.56rem',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: 'rgba(200,168,76,0.45)',
              fontWeight: 400,
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Tap anywhere to continue
          </motion.p>
        )}
      </AnimatePresence>

      {/* Screen-reader text */}
      <p className="sr-only">
        {PHRASES.map(p => p.text).join('. ')}. Tap to view save the date.
      </p>
    </motion.div>
  );
}
