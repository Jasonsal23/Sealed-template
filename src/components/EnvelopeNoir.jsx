import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import wedding from '../data/wedding.js';

/* ── Decorative vine (top / bottom of scene) ─────────────── */
function VineLine({ flip = false }) {
  return (
    <svg
      viewBox="0 0 600 36"
      width="min(520px, 90vw)"
      style={{ display: 'block', transform: flip ? 'scaleY(-1)' : 'none', opacity: 0.22 }}
    >
      {/* Main curling stem */}
      <path d="M0,18 Q75,8 150,18 Q225,28 300,18 Q375,8 450,18 Q525,28 600,18"
        fill="none" stroke="var(--ink)" strokeWidth="0.9" />
      {/* Left leaf cluster */}
      <path d="M75,14 Q70,4 62,8 Q56,12 68,18" fill="none" stroke="var(--ink)" strokeWidth="0.8" />
      <path d="M75,14 Q80,5 88,9 Q94,13 82,18" fill="none" stroke="var(--ink)" strokeWidth="0.8" />
      {/* Center fleur */}
      <path d="M300,12 L300,6" stroke="var(--ink)" strokeWidth="0.9" />
      <circle cx="300" cy="5" r="2.5" fill="var(--ink)" />
      <path d="M297,9 Q292,5 296,4" fill="none" stroke="var(--ink)" strokeWidth="0.7" />
      <path d="M303,9 Q308,5 304,4" fill="none" stroke="var(--ink)" strokeWidth="0.7" />
      {/* Right leaf cluster */}
      <path d="M450,22 Q445,12 437,16 Q431,20 443,26" fill="none" stroke="var(--ink)" strokeWidth="0.8" />
      <path d="M450,22 Q455,13 463,17 Q469,21 457,26" fill="none" stroke="var(--ink)" strokeWidth="0.8" />
      {/* Small dots */}
      {[150, 225, 375].map(x => <circle key={x} cx={x} cy={18} r="1.8" fill="var(--ink)" />)}
    </svg>
  );
}

