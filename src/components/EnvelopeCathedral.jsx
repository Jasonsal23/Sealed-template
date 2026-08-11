import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import wedding from '../data/wedding.js';

/* ── Tiny SVG ornament pieces ────────────────────────────── */

function RoseWindowBg() {
  return (
    <svg viewBox="0 0 200 200" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04, pointerEvents: 'none' }}>
      <g transform="translate(100,100)">
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const x = Math.cos(a) * 70, y = Math.sin(a) * 70;
          return <line key={i} x1="0" y1="0" x2={x.toFixed(1)} y2={y.toFixed(1)} stroke="#b5883a" strokeWidth="0.8" />;
        })}
        {[30, 55, 75, 90].map(r => <circle key={r} cx="0" cy="0" r={r} fill="none" stroke="#b5883a" strokeWidth="0.6" />)}
        {Array.from({ length: 6 }, (_, i) => {
          const a = (i / 6) * Math.PI * 2;
          const x = Math.cos(a) * 43, y = Math.sin(a) * 43;
          return <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r="10" fill="none" stroke="#b5883a" strokeWidth="0.5" />;
        })}
      </g>
    </svg>
  );
}

function GothicArch({ width = 320, height = 80, color = '#b5883a', opacity = 0.35 }) {
  const hw = width / 2;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      <path
        d={`M0,${height} L0,${height * 0.4} Q0,0 ${hw},0 Q${width},0 ${width},${height * 0.4} L${width},${height}`}
        fill="none"
        stroke={color}
        strokeWidth="1"
        opacity={opacity}
      />
      {/* Inner arch */}
      <path
        d={`M8,${height} L8,${height * 0.45} Q8,10 ${hw},10 Q${width - 8},10 ${width - 8},${height * 0.45} L${width - 8},${height}`}
        fill="none"
        stroke={color}
        strokeWidth="0.6"
        opacity={opacity * 0.6}
      />
      {/* Keystone */}
      <polygon
        points={`${hw - 6},0 ${hw + 6},0 ${hw + 4},18 ${hw - 4},18`}
        fill="none"
        stroke={color}
        strokeWidth="0.7"
        opacity={opacity}
      />
    </svg>
  );
}

function DiamondOrnament({ color = '#b5883a', size = 10 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" style={{ display: 'inline-block' }}>
      <polygon points="5,0 10,5 5,10 0,5" fill={color} opacity="0.55" />
    </svg>
  );
}

function FleurDeLis({ color = '#b5883a', size = 22, opacity = 0.45 }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 24 32" style={{ display: 'inline-block' }}>
      <path
        d="M12,32 C12,32 6,26 6,20 C6,16 8,14 10,13 C8,11 7,9 7,7 C7,4 9,2 12,2 C15,2 17,4 17,7 C17,9 16,11 14,13 C16,14 18,16 18,20 C18,26 12,32 12,32 Z"
        fill="none"
        stroke={color}
        strokeWidth="1"
        opacity={opacity}
      />
      <path
        d="M7,14 C5,13 3,11 3,9 C3,7 5,6 7,7"
        fill="none"
        stroke={color}
        strokeWidth="0.8"
        opacity={opacity}
      />
      <path
        d="M17,14 C19,13 21,11 21,9 C21,7 19,6 17,7"
        fill="none"
        stroke={color}
        strokeWidth="0.8"
        opacity={opacity}
      />
      <line x1="9" y1="26" x2="15" y2="26" stroke={color} strokeWidth="0.8" opacity={opacity} />
    </svg>
  );
}

/* ── Wax Seal ────────────────────────────────────────────── */

function WaxSeal({ phase, onClick }) {
  const isIdle = phase === 'idle';
  const isBreaking = phase === 'breaking';

  return (
    <div style={{ position: 'relative', width: 80, height: 80, cursor: isIdle ? 'pointer' : 'default' }}>
      {/* Left half */}
      <AnimatePresence>
        {!isBreaking && phase !== 'opening' && phase !== 'rising' && phase !== 'expanding' && (
          <motion.div
            key="seal-left"
            style={{
              position: 'absolute',
              inset: 0,
              overflow: 'hidden',
              clipPath: 'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)',
            }}
            animate={isBreaking
              ? { rotate: -25, x: -20, opacity: 0, scale: 1.1 }
              : { scale: [1, 1.03, 1], rotate: 0, x: 0, opacity: 1 }
            }
            transition={isBreaking
              ? { duration: 0.45, ease: 'easeInOut' }
              : { scale: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 0 } }
            }
          >
            <SealSVG />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right half */}
      <AnimatePresence>
        {!isBreaking && phase !== 'opening' && phase !== 'rising' && phase !== 'expanding' && (
          <motion.div
            key="seal-right"
            style={{
              position: 'absolute',
              inset: 0,
              overflow: 'hidden',
              clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)',
            }}
            animate={isBreaking
              ? { rotate: 25, x: 20, opacity: 0, scale: 1.1 }
              : { scale: [1, 1.03, 1], rotate: 0, x: 0, opacity: 1 }
            }
            transition={isBreaking
              ? { duration: 0.45, ease: 'easeInOut' }
              : { scale: { duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }, rotate: { duration: 0 } }
            }
          >
            <SealSVG />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clickable overlay */}
      {isIdle && (
        <button
          onClick={onClick}
          aria-label="Open your invitation"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'transparent',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
          }}
        />
      )}
    </div>
  );
}

