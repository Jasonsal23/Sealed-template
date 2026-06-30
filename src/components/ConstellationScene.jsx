import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import wedding from '../data/wedding';

// Constellation star positions in SVG viewBox (0 0 100 100)
const C_STARS = [
  // Left cluster — Aria
  { x: 18, y: 50, r: 3.2, isAlpha: true  },   // 0 — α Ari
  { x: 25, y: 34, r: 1.9, isAlpha: false },    // 1
  { x: 33, y: 28, r: 2.2, isAlpha: false },    // 2
  { x: 36, y: 44, r: 1.6, isAlpha: false },    // 3
  { x: 27, y: 62, r: 1.9, isAlpha: false },    // 4

  // Bridge — center of the sky
  { x: 44, y: 38, r: 1.5, isAlpha: false },    // 5
  { x: 50, y: 33, r: 1.8, isAlpha: false },    // 6 — bridge midpoint
  { x: 57, y: 31, r: 1.5, isAlpha: false },    // 7

  // Right cluster — Sebastian
  { x: 64, y: 26, r: 2.1, isAlpha: false },    // 8
  { x: 73, y: 21, r: 3.0, isAlpha: true  },    // 9 — α Seb
  { x: 80, y: 37, r: 1.8, isAlpha: false },    // 10
  { x: 75, y: 52, r: 1.7, isAlpha: false },    // 11
  { x: 63, y: 57, r: 1.9, isAlpha: false },    // 12
  { x: 55, y: 47, r: 1.5, isAlpha: false },    // 13
];

const C_LINES = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 4], [1, 3],  // left cluster
  [3, 5], [5, 6], [6, 7],                             // bridge out from left
  [7, 8], [8, 9], [9, 10],                            // into right
  [10, 11], [11, 12], [12, 13], [13, 7],              // right cluster ring
  [8, 13], [9, 13],                                   // right internal
];

// Deterministic background star generation — avoids re-renders
function makeBgStars(count) {
  const stars = [];
  let s = 0xdeadbeef;
  const rng = () => { s = (s ^ (s << 13)) >>> 0; s = (s ^ (s >> 7)) >>> 0; s = (s ^ (s << 5)) >>> 0; return s / 0xffffffff; };
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      x: rng() * 100,
      y: rng() * 100,
      r: 0.12 + rng() * 0.35,
      baseOpacity: 0.25 + rng() * 0.55,
      delay: rng() * 5,
      duration: 1.8 + rng() * 3,
      twinkles: i % 3 === 0,
    });
  }
  return stars;
}

const BG_STARS = makeBgStars(160);

// Sparkle lines for alpha stars
function AlphaSparkle({ x, y, r }) {
  const d = r * 1.6;
  return (
    <>
      <motion.line x1={x - d} y1={y} x2={x + d} y2={y} stroke="#f0cc60" strokeWidth="0.35" strokeLinecap="round"
        initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 0.8, scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }} style={{ transformOrigin: `${x}px ${y}px` }} />
      <motion.line x1={x} y1={y - d} x2={x} y2={y + d} stroke="#f0cc60" strokeWidth="0.35" strokeLinecap="round"
        initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 0.8, scaleY: 1 }}
        transition={{ duration: 0.5, delay: 0.25 }} style={{ transformOrigin: `${x}px ${y}px` }} />
      <motion.line x1={x - d * 0.65} y1={y - d * 0.65} x2={x + d * 0.65} y2={y + d * 0.65} stroke="#f0cc60" strokeWidth="0.2" strokeLinecap="round"
        initial={{ opacity: 0 }} animate={{ opacity: 0.55 }} transition={{ duration: 0.4, delay: 0.35 }} />
      <motion.line x1={x + d * 0.65} y1={y - d * 0.65} x2={x - d * 0.65} y2={y + d * 0.65} stroke="#f0cc60" strokeWidth="0.2" strokeLinecap="round"
        initial={{ opacity: 0 }} animate={{ opacity: 0.55 }} transition={{ duration: 0.4, delay: 0.4 }} />
    </>
  );
}