/* ── The bow — drawn entirely in SVG ─────────────────────── */
function Bow({ phase, onOpen }) {
  const untying = phase === 'untying' || phase === 'fading';
  const isIdle = phase === 'idle';

  return (
    /* Bow is centered at (0,0); we translate it to the diamond's bottom tip in the parent SVG */
    <g>
      {/* Large invisible touch/click target */}
      <circle
        cx="0" cy="60"
        r="90"
        fill="transparent"
        style={{ cursor: isIdle ? 'pointer' : 'default' }}
        onClick={isIdle ? onOpen : undefined}
        role="button"
        aria-label="Pull the ribbon to open your invitation"
      />

      {/* ── Ribbon tails (behind loops) ── */}
      <motion.g
        animate={untying ? { y: 55 } : { y: 0 }}
        transition={{ duration: 1.9, ease: [0.38, 0, 0.08, 1], delay: 0.14 }}
      >
        {/* Left tail body */}
        <path d="M-7,6 C-18,38 -42,100 -30,220"
          stroke="var(--ribbon)" strokeWidth="23" fill="none" strokeLinecap="round" />
        {/* Left tail satin highlight */}
        <path d="M-5,6 C-15,36 -37,97 -26,218"
          stroke="rgba(255,255,255,0.055)" strokeWidth="13" fill="none" strokeLinecap="round" />
        {/* Right tail body */}
        <path d="M7,6 C18,38 42,100 30,220"
          stroke="var(--ribbon)" strokeWidth="23" fill="none" strokeLinecap="round" />
        {/* Right tail satin highlight */}
        <path d="M5,6 C15,36 37,97 26,218"
          stroke="rgba(255,255,255,0.055)" strokeWidth="13" fill="none" strokeLinecap="round" />
      </motion.g>

      {/* ── Left loop ── */}
      <motion.g
        style={{ transformOrigin: '0px 0px' }}
        animate={untying
          ? { y: 34, x: -8, scaleY: 0.13, rotate: -7 }
          : { y: 0, x: 0, scaleY: 1, rotate: 0 }
        }
        transition={{ duration: 1.85, ease: [0.4, 0, 0.16, 1] }}
      >
        {/* Loop fill */}
        <path d="M0,0 C-6,-22 -55,-68 -62,-32 C-66,4 -18,16 0,0 Z"
          fill="var(--ribbon)" />
        {/* Satin sheen - inner highlight */}
        <path d="M0,0 C-5,-18 -49,-62 -57,-30 C-54,-10 -16,12 0,0 Z"
          fill="rgba(255,255,255,0.065)" />
        {/* Deeper shadow crease along spine */}
        <path d="M0,0 C-12,-28 -52,-60 -56,-34"
          fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" />
      </motion.g>

      {/* ── Right loop ── */}
      <motion.g
        style={{ transformOrigin: '0px 0px' }}
        animate={untying
          ? { y: 34, x: 8, scaleY: 0.13, rotate: 7 }
          : { y: 0, x: 0, scaleY: 1, rotate: 0 }
        }
        transition={{ duration: 1.85, ease: [0.4, 0, 0.16, 1], delay: 0.07 }}
      >
        <path d="M0,0 C6,-22 55,-68 62,-32 C66,4 18,16 0,0 Z"
          fill="var(--ribbon)" />
        <path d="M0,0 C5,-18 49,-62 57,-30 C54,-10 16,12 0,0 Z"
          fill="rgba(255,255,255,0.065)" />
        <path d="M0,0 C12,-28 52,-60 56,-34"
          fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" />
      </motion.g>

      {/* ── Center knot ── */}
      {/* Outer knot shape */}
      <path d="M-16,-7 C-14,-16 14,-16 16,-7 C18,2 12,10 0,14 C-12,10 -18,2 -16,-7 Z"
        fill="#0a0808" />
      {/* Inner knot highlight */}
      <path d="M-12,-5 C-10,-12 10,-12 12,-5 C14,1 9,8 0,11 C-9,8 -14,1 -12,-5 Z"
        fill="rgba(50,40,35,0.8)" />
      <path d="M-7,-3 C-5,-8 5,-8 7,-3 C8,1 5,5 0,7 C-5,5 -8,1 -7,-3 Z"
        fill="rgba(255,255,255,0.04)" />
    </g>
  );
}

/* ── Lace dots along diamond edge ────────────────────────── */
function laceDots(cx, cy, r, spacing = 10) {
  const corners = [
    [cx, cy - r],
    [cx + r, cy],
    [cx, cy + r],
    [cx - r, cy],
  ];
  const pts = [];
  for (let e = 0; e < 4; e++) {
    const [x1, y1] = corners[e];
    const [x2, y2] = corners[(e + 1) % 4];
    const len = Math.hypot(x2 - x1, y2 - y1);
    const n = Math.floor(len / spacing);
    for (let i = 1; i < n; i++) {
      const t = i / n;
      pts.push({ x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t });
    }
  }
  return pts;
}

/* ── Main scene ──────────────────────────────────────────── */