function SealSVG() {
  return (
    <svg viewBox="0 0 80 80" width="80" height="80">
      <defs>
        <radialGradient id="sealGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#a02a3a" />
          <stop offset="100%" stopColor="#5c1220" />
        </radialGradient>
        <filter id="sealShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.35)" />
        </filter>
      </defs>

      {/* Wax blob — slightly irregular circle */}
      <path
        d="M40,4 C55,4 76,18 76,38 C76,56 62,76 40,76 C18,76 4,57 4,38 C4,19 25,4 40,4 Z"
        fill="url(#sealGrad)"
        filter="url(#sealShadow)"
      />
      {/* Subtle wax drip at bottom */}
      <ellipse cx="40" cy="75" rx="6" ry="4" fill="#5c1220" opacity="0.6" />

      {/* Embossed inner ring */}
      <circle cx="40" cy="39" r="28" fill="none" stroke="rgba(255,220,160,0.22)" strokeWidth="1.2" />

      {/* Rose window tracery — 6 petals */}
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
        const x = 40 + Math.cos(a) * 14;
        const y = 39 + Math.sin(a) * 14;
        return (
          <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r="7" fill="none" stroke="rgba(255,210,140,0.3)" strokeWidth="0.9" />
        );
      })}

      {/* Radial spokes */}
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
        const x1 = 40 + Math.cos(a) * 8, y1 = 39 + Math.sin(a) * 8;
        const x2 = 40 + Math.cos(a) * 21, y2 = 39 + Math.sin(a) * 21;
        return <line key={i} x1={x1.toFixed(1)} y1={y1.toFixed(1)} x2={x2.toFixed(1)} y2={y2.toFixed(1)} stroke="rgba(255,210,140,0.25)" strokeWidth="0.7" />;
      })}

      {/* Center circle */}
      <circle cx="40" cy="39" r="7" fill="none" stroke="rgba(255,210,140,0.3)" strokeWidth="0.9" />

      {/* Monogram "I & M" */}
      <text
        x="40"
        y="35"
        textAnchor="middle"
        fontFamily="Cinzel, serif"
        fontSize="7"
        fontWeight="500"
        fill="rgba(255,220,150,0.85)"
        letterSpacing="1"
      >I &amp; M</text>
    </svg>
  );
}

/* ── Envelope body ───────────────────────────────────────── */

function EnvelopeBody({ children }) {
  return (
    <div style={{
      position: 'relative',
      width: 'clamp(280px, 80vw, 440px)',
      height: 'clamp(195px, 56vw, 308px)',
      background: 'var(--parchment)',
      borderRadius: 3,
      boxShadow: '0 8px 40px rgba(44,36,24,0.18), 0 2px 8px rgba(44,36,24,0.1), inset 0 0 0 1px rgba(181,136,58,0.25)',
    }}>
      {/* Bottom triangle fold lines */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} preserveAspectRatio="none" viewBox="0 0 440 308">
        <line x1="0" y1="308" x2="220" y2="154" stroke="rgba(181,136,58,0.2)" strokeWidth="1" />
        <line x1="440" y1="308" x2="220" y2="154" stroke="rgba(181,136,58,0.2)" strokeWidth="1" />
        <line x1="0" y1="0" x2="220" y2="154" stroke="rgba(181,136,58,0.18)" strokeWidth="1" />
        {/* Gold border */}
        <rect x="5" y="5" width="430" height="298" fill="none" stroke="rgba(181,136,58,0.35)" strokeWidth="0.8" rx="2" />
        <rect x="11" y="11" width="418" height="286" fill="none" stroke="rgba(181,136,58,0.18)" strokeWidth="0.5" rx="1" />
      </svg>
      {children}
    </div>
  );
}

/* ── Main scene ──────────────────────────────────────────── */

