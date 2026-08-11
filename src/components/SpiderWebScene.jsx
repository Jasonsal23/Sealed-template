import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import wedding from '../data/wedding';

// ── Web geometry (computed once) ─────────────────────────────────────────────
const CX = 50, CY = 42;
const NUM_RAYS = 8;
const NUM_RINGS = 5;
const MAX_R = 90;

function rayAngle(i) { return (i / NUM_RAYS) * Math.PI * 2 - Math.PI / 2; }
function rayPoint(i, r) {
  const a = rayAngle(i);
  return { x: CX + Math.cos(a) * r, y: CY + Math.sin(a) * r };
}

const RAYS = Array.from({ length: NUM_RAYS }, (_, i) => {
  const e = rayPoint(i, MAX_R);
  return { i, d: `M${CX},${CY}L${e.x.toFixed(2)},${e.y.toFixed(2)}` };
});

const RINGS = [];
for (let ring = 1; ring <= NUM_RINGS; ring++) {
  const r = (ring / NUM_RINGS) * MAX_R * 0.83;
  for (let i = 0; i < NUM_RAYS; i++) {
    const p1 = rayPoint(i, r);
    const p2 = rayPoint((i + 1) % NUM_RAYS, r);
    const ma = rayAngle(i) + Math.PI / NUM_RAYS;
    const qx = CX + Math.cos(ma) * r * 1.18;
    const qy = CY + Math.sin(ma) * r * 1.18;
    RINGS.push({
      ring, seg: i,
      d: `M${p1.x.toFixed(2)},${p1.y.toFixed(2)}Q${qx.toFixed(2)},${qy.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`,
    });
  }
}

// Spider SVG paths (rendered at origin, translated via motion)
function SpiderSVG() {
  return (
    <g>
      {/* Thread */}
      <line x1="0" y1="-999" x2="0" y2="-5" stroke="rgba(210,215,230,0.5)" strokeWidth="0.3" />
      {/* Abdomen */}
      <ellipse cx="0" cy="3" rx="3.2" ry="4.2" fill="#080b14" stroke="rgba(210,215,230,0.55)" strokeWidth="0.4" />
      {/* Cephalothorax */}
      <ellipse cx="0" cy="-2.5" rx="2.4" ry="2.8" fill="#080b14" stroke="rgba(210,215,230,0.55)" strokeWidth="0.4" />
      {/* Eyes — subtle red */}
      <circle cx="-0.9" cy="-3" r="0.5" fill="#cc1f2e" opacity="0.75" />
      <circle cx="0.9" cy="-3" r="0.5" fill="#cc1f2e" opacity="0.75" />
      {/* Legs — left */}
      <path d="M-2.4,-1 Q-5,-2 -7,-0.5" stroke="rgba(210,215,230,0.5)" fill="none" strokeWidth="0.35" />
      <path d="M-2.4,0.5 Q-5,0 -7,2" stroke="rgba(210,215,230,0.5)" fill="none" strokeWidth="0.35" />
      <path d="M-2.4,2 Q-5,2.5 -6.5,5" stroke="rgba(210,215,230,0.5)" fill="none" strokeWidth="0.35" />
      <path d="M-2.4,-2.5 Q-5,-4 -6.5,-3.5" stroke="rgba(210,215,230,0.5)" fill="none" strokeWidth="0.35" />
      {/* Legs — right */}
      <path d="M2.4,-1 Q5,-2 7,-0.5" stroke="rgba(210,215,230,0.5)" fill="none" strokeWidth="0.35" />
      <path d="M2.4,0.5 Q5,0 7,2" stroke="rgba(210,215,230,0.5)" fill="none" strokeWidth="0.35" />
      <path d="M2.4,2 Q5,2.5 6.5,5" stroke="rgba(210,215,230,0.5)" fill="none" strokeWidth="0.35" />
      <path d="M2.4,-2.5 Q5,-4 6.5,-3.5" stroke="rgba(210,215,230,0.5)" fill="none" strokeWidth="0.35" />
    </g>
  );
}

