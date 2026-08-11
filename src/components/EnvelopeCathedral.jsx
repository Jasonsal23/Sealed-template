import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import wedding from '../data/wedding.js';

/* ── Decorative SVG pieces ───────────────────────────────── */

function RoseWindowBg() {
  return (
    <svg viewBox="0 0 200 200" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.035, pointerEvents: 'none' }}>
      <g transform="translate(100,100)">
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return <line key={i} x1="0" y1="0" x2={(Math.cos(a) * 72).toFixed(1)} y2={(Math.sin(a) * 72).toFixed(1)} stroke="#b5883a" strokeWidth="0.8" />;
        })}
        {[28, 50, 68, 82].map(r => <circle key={r} cx="0" cy="0" r={r} fill="none" stroke="#b5883a" strokeWidth="0.6" />)}
        {Array.from({ length: 6 }, (_, i) => {
          const a = (i / 6) * Math.PI * 2;
          return <circle key={i} cx={(Math.cos(a) * 43).toFixed(1)} cy={(Math.sin(a) * 43).toFixed(1)} r="10" fill="none" stroke="#b5883a" strokeWidth="0.5" />;
        })}
      </g>
    </svg>
  );
}

function GothicArchFrame({ width = 380, height = 80 }) {
  const hw = width / 2;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      <path d={`M0,${height} L0,${height * 0.38} Q0,0 ${hw},0 Q${width},0 ${width},${height * 0.38} L${width},${height}`} fill="none" stroke="var(--gold)" strokeWidth="1" opacity="0.35" />
      <path d={`M10,${height} L10,${height * 0.45} Q10,12 ${hw},12 Q${width - 10},12 ${width - 10},${height * 0.45} L${width - 10},${height}`} fill="none" stroke="var(--gold)" strokeWidth="0.6" opacity="0.18" />
      <polygon points={`${hw - 7},0 ${hw + 7},0 ${hw + 5},22 ${hw - 5},22`} fill="none" stroke="var(--gold)" strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function FleurDeLis({ size = 20, opacity = 0.45 }) {
  return (
    <svg width={size} height={size * 1.35} viewBox="0 0 24 32" style={{ display: 'inline-block' }}>
      <path d="M12,32 C12,32 6,26 6,20 C6,16 8,14 10,13 C8,11 7,9 7,7 C7,4 9,2 12,2 C15,2 17,4 17,7 C17,9 16,11 14,13 C16,14 18,16 18,20 C18,26 12,32 12,32 Z" fill="none" stroke="var(--gold)" strokeWidth="1" opacity={opacity} />
      <path d="M7,14 C5,13 3,11 3,9 C3,7 5,6 7,7" fill="none" stroke="var(--gold)" strokeWidth="0.8" opacity={opacity} />
      <path d="M17,14 C19,13 21,11 21,9 C21,7 19,6 17,7" fill="none" stroke="var(--gold)" strokeWidth="0.8" opacity={opacity} />
      <line x1="9" y1="26" x2="15" y2="26" stroke="var(--gold)" strokeWidth="0.8" opacity={opacity} />
    </svg>
  );
}

/* ── Wax Seal ────────────────────────────────────────────── */

function SealSVG() {
  return (
    <svg viewBox="0 0 84 84" width="84" height="84">
      <defs>
        <radialGradient id="sealG" cx="38%" cy="33%" r="62%">
          <stop offset="0%" stopColor="#ad2f40" />
          <stop offset="100%" stopColor="#5c1220" />
        </radialGradient>
        <filter id="sealF" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="rgba(0,0,0,0.4)" />
        </filter>
      </defs>
      {/* Irregular wax blob */}
      <path d="M42,5 C48,4 60,8 68,18 C76,28 78,40 74,52 C70,64 59,78 42,78 C25,78 10,66 6,52 C2,38 6,22 16,12 C24,5 36,6 42,5 Z" fill="url(#sealG)" filter="url(#sealF)" />
      {/* Small wax drips */}
      <ellipse cx="42" cy="77" rx="7" ry="4.5" fill="#5c1220" opacity="0.55" />
      <ellipse cx="60" cy="70" rx="4" ry="3" fill="#5c1220" opacity="0.35" />
      {/* Embossed outer ring */}
      <circle cx="42" cy="40" r="29" fill="none" stroke="rgba(255,215,150,0.2)" strokeWidth="1.4" />
      {/* Rose window — 6 petals */}
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
        const x = 42 + Math.cos(a) * 14, y = 40 + Math.sin(a) * 14;
        return <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r="7.5" fill="none" stroke="rgba(255,205,130,0.28)" strokeWidth="0.9" />;
      })}
      {/* Spokes */}
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
        const x1 = 42 + Math.cos(a) * 7, y1 = 40 + Math.sin(a) * 7;
        const x2 = 42 + Math.cos(a) * 21, y2 = 40 + Math.sin(a) * 21;
        return <line key={i} x1={x1.toFixed(1)} y1={y1.toFixed(1)} x2={x2.toFixed(1)} y2={y2.toFixed(1)} stroke="rgba(255,205,130,0.22)" strokeWidth="0.7" />;
      })}
      <circle cx="42" cy="40" r="7" fill="none" stroke="rgba(255,215,150,0.28)" strokeWidth="1" />
      {/* Monogram */}
      <text x="42" y="44" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="8" fontWeight="600" fill="rgba(255,220,145,0.82)" letterSpacing="0.5">I&amp;M</text>
    </svg>
  );
}