export default function EnvelopeCathedral({ onComplete }) {
  const [phase, setPhase] = useState('idle');
  const reducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ).current;

  const handleOpen = () => {
    if (phase !== 'idle') return;
    if (reducedMotion) { onComplete(); return; }

    setPhase('breaking');
    setTimeout(() => setPhase('opening'), 480);
    setTimeout(() => setPhase('rising'), 1340);
    setTimeout(() => setPhase('expanding'), 2240);
    setTimeout(() => onComplete(), 2860);
  };

  const envW = 'clamp(280px, 80vw, 440px)';
  const envH = 'clamp(195px, 56vw, 308px)';

  return (
    <motion.div
      key="envelope-scene"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--stone)',
        overflow: 'hidden',
        zIndex: 10,
      }}
    >
      {/* Subtle rose window watermark background */}
      <RoseWindowBg />

      {/* Arch above envelope */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        style={{ marginBottom: -10, zIndex: 2 }}
      >
        <GothicArch width={340} height={70} />
      </motion.div>

      {/* Script intro text */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
          color: 'var(--ink-mid)',
          letterSpacing: '0.05em',
          marginBottom: '1.4rem',
          zIndex: 2,
        }}
      >
        {wedding.envelopeIntro}
      </motion.p>

      {/* Envelope + perspective container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.9 }}
        style={{ perspective: '1200px', zIndex: 2 }}
      >
        <EnvelopeBody>
          {/* The flap — rotates back on open */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '56%',
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
              zIndex: 3,
            }}
            animate={{
              rotateX: (phase === 'opening' || phase === 'rising' || phase === 'expanding') ? -180 : 0,
            }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Flap triangle */}
            <svg
              style={{ width: '100%', height: '100%', display: 'block' }}
              viewBox="0 0 440 173"
              preserveAspectRatio="none"
            >
              <path d="M0,0 L440,0 L220,173 Z" fill="var(--parchment-mid)" />
              {/* Gothic arch imprint on flap */}
              <path
                d="M140,0 L140,80 Q140,140 220,140 Q300,140 300,80 L300,0"
                fill="none"
                stroke="rgba(181,136,58,0.28)"
                strokeWidth="1.2"
              />
              <path
                d="M155,0 L155,75 Q155,130 220,130 Q285,130 285,75 L285,0"
                fill="none"
                stroke="rgba(181,136,58,0.15)"
                strokeWidth="0.7"
              />
              {/* Flap fold line */}
              <line x1="0" y1="0" x2="440" y2="0" stroke="rgba(181,136,58,0.35)" strokeWidth="1" />
            </svg>
          </motion.div>

          {/* Wax seal — centered on flap fold */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 4,
            marginTop: '-4%',
          }}>
            <WaxSeal phase={phase} onClick={handleOpen} />
          </div>

          {/* Letter inside — rises when flap opens */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={
              phase === 'rising' || phase === 'expanding'
                ? { y: -120, opacity: 1, scale: 1 }
                : { y: 60, opacity: 0, scale: 0.94 }
            }
            transition={{ duration: 0.85, ease: [0.2, 0, 0.1, 1] }}
            style={{
              position: 'absolute',
              bottom: '-10%',
              left: '8%',
              right: '8%',
              background: 'var(--stone)',
              borderRadius: 2,
              padding: '1.5rem 1.8rem',
              boxShadow: '0 12px 40px rgba(44,36,24,0.2)',
              border: '1px solid rgba(181,136,58,0.3)',
              textAlign: 'center',
              zIndex: 2,
            }}
          >
            {/* Letter decorative top border */}
            <div style={{ marginBottom: '0.8rem' }}>
              <svg viewBox="0 0 200 16" width="120" style={{ margin: '0 auto', display: 'block' }}>
                <line x1="0" y1="8" x2="82" y2="8" stroke="var(--gold)" strokeWidth="0.8" opacity="0.5" />
                <polygon points="100,2 106,8 100,14 94,8" fill="var(--gold)" opacity="0.55" />
                <line x1="118" y1="8" x2="200" y2="8" stroke="var(--gold)" strokeWidth="0.8" opacity="0.5" />
              </svg>
            </div>

            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', fontWeight: 300, fontSize: '0.75rem', color: 'var(--ink-mid)', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
              {wedding.letterGreeting}
            </p>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--crimson)', marginBottom: '0.6rem' }}>
              {wedding.letterLine}
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.1rem', fontWeight: 400, color: 'var(--ink)', letterSpacing: '0.04em' }}>
              Isabella &amp; Matteo
            </p>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--gold)', marginTop: '0.4rem', textTransform: 'uppercase' }}>
              June 12, 2027 · Florence
            </p>
          </motion.div>
        </EnvelopeBody>
      </motion.div>

      {/* Prompt text below */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'idle' ? 1 : 0 }}
        transition={{ delay: phase === 'idle' ? 1.1 : 0, duration: 0.6 }}
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: '0.6rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--ink-muted)',
          marginTop: '2rem',
          zIndex: 2,
        }}
      >
        {wedding.envelopePrompt}
      </motion.p>

      {/* Bottom ornament */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: 8, zIndex: 2 }}
      >
        <div style={{ width: 40, height: 1, background: 'var(--gold)', opacity: 0.3 }} />
        <FleurDeLis size={18} />
        <div style={{ width: 40, height: 1, background: 'var(--gold)', opacity: 0.3 }} />
      </motion.div>

      {/* Full-screen takeover expand */}
      <AnimatePresence>
        {phase === 'expanding' && (
          <motion.div
            key="expand"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.1, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'var(--stone)',
              zIndex: 20,
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
