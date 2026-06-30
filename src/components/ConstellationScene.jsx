import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import wedding from '../data/wedding';

// Constellation star positions in a 100×100 coordinate space
const C_STARS = [
  // Left cluster — Aria
  { x: 18, y: 50, r: 3.2, isAlpha: true  },   // 0 — α
  { x: 25, y: 34, r: 1.9, isAlpha: false },    // 1
  { x: 33, y: 28, r: 2.2, isAlpha: false },    // 2
  { x: 36, y: 44, r: 1.6, isAlpha: false },    // 3
  { x: 27, y: 62, r: 1.9, isAlpha: false },    // 4
  // Bridge
  { x: 44, y: 38, r: 1.5, isAlpha: false },    // 5
  { x: 50, y: 33, r: 1.8, isAlpha: false },    // 6
  { x: 57, y: 31, r: 1.5, isAlpha: false },    // 7
  // Right cluster — Sebastian
  { x: 64, y: 26, r: 2.1, isAlpha: false },    // 8
  { x: 73, y: 21, r: 3.0, isAlpha: true  },    // 9 — α
  { x: 80, y: 37, r: 1.8, isAlpha: false },    // 10
  { x: 75, y: 52, r: 1.7, isAlpha: false },    // 11
  { x: 63, y: 57, r: 1.9, isAlpha: false },    // 12
  { x: 55, y: 47, r: 1.5, isAlpha: false },    // 13
];

const C_LINES = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 4], [1, 3],
  [3, 5], [5, 6], [6, 7],
  [7, 8], [8, 9], [9, 10],
  [10, 11], [11, 12], [12, 13], [13, 7],
  [8, 13], [9, 13],
];

// Deterministic background stars — stable across renders
function makeBgStars(count) {
  const stars = [];
  let s = 0xdeadbeef;
  const rng = () => { s = (s ^ (s << 13)) >>> 0; s = (s ^ (s >> 7)) >>> 0; s = (s ^ (s << 5)) >>> 0; return s / 0xffffffff; };
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      x: rng() * 100,
      y: rng() * 100,
      r: 0.12 + rng() * 0.38,
      baseOpacity: 0.2 + rng() * 0.55,
      delay: rng() * 4,
      duration: 1.8 + rng() * 3,
      twinkles: i % 3 === 0,
    });
  }
  return stars;
}

const BG_STARS = makeBgStars(160);