function WaxSeal({ phase, onClick }) {
  const isIdle = phase === 'idle';
  const breaking = phase === 'breaking';
  const gone = phase === 'opening' || phase === 'rising' || phase === 'expanding';

  return (
    <div style={{ position: 'relative', width: 84, height: 84 }}>
      {!gone && (
        <>
          {/* Left half */}
          <motion.div
            style={{ position: 'absolute', inset: 0, clipPath: 'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)', overflow: 'hidden' }}
            animate={breaking
              ? { rotate: -28, x: -22, y: -8, opacity: 0, scale: 1.08 }
              : { scale: [1, 1.025, 1], rotate: 0, x: 0, y: 0, opacity: 1 }
            }
            transition={breaking
              ? { duration: 0.42, ease: [0.4, 0, 1, 1] }
              : { scale: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } }
            }
          >
            <SealSVG />
          </motion.div>
          {/* Right half */}
          <motion.div
            style={{ position: 'absolute', inset: 0, clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)', overflow: 'hidden' }}
            animate={breaking
              ? { rotate: 28, x: 22, y: -8, opacity: 0, scale: 1.08 }
              : { scale: [1, 1.025, 1], rotate: 0, x: 0, y: 0, opacity: 1 }
            }
            transition={breaking
              ? { duration: 0.42, ease: [0.4, 0, 1, 1] }
              : { scale: { duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.12 } }
            }
          >
            <SealSVG />
          </motion.div>
        </>
      )}

      {isIdle && (
        <button
          onClick={onClick}
          aria-label="Open your invitation"
          style={{ position: 'absolute', inset: 0, background: 'transparent', border: 'none', borderRadius: '50%', cursor: 'pointer' }}
        />
      )}
    </div>
  );
}

/* ── Invitation letter content ───────────────────────────── */