export default function EnvelopeNoir({ onComplete }) {
  const [phase, setPhase] = useState('idle');
  const reducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ).current;

  const handleOpen = () => {
    if (phase !== 'idle') return;
    if (reducedMotion) { onComplete(); return; }

    setPhase('untying');
    setTimeout(() => setPhase('fading'), 2000);
    setTimeout(() => onComplete(), 2900);
  };

  const fading = phase === 'fading';

  // SVG coordinate system
  const SVG_W = 400, SVG_H = 570;
  const CX = 200, CY = 195;   // diamond center
  const R = 170;               // half-diagonal (diamond "radius")
  const bowY = CY + R;         // = 365, the bottom tip

  const dots = laceDots(CX, CY, R - 6, 10);

  return (
    <motion.div
      key="envelope-noir"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: 'var(--blush)', overflow: 'hidden',
      }}
    >
      {/* Top vine */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.9 }}
        style={{ marginBottom: '1.4rem' }}
      >
        <VineLine />
      </motion.div>

      {/* "You are invited" */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.9 }}
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(1rem, 3vw, 1.4rem)',
          color: 'var(--ink)',
          letterSpacing: '0.06em',
          marginBottom: '1.6rem',
          opacity: 0.65,
        }}
      >
        {wedding.envelopeIntro}
      </motion.p>

      {/* ── Envelope + bow SVG ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1.0 }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        <motion.div
          animate={fading ? { opacity: 0, scale: 1.04 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        >
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            width="min(360px, 86vw)"
            style={{ display: 'block', overflow: 'visible' }}
            aria-label="Diamond envelope with black satin bow"
          >
            <defs>
              <filter id="envShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="10" stdDeviation="18" floodColor="rgba(26,22,20,0.13)" />
              </filter>
            </defs>

            {/* ── Diamond envelope face ── */}
            <polygon
              points={`${CX},${CY - R} ${CX + R},${CY} ${CX},${CY + R} ${CX - R},${CY}`}
              fill="var(--ivory)"
              filter="url(#envShadow)"
            />

            {/* Outer dotted lace edge */}
            <polygon
              points={`${CX},${CY - R} ${CX + R},${CY} ${CX},${CY + R} ${CX - R},${CY}`}
              fill="none"
              stroke="rgba(26,22,20,0.18)"
              strokeWidth="0.8"
              strokeDasharray="1.5,4"
            />

            {/* Inner border lines (double) */}
            <polygon
              points={`${CX},${CY - R + 14} ${CX + R - 14},${CY} ${CX},${CY + R - 14} ${CX - R + 14},${CY}`}
              fill="none" stroke="rgba(26,22,20,0.09)" strokeWidth="0.8"
            />
            <polygon
              points={`${CX},${CY - R + 22} ${CX + R - 22},${CY} ${CX},${CY + R - 22} ${CX - R + 22},${CY}`}
              fill="none" stroke="rgba(26,22,20,0.05)" strokeWidth="0.5"
            />

            {/* Lace pearl dots around edge */}
            {dots.map((pt, i) => (
              <circle key={i} cx={pt.x.toFixed(1)} cy={pt.y.toFixed(1)} r="1.4" fill="rgba(26,22,20,0.2)" />
            ))}

            {/* Debossed monogram (very light — letterpress impression) */}
            <text
              x={CX} y={CY + 10}
              textAnchor="middle"
              fontFamily="Cormorant Garamond, Georgia, serif"
              fontSize="58"
              fontWeight="300"
              fill="rgba(26,22,20,0.07)"
              letterSpacing="3"
              style={{ userSelect: 'none' }}
            >
              {wedding.monogram}
            </text>

            {/* Subtle center fold crease (horizontal) */}
            <line
              x1={CX - R + 28} y1={CY}
              x2={CX + R - 28} y2={CY}
              stroke="rgba(26,22,20,0.07)" strokeWidth="0.6"
              strokeDasharray="5,7"
            />

            {/* Top flap shadow (gives depth to folded envelope) */}
            <polygon
              points={`${CX},${CY - R} ${CX + R},${CY} ${CX - R},${CY}`}
              fill="rgba(26,22,20,0.02)"
            />

            {/* ── Bow at bottom diamond tip ── */}
            <g transform={`translate(${CX}, ${bowY})`}>
              <Bow phase={phase} onOpen={handleOpen} />
            </g>
          </svg>
        </motion.div>
      </motion.div>

      {/* Prompt */}
      <motion.p
        animate={{ opacity: phase === 'idle' ? 1 : 0 }}
        transition={{ delay: phase === 'idle' ? 1.3 : 0, duration: 0.7 }}
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: '0.56rem',
          letterSpacing: '0.38em',
          textTransform: 'uppercase',
          color: 'var(--ink)',
          opacity: 0.38,
          marginTop: '1.6rem',
        }}
      >
        {wedding.envelopePrompt}
      </motion.p>

      {/* Bottom vine */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: phase === 'idle' ? 1 : 0, y: 0 }}
        transition={{ delay: 1.1, duration: 0.9 }}
        style={{ marginTop: '1rem' }}
      >
        <VineLine flip />
      </motion.div>

      {/* Full-screen cream wash */}
      <AnimatePresence>
        {fading && (
          <motion.div
            key="wash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            style={{ position: 'fixed', inset: 0, background: 'var(--blush)', zIndex: 20 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