export default function ConstellationScene({ onRevealed }) {
  const [phase, setPhase] = useState('starfield'); // starfield | drawing | labeled | ready | zooming
  const [fontsReady, setFontsReady] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    document.fonts.ready.then(() => setFontsReady(true));
  }, []);

  useEffect(() => {
    if (prefersReduced) return;
    const t1 = setTimeout(() => setPhase('drawing'), 1400);
    const t2 = setTimeout(() => setPhase('labeled'), 4800);
    const t3 = setTimeout(() => setPhase('ready'), 5600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [prefersReduced]);

  useEffect(() => {
    if (prefersReduced) setPhase('ready');
  }, [prefersReduced]);

  const handleTap = () => {
    if (phase !== 'ready') return;
    setPhase('zooming');
    setTimeout(onRevealed, 1300);
  };

  const isDrawing = phase === 'drawing' || phase === 'labeled' || phase === 'ready' || phase === 'zooming';
  const isLabeled = phase === 'labeled' || phase === 'ready' || phase === 'zooming';
  const isReady = phase === 'ready';
  const isZooming = phase === 'zooming';

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{ position: 'fixed', inset: 0, backgroundColor: '#07091a', overflow: 'hidden' }}
    >
      {/* Everything that zooms into the stars */}
      <motion.div
        animate={isZooming ? { scale: 22, opacity: 0, filter: 'blur(24px)' } : { scale: 1 }}
        transition={{ duration: 1.1, ease: [0.4, 0, 1, 1] }}
        style={{ position: 'absolute', inset: 0, transformOrigin: '58% 38%' }}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
          aria-hidden="true"
        >
          <defs>
            {/* Nebula gradients */}
            <radialGradient id="nebula-main" cx="55%" cy="40%" r="45%">
              <stop offset="0%" stopColor="#6040a8" stopOpacity="0.18" />
              <stop offset="60%" stopColor="#2a1860" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#07091a" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="nebula-accent" cx="22%" cy="65%" r="30%">
              <stop offset="0%" stopColor="#1a4060" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#07091a" stopOpacity="0" />
            </radialGradient>
            {/* Star glow filter */}
            <filter id="star-glow" x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="alpha-glow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Nebula atmosphere */}
          <rect width="100" height="100" fill="url(#nebula-main)" />
          <rect width="100" height="100" fill="url(#nebula-accent)" />

          {/* Background stars */}
          {BG_STARS.map(star => (
            <motion.circle
              key={star.id}
              cx={star.x}
              cy={star.y}
              r={star.r}
              fill="#ffffff"
              initial={{ opacity: 0 }}
              animate={star.twinkles
                ? { opacity: [0, star.baseOpacity, star.baseOpacity * 0.45, star.baseOpacity] }
                : { opacity: star.baseOpacity }
              }
              transition={star.twinkles
                ? { delay: star.delay, duration: star.duration, repeat: Infinity, ease: 'easeInOut' }
                : { delay: star.delay * 0.4, duration: 1.2 }
              }
            />
          ))}

          {/* Constellation lines */}
          {isDrawing && C_LINES.map(([a, b], i) => (
            <motion.path
              key={`l-${i}`}
              d={`M ${C_STARS[a].x} ${C_STARS[a].y} L ${C_STARS[b].x} ${C_STARS[b].y}`}
              stroke="rgba(240,204,96,0.42)"
              strokeWidth="0.18"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.1, delay: i * 0.18, ease: [0.4, 0, 0.6, 1] }}
            />
          ))}

          {/* Constellation stars */}
          {C_STARS.map((star, i) => (
            <motion.g
              key={`cs-${i}`}
              filter={star.isAlpha ? 'url(#alpha-glow)' : 'url(#star-glow)'}
            >
              {/* Pulsing ring on alpha stars */}
              {star.isAlpha && (
                <motion.circle
                  cx={star.x} cy={star.y} r={star.r * 3.5}
                  fill="none" stroke="rgba(240,204,96,0.22)" strokeWidth="0.4"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.6, 0.8] }}
                  transition={{ delay: 1.8 + i * 0.1, duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
              {/* Main star circle */}
              <motion.circle
                cx={star.x} cy={star.y} r={star.r}
                fill={star.isAlpha ? '#f8e070' : '#f0cc60'}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + i * 0.08, duration: 0.45, ease: 'easeOut' }}
              />
              {/* Sparkle cross on alpha stars */}
              {star.isAlpha && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 + i * 0.08, duration: 0.4 }}
                >
                  <AlphaSparkle x={star.x} y={star.y} r={star.r} />
                </motion.g>
              )}
            </motion.g>
          ))}

          {/* Constellation labels — appear after lines finish */}
          {isLabeled && (
            <>
              {/* Aria label — below left alpha star */}
              <motion.text
                x="18" y="57.5"
                textAnchor="middle"
                fill="rgba(240,204,96,0.7)"
                fontSize="2.6"
                fontFamily="'Cinzel', serif"
                letterSpacing="0.35"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              >
                {wedding.partnerA.toUpperCase()}
              </motion.text>
              {/* Small Greek letter */}
              <motion.text
                x="18" y="61.5"
                textAnchor="middle"
                fill="rgba(240,204,96,0.35)"
                fontSize="1.8"
                fontFamily="'Raleway', sans-serif"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
              >
                α Constellation
              </motion.text>

              {/* Sebastian label — above right alpha star */}
              <motion.text
                x="73" y="14.5"
                textAnchor="middle"
                fill="rgba(240,204,96,0.7)"
                fontSize="2.6"
                fontFamily="'Cinzel', serif"
                letterSpacing="0.35"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
              >
                {wedding.partnerB.toUpperCase()}
              </motion.text>
              <motion.text
                x="73" y="18"
                textAnchor="middle"
                fill="rgba(240,204,96,0.35)"
                fontSize="1.8"
                fontFamily="'Raleway', sans-serif"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
              >
                α Constellation
              </motion.text>
            </>
          )}
        </svg>
      </motion.div>

      {/* Overlay text — sits above the zoom div so it can fade independently */}
      {/* Bottom prompt */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: 'clamp(2rem, 6vh, 4rem)',
          pointerEvents: isReady ? 'auto' : 'none',
        }}
      >
        <AnimatePresence>
          {isLabeled && !isZooming && (
            <motion.div
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.8 }}
            >
              <motion.p
                className="font-script"
                style={{
                  fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
                  color: 'rgba(240,204,96,0.85)',
                  margin: 0,
                  lineHeight: 1,
                }}
              >
                {wedding.envelopeIntro}
              </motion.p>
              <div style={{ width: '32px', height: '1px', backgroundColor: 'rgba(240,204,96,0.3)', margin: '0.2rem 0' }} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isReady && !isZooming && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.45, 1, 0.45] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              onClick={handleTap}
              aria-label="Continue to your invitation"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Cinzel', serif",
                fontSize: '0.6rem',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: 'rgba(240,204,96,0.7)',
                padding: '0.5rem 1rem',
                marginTop: '0.4rem',
              }}
            >
              {wedding.envelopePrompt}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Full-screen tap target when ready */}
      {isReady && (
        <div
          onClick={handleTap}
          style={{ position: 'absolute', inset: 0, zIndex: -1 }}
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
}