function LetterCard() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'var(--stone)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(0.6rem, 2vw, 1.2rem) clamp(0.8rem, 2.5vw, 1.5rem)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Double border */}
      <div style={{ position: 'absolute', inset: 5, border: '1px solid rgba(181,136,58,0.4)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 9, border: '0.5px solid rgba(181,136,58,0.2)', pointerEvents: 'none' }} />

      {/* Top gothic arch mini */}
      <svg viewBox="0 0 120 32" width="clamp(60px, 20vw, 100px)" style={{ marginBottom: 4 }}>
        <path d="M0,32 L0,14 Q0,0 60,0 Q120,0 120,14 L120,32" fill="none" stroke="rgba(181,136,58,0.38)" strokeWidth="0.9" />
        <path d="M8,32 L8,18 Q8,8 60,8 Q112,8 112,18 L112,32" fill="none" stroke="rgba(181,136,58,0.2)" strokeWidth="0.6" />
        <polygon points="54,0 66,0 64,18 56,18" fill="none" stroke="rgba(181,136,58,0.35)" strokeWidth="0.7" />
      </svg>

      {/* Top rule */}
      <svg viewBox="0 0 160 10" width="clamp(80px, 24vw, 130px)" style={{ marginBottom: 8 }}>
        <line x1="0" y1="5" x2="68" y2="5" stroke="var(--gold)" strokeWidth="0.7" opacity="0.45" />
        <polygon points="80,1 86,5 80,9 74,5" fill="var(--gold)" opacity="0.5" />
        <line x1="92" y1="5" x2="160" y2="5" stroke="var(--gold)" strokeWidth="0.7" opacity="0.45" />
      </svg>

      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(0.52rem, 1.4vw, 0.72rem)', color: 'var(--ink-mid)', letterSpacing: '0.06em', textAlign: 'center', lineHeight: 1.4, marginBottom: 4 }}>
        {wedding.letterGreeting}
      </p>

      <p style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(0.42rem, 1.1vw, 0.58rem)', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--crimson)', textAlign: 'center', marginBottom: 8 }}>
        {wedding.letterLine}
      </p>

      {/* Diamond ornament */}
      <svg viewBox="0 0 30 10" width="28" style={{ marginBottom: 6 }}>
        <polygon points="15,1 19,5 15,9 11,5" fill="var(--gold)" opacity="0.5" />
        <line x1="0" y1="5" x2="9" y2="5" stroke="var(--gold)" strokeWidth="0.7" opacity="0.4" />
        <line x1="21" y1="5" x2="30" y2="5" stroke="var(--gold)" strokeWidth="0.7" opacity="0.4" />
      </svg>

      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(0.85rem, 2.2vw, 1.15rem)', fontWeight: 400, color: 'var(--ink)', letterSpacing: '0.03em', textAlign: 'center', lineHeight: 1.2, marginBottom: 5 }}>
        Isabella &amp; Matteo
      </p>

      <p style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(0.4rem, 1vw, 0.54rem)', letterSpacing: '0.18em', color: 'var(--gold)', textTransform: 'uppercase', textAlign: 'center', marginBottom: 2 }}>
        June 12, 2027
      </p>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(0.42rem, 1vw, 0.56rem)', color: 'var(--ink-muted)', textAlign: 'center' }}>
        Villa di Bellariva · Florence
      </p>
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
    setTimeout(() => setPhase('opening'), 480);    // flap begins (1.3s duration → done ~1780ms)
    setTimeout(() => setPhase('rising'), 1700);   // letter starts rising just before flap fully open
    setTimeout(() => setPhase('expanding'), 2780); // letter reaches top, white wash begins
    setTimeout(() => onComplete(), 3400);          // handoff to landing
  };

  const isOpen = phase === 'opening' || phase === 'rising' || phase === 'expanding';
  const isRising = phase === 'rising' || phase === 'expanding';

  return (
    <motion.div
      key="envelope-scene"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: 'var(--stone)', overflow: 'hidden',
      }}
    >
      <RoseWindowBg />

      {/* Gothic arch above */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.9 }}
        style={{ marginBottom: -8, zIndex: 2 }}
      >
        <GothicArchFrame width={380} height={72} />
      </motion.div>

      {/* "You are invited" */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: 'italic', fontWeight: 300,
          fontSize: 'clamp(1rem, 2.8vw, 1.45rem)',
          color: 'var(--ink-mid)', letterSpacing: '0.06em',
          marginBottom: '1.2rem', zIndex: 2,
        }}
      >
        {wedding.envelopeIntro}
      </motion.p>

      {/* ── ENVELOPE ASSEMBLY ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1.0 }}
        style={{ perspective: '1200px', zIndex: 2 }}
      >
        {/*
          Z-stack (bottom → top):
          1. Back panel    — parchment bg, side/bottom fold lines
          2. Letter card   — rises from inside to above envelope
          3. Front overlay — 3 triangle fills + fold lines → creates "pocket" masking
          4. Flap          — top triangle, 3D rotates open
          5. Wax seal      — on the fold line, breaks first
        */}
        <div style={{
          position: 'relative',
          width: 'clamp(280px, 82vw, 448px)',
          height: 'clamp(196px, 57vw, 314px)',
        }}>

          {/* ── L1: Back of envelope ── */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'var(--parchment)',
            boxShadow: '0 10px 48px rgba(44,36,24,0.2), 0 2px 8px rgba(44,36,24,0.1)',
          }}>
            {/* Back fold lines — only back-facing diagonals visible here */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 448 314" preserveAspectRatio="none">
              {/* Side fold lines (back of envelope shows bottom-left and bottom-right) */}
              <line x1="0" y1="314" x2="224" y2="157" stroke="rgba(181,136,58,0.16)" strokeWidth="1" />
              <line x1="448" y1="314" x2="224" y2="157" stroke="rgba(181,136,58,0.16)" strokeWidth="1" />
            </svg>
          </div>

          {/* ── L2: Letter — starts at bottom, rises upward ── */}
          <motion.div
            style={{
              position: 'absolute',
              left: '9%', right: '9%',
              bottom: 0,
              height: '92%',
              zIndex: 2,
              boxShadow: '0 4px 20px rgba(44,36,24,0.18), 0 1px 4px rgba(44,36,24,0.1)',
            }}
            animate={isRising
              ? { y: -280, boxShadow: '0 24px 70px rgba(44,36,24,0.32), 0 8px 20px rgba(44,36,24,0.18)' }
              : { y: 0, boxShadow: '0 4px 20px rgba(44,36,24,0.18), 0 1px 4px rgba(44,36,24,0.1)' }
            }
            transition={{ duration: 1.05, ease: [0.22, 0, 0.08, 1] }}
          >
            <LetterCard />
          </motion.div>

          {/* ── L3: Front overlay — 3 triangle fills (pocket masking) ── */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
            <svg viewBox="0 0 448 314" width="100%" height="100%" preserveAspectRatio="none">
              {/* Bottom flap fill */}
              <polygon points="0,314 448,314 224,157" fill="var(--parchment)" />
              {/* Left flap fill */}
              <polygon points="0,0 0,314 224,157" fill="var(--parchment)" />
              {/* Right flap fill */}
              <polygon points="448,0 448,314 224,157" fill="var(--parchment)" />

              {/* Fold lines on the three visible flaps */}
              <line x1="0" y1="314" x2="224" y2="157" stroke="rgba(181,136,58,0.22)" strokeWidth="1" />
              <line x1="448" y1="314" x2="224" y2="157" stroke="rgba(181,136,58,0.22)" strokeWidth="1" />
              <line x1="0" y1="0" x2="224" y2="157" stroke="rgba(181,136,58,0.15)" strokeWidth="0.8" />
              <line x1="448" y1="0" x2="224" y2="157" stroke="rgba(181,136,58,0.15)" strokeWidth="0.8" />

              {/* Bottom triangle inner shadow at center point */}
              <polygon points="160,314 288,314 224,220" fill="rgba(44,36,24,0.04)" />

              {/* Outer gold border */}
              <rect x="4" y="4" width="440" height="306" fill="none" stroke="rgba(181,136,58,0.38)" strokeWidth="0.9" rx="2" />
              <rect x="9" y="9" width="430" height="296" fill="none" stroke="rgba(181,136,58,0.15)" strokeWidth="0.5" rx="1" />
            </svg>
          </div>

          {/* ── L4: Flap — top triangle, 3D hinges from top edge ── */}
          <motion.div
            style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: '50%',
              zIndex: 4,
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
            }}
            animate={{ rotateX: isOpen ? -180 : 0 }}
            transition={{
              duration: 1.3,
              ease: [0.82, 0, 0.22, 1], // very slow dramatic start, settles smoothly
            }}
          >
            <svg viewBox="0 0 448 157" width="100%" height="100%" preserveAspectRatio="none" style={{ display: 'block' }}>
              {/* Flap triangle */}
              <polygon points="0,0 448,0 224,157" fill="var(--parchment-mid)" />
              {/* Gothic arch embossed on flap interior */}
              <path d="M148,0 L148,92 Q148,157 224,157 Q300,157 300,92 L300,0"
                fill="none" stroke="rgba(181,136,58,0.25)" strokeWidth="1.1" />
              <path d="M162,0 L162,86 Q162,144 224,144 Q286,144 286,86 L286,0"
                fill="none" stroke="rgba(181,136,58,0.12)" strokeWidth="0.6" />
              {/* Flap fold edge */}
              <line x1="0" y1="0" x2="448" y2="0" stroke="rgba(181,136,58,0.4)" strokeWidth="1.2" />
            </svg>
          </motion.div>

          {/* ── L5: Wax seal — sits at fold line (center of envelope) ── */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 5,
          }}>
            <WaxSeal phase={phase} onClick={handleOpen} />
          </div>

        </div>
      </motion.div>

      {/* Prompt below envelope */}
      <motion.p
        animate={{ opacity: phase === 'idle' ? 1 : 0 }}
        transition={{ delay: phase === 'idle' ? 1.2 : 0, duration: 0.6 }}
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'var(--ink-muted)', marginTop: '2rem', zIndex: 2,
        }}
      >
        {wedding.envelopePrompt}
      </motion.p>

      {/* Bottom fleur-de-lis ornament */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'idle' ? 1 : 0 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: 10, zIndex: 2 }}
      >
        <div style={{ width: 44, height: 1, background: 'var(--gold)', opacity: 0.28 }} />
        <FleurDeLis size={18} opacity={0.42} />
        <div style={{ width: 44, height: 1, background: 'var(--gold)', opacity: 0.28 }} />
      </motion.div>

      {/* Full-screen cream wash takeover */}
      <AnimatePresence>
        {phase === 'expanding' && (
          <motion.div
            key="expand"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.65, ease: 'easeInOut' }}
            style={{ position: 'fixed', inset: 0, background: 'var(--stone)', zIndex: 20 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