// ── Scene ────────────────────────────────────────────────────────────────────
export default function SpiderWebScene({ onComplete }) {
  const [fontsReady, setFontsReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [promptVisible, setPromptVisible] = useState(false);
  const [done, setDone] = useState(false);

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    document.fonts.ready.then(() => setFontsReady(true));
  }, []);

  useEffect(() => {
    if (!fontsReady) return;
    if (reducedMotion) {
      setStarted(true);
      setTextVisible(true);
      setTimeout(() => setPromptVisible(true), 500);
      setTimeout(() => setDone(true), 600);
      return;
    }
    const t0 = setTimeout(() => setStarted(true), 200);
    // Web finishes at ~2.9s, text at 3.2s, prompt at 4.8s
    const t1 = setTimeout(() => setTextVisible(true), 3200);
    const t2 = setTimeout(() => setPromptVisible(true), 4800);
    const t3 = setTimeout(() => setDone(true), 4900);
    return () => [t0, t1, t2, t3].forEach(clearTimeout);
  }, [fontsReady]);

  const handleTap = () => {
    if (!promptVisible) return;
    onComplete();
  };

  // Ray animation timing
  function rayDelay(i) { return 0.2 + i * 0.11; }
  // Ring segment timing: inner rings first, segments sweep around
  function segDelay(ring, seg) { return 0.7 + (ring - 1) * 0.38 + seg * 0.025; }

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      onClick={handleTap}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#080b14',
        cursor: done ? 'pointer' : 'default',
        overflow: 'hidden',
      }}
    >
      {/* City warm glow at bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
        background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(220,100,30,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Web SVG — fills screen with slice */}
      {started && (
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          aria-hidden="true"
        >
          {/* Subtle web glow filter */}
          <defs>
            <filter id="silk-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Spider thread (grows as spider descends) */}
          <motion.line
            x1={CX} y1={0} x2={CX}
            initial={{ y2: 0 }}
            animate={{ y2: CY - 9 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            stroke="rgba(210,215,230,0.45)"
            strokeWidth="0.25"
          />

          {/* Spider descends */}
          <motion.g
            initial={{ x: CX, y: -12 }}
            animate={{ x: CX, y: CY - 9 }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <SpiderSVG />
          </motion.g>

          {/* Radial rays */}
          <g filter="url(#silk-glow)">
            {RAYS.map(({ i, d }) => (
              <motion.path
                key={`ray-${i}`}
                d={d}
                stroke="rgba(210,215,235,0.6)"
                strokeWidth="0.35"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: { duration: 0.6, delay: rayDelay(i), ease: 'easeOut' },
                  opacity: { duration: 0.1, delay: rayDelay(i) },
                }}
              />
            ))}
          </g>

          {/* Concentric ring segments */}
          <g filter="url(#silk-glow)">
            {RINGS.map(({ ring, seg, d }) => (
              <motion.path
                key={`ring-${ring}-${seg}`}
                d={d}
                stroke="rgba(210,215,235,0.45)"
                strokeWidth="0.28"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: { duration: 0.35, delay: segDelay(ring, seg), ease: 'easeInOut' },
                  opacity: { duration: 0.05, delay: segDelay(ring, seg) },
                }}
              />
            ))}
          </g>

          {/* Subtle red center pulse once web is done */}
          <motion.circle
            cx={CX} cy={CY} r="1.5"
            fill="rgba(204,31,46,0)"
            initial={{ r: 0, opacity: 0 }}
            animate={textVisible ? { r: 2.5, opacity: [0, 0.6, 0.3] } : {}}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </svg>
      )}

      {/* City skyline silhouette */}
      <svg
        viewBox="0 0 1200 180"
        preserveAspectRatio="xMidYMax meet"
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', height: 'clamp(60px, 15vw, 130px)', pointerEvents: 'none' }}
        aria-hidden="true"
      >
        {/* Background buildings */}
        <rect x="0" y="80" width="60" height="100" fill="#080b14" />
        <rect x="55" y="50" width="40" height="130" fill="#080b14" />
        <rect x="90" y="70" width="55" height="110" fill="#080b14" />
        <rect x="140" y="30" width="30" height="150" fill="#080b14" />
        <rect x="165" y="55" width="50" height="125" fill="#080b14" />
        <rect x="210" y="75" width="45" height="105" fill="#080b14" />
        <rect x="250" y="40" width="35" height="140" fill="#080b14" />
        <rect x="280" y="65" width="60" height="115" fill="#080b14" />
        <rect x="335" y="20" width="25" height="160" fill="#080b14" />
        <polygon points="335,20 347,5 360,20" fill="#080b14" />
        <rect x="355" y="55" width="55" height="125" fill="#080b14" />
        <rect x="405" y="70" width="40" height="110" fill="#080b14" />
        <rect x="440" y="35" width="50" height="145" fill="#080b14" />
        <rect x="485" y="60" width="45" height="120" fill="#080b14" />
        <rect x="525" y="15" width="30" height="165" fill="#080b14" />
        <polygon points="525,15 540,0 555,15" fill="#080b14" />
        <rect x="550" y="50" width="60" height="130" fill="#080b14" />
        <rect x="605" y="75" width="40" height="105" fill="#080b14" />
        <rect x="640" y="30" width="55" height="150" fill="#080b14" />
        <rect x="690" y="60" width="45" height="120" fill="#080b14" />
        <rect x="730" y="45" width="35" height="135" fill="#080b14" />
        <rect x="760" y="20" width="30" height="160" fill="#080b14" />
        <polygon points="760,20 775,5 790,20" fill="#080b14" />
        <rect x="785" y="55" width="60" height="125" fill="#080b14" />
        <rect x="840" y="70" width="50" height="110" fill="#080b14" />
        <rect x="885" y="35" width="40" height="145" fill="#080b14" />
        <rect x="920" y="60" width="55" height="120" fill="#080b14" />
        <rect x="970" y="40" width="35" height="140" fill="#080b14" />
        <rect x="1000" y="65" width="60" height="115" fill="#080b14" />
        <rect x="1055" y="25" width="30" height="155" fill="#080b14" />
        <rect x="1080" y="50" width="50" height="130" fill="#080b14" />
        <rect x="1125" y="70" width="75" height="110" fill="#080b14" />
        {/* Ground fill */}
        <rect x="0" y="160" width="1200" height="20" fill="#080b14" />
        {/* Faint window lights */}
        {[
          [70,60],[75,72],[72,84],[350,35],[352,50],[358,65],
          [540,25],[543,40],[547,55],[770,30],[774,45],[778,60],
          [1063,38],[1067,55],[1071,72],
        ].map(([x,y],i) => (
          <rect key={i} x={x} y={y} width="2.5" height="1.5" fill="rgba(255,220,120,0.35)" />
        ))}
      </svg>

      {/* Center text — couple names */}
      <AnimatePresence>
        {textVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '42%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              pointerEvents: 'none',
              zIndex: 10,
              width: '90vw',
            }}
          >
            <p style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: 'clamp(1.4rem, 4vw, 2.4rem)',
              color: 'var(--gold)',
              opacity: 0.8,
              lineHeight: 1,
              marginBottom: 'clamp(0.5rem, 1.5vw, 0.75rem)',
            }}>
              Save the Date
            </p>
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2.8rem, 10vw, 6.5rem)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: '#f0ece4',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              textShadow: '0 0 30px rgba(204,31,46,0.15), 0 2px 40px rgba(0,0,0,0.6)',
              marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
            }}>
              {wedding.partnerA} &amp; {wedding.partnerB}
            </p>
            <div style={{ width: 30, height: 1, backgroundColor: 'var(--red)', opacity: 0.5, margin: '0 auto clamp(0.75rem, 2vw, 1rem)' }} />
            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 'clamp(0.58rem, 1.6vw, 0.78rem)',
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              fontWeight: 400,
              opacity: 0.85,
            }}>
              {wedding.dateDisplay}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tap prompt */}
      <AnimatePresence>
        {promptVisible && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4 }}
            style={{
              position: 'absolute',
              bottom: 'clamp(8rem, 18vw, 11rem)',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: "'Jost', sans-serif",
              fontSize: '0.55rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(210,215,230,0.4)',
              fontWeight: 400,
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Tap to continue
          </motion.p>
        )}
      </AnimatePresence>

      {/* Screen reader text */}
      <p className="sr-only">
        Spider web save the date. {wedding.partnerAFull} and {wedding.partnerBFull}, {wedding.dateDisplay} at {wedding.venueName}, {wedding.venueCity}. Tap to view details.
      </p>
    </motion.div>
  );
}