function AlphaSparkle({ x, y, r }) {
  const d = r * 1.65;
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
      <line x1={x - d} y1={y} x2={x + d} y2={y} stroke="#f0cc60" strokeWidth="0.38" strokeLinecap="round" opacity="0.8" />
      <line x1={x} y1={y - d} x2={x} y2={y + d} stroke="#f0cc60" strokeWidth="0.38" strokeLinecap="round" opacity="0.8" />
      <line x1={x - d * 0.65} y1={y - d * 0.65} x2={x + d * 0.65} y2={y + d * 0.65} stroke="#f0cc60" strokeWidth="0.22" strokeLinecap="round" opacity="0.5" />
      <line x1={x + d * 0.65} y1={y - d * 0.65} x2={x - d * 0.65} y2={y + d * 0.65} stroke="#f0cc60" strokeWidth="0.22" strokeLinecap="round" opacity="0.5" />
    </motion.g>
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
    if (prefersReduced) { setPhase('ready'); return; }
    const t1 = setTimeout(() => setPhase('drawing'), 1400);
    const t2 = setTimeout(() => setPhase('labeled'), 4800);
    const t3 = setTimeout(() => setPhase('ready'),   5600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [prefersReduced]);

  const handleTap = () => {
    if (phase !== 'ready') return;
    setPhase('zooming');
    setTimeout(onRevealed, 1300);
  };

  const isDrawing  = ['drawing', 'labeled', 'ready', 'zooming'].includes(phase);
  const isLabeled  = ['labeled', 'ready', 'zooming'].includes(phase);
  const isReady    = phase === 'ready';
  const isZooming  = phase === 'zooming';

  return (
    // Entire surface is the tap target — no z-index tricks needed
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      onClick={handleTap}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#07091a',
        overflow: 'hidden',
        cursor: isReady ? 'pointer' : 'default',
        userSelect: 'none',
      }}
    >
      {/* Zoom wrapper — everything inside zooms on tap */}
      <motion.div
        animate={isZooming ? { scale: 22, opacity: 0, filter: 'blur(24px)' } : { scale: 1 }}
        transition={{ duration: 1.1, ease: [0.4, 0, 1, 1] }}
        style={{ position: 'absolute', inset: 0, transformOrigin: '55% 40%' }}
      >
        {/* ── Layer 1: Full-screen background star field ── */}
        {/* Uses slice so stars fill the whole screen on any device */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="nebula-main" cx="55%" cy="38%" r="50%">
              <stop offset="0%"   stopColor="#5030b0" stopOpacity="0.16" />
              <stop offset="55%"  stopColor="#201060" stopOpacity="0.07" />
              <stop offset="100%" stopColor="#07091a" stopOpacity="0"    />
            </radialGradient>
            <radialGradient id="nebula-side" cx="20%" cy="70%" r="32%">
              <stop offset="0%"   stopColor="#103858" stopOpacity="0.13" />
              <stop offset="100%" stopColor="#07091a" stopOpacity="0"    />
            </radialGradient>
          </defs>
          <rect width="100" height="100" fill="url(#nebula-main)" />
          <rect width="100" height="100" fill="url(#nebula-side)" />
          {BG_STARS.map(star => (
            <motion.circle
              key={star.id}
              cx={star.x} cy={star.y} r={star.r}
              fill="#ffffff"
              initial={{ opacity: 0 }}
              animate={star.twinkles
                ? { opacity: [0, star.baseOpacity, star.baseOpacity * 0.4, star.baseOpacity] }
                : { opacity: star.baseOpacity }
              }
              transition={star.twinkles
                ? { delay: star.delay, duration: star.duration, repeat: Infinity, ease: 'easeInOut' }
                : { delay: star.delay * 0.4, duration: 1.2 }
              }
            />
          ))}
        </svg>

        {/* ── Layer 2: Constellation — bounded, never clips on mobile ── */}
        {/* Uses "meet" inside a centered container so all stars are visible */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
            style={{
              // Fits within the viewport on any screen — no side clipping
              width: 'min(92vw, 72vh)',
              height: 'min(92vw, 72vh)',
            }}
            aria-hidden="true"
          >
            <defs>
              <filter id="star-glow" x="-150%" y="-150%" width="400%" height="400%">
                <feGaussianBlur stdDeviation="1.2" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="alpha-glow" x="-200%" y="-200%" width="500%" height="500%">
                <feGaussianBlur stdDeviation="2.4" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Constellation lines */}
            {isDrawing && C_LINES.map(([a, b], i) => (
              <motion.path
                key={`l-${i}`}
                d={`M ${C_STARS[a].x} ${C_STARS[a].y} L ${C_STARS[b].x} ${C_STARS[b].y}`}
                stroke="rgba(240,204,96,0.4)"
                strokeWidth="0.2"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.1, delay: i * 0.18, ease: [0.4, 0, 0.6, 1] }}
              />
            ))}

            {/* Constellation stars */}
            {C_STARS.map((star, i) => (
              <motion.g key={`cs-${i}`} filter={star.isAlpha ? 'url(#alpha-glow)' : 'url(#star-glow)'}>
                {/* Pulsing ring on alpha stars */}
                {star.isAlpha && (
                  <motion.circle
                    cx={star.x} cy={star.y} r={star.r * 3.5}
                    fill="none" stroke="rgba(240,204,96,0.2)" strokeWidth="0.4"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: [0, 0.6, 0], scale: [0.7, 1.8, 0.7] }}
                    transition={{ delay: 1.8 + i * 0.1, duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
                <motion.circle
                  cx={star.x} cy={star.y} r={star.r}
                  fill={star.isAlpha ? '#f8e070' : '#f0cc60'}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 + i * 0.08, duration: 0.45, ease: 'easeOut' }}
                />
                {star.isAlpha && (
                  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 + i * 0.08 }}>
                    <AlphaSparkle x={star.x} y={star.y} r={star.r} />
                  </motion.g>
                )}
              </motion.g>
            ))}

            {/* Labels — appear after lines finish */}
            {isLabeled && (
              <>
                <motion.text
                  x="18" y="72"
                  textAnchor="middle"
                  fill="rgba(240,204,96,0.72)"
                  fontSize="3.8"
                  fontFamily="'Cinzel', serif"
                  letterSpacing="0.5"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ duration: 1.2 }}
                >
                  {wedding.partnerA.toUpperCase()}
                </motion.text>
                <motion.text
                  x="73" y="12"
                  textAnchor="middle"
                  fill="rgba(240,204,96,0.72)"
                  fontSize="3.8"
                  fontFamily="'Cinzel', serif"
                  letterSpacing="0.5"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                >
                  {wedding.partnerB.toUpperCase()}
                </motion.text>
              </>
            )}
          </svg>
        </div>
      </motion.div>

      {/* ── Text overlay — always on top, pointer-events managed per element ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: 'clamp(2rem, 6vh, 4rem)',
          pointerEvents: 'none', // overlay itself doesn't block clicks on the scene
        }}
      >
        <AnimatePresence>
          {isLabeled && !isZooming && fontsReady && (
            <motion.div
              key="intro"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-script" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', color: 'rgba(240,204,96,0.85)', margin: 0, lineHeight: 1 }}>
                {wedding.envelopeIntro}
              </p>
              <div style={{ width: '28px', height: '1px', backgroundColor: 'rgba(240,204,96,0.3)' }} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isReady && !isZooming && (
            <motion.p
              key="prompt"
              className="font-display text-label"
              // pointerEvents auto so it doesn't block but still receives clicks that bubble up
              style={{ color: 'rgba(240,204,96,0.6)', margin: 0, fontSize: '0.58rem', pointerEvents: 'auto' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {wedding.envelopePrompt}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
