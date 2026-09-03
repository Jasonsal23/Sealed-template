import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import wedding from '../data/wedding';

const polaroidImage = wedding.gallery[2];

function AmpersandBurst() {
  const [bursts, setBursts] = useState([]);
  const prefersReduced = useReducedMotion();

  const spark = () => {
    if (prefersReduced) return;
    const id = Date.now();
    const particles = Array.from({ length: 10 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 10 + Math.random() * 0.3;
      return {
        key: `${id}-${i}`,
        dx: Math.cos(angle) * (28 + Math.random() * 18),
        dy: Math.sin(angle) * (28 + Math.random() * 18),
      };
    });
    setBursts(b => [...b, { id, particles }]);
  };

  const removeBurst = id => setBursts(b => b.filter(burst => burst.id !== id));

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <motion.span
        onClick={spark}
        role="button"
        tabIndex={0}
        aria-label="A little spark, just because"
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); spark(); } }}
        style={{
          color: 'var(--accent)',
          fontStyle: 'italic',
          margin: '0 0.1em',
          fontSize: '1.1em',
          cursor: 'pointer',
          display: 'inline-block',
        }}
        animate={
          prefersReduced
            ? {}
            : {
                textShadow: [
                  '0 0 12px rgba(var(--accent-rgb),0.35)',
                  '0 0 26px rgba(var(--accent-rgb),0.7)',
                  '0 0 12px rgba(var(--accent-rgb),0.35)',
                ],
              }
        }
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.92 }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        &
      </motion.span>

      {bursts.map(burst => (
        <span key={burst.id} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden="true">
          {burst.particles.map((p, i) => (
            <motion.span
              key={p.key}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-light)',
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: p.dx, y: p.dy, opacity: 0, scale: 0.3 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              onAnimationComplete={i === 0 ? () => removeBurst(burst.id) : undefined}
            />
          ))}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const parallaxX = useSpring(rawX, { stiffness: 40, damping: 20 });
  const parallaxY = useSpring(rawY, { stiffness: 40, damping: 20 });

  const handlePointerMove = e => {
    if (prefersReduced || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(relX * -22);
    rawY.set(relY * -16);
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        textAlign: 'center',
        padding: '2rem 1.5rem',
      }}
    >
      {/* Background video with subtle mouse parallax (falls back to a still
          poster frame for prefers-reduced-motion) */}
      {prefersReduced ? (
        <div
          style={{
            position: 'absolute',
            inset: '-3%',
            backgroundImage: `url(${wedding.heroVideoPoster})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          aria-hidden="true"
        />
      ) : (
        <motion.video
          src={wedding.heroVideo}
          poster={wedding.heroVideoPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            position: 'absolute',
            inset: '-3%',
            width: '106%',
            height: '106%',
            objectFit: 'cover',
            x: parallaxX,
            y: parallaxY,
          }}
          aria-hidden="true"
        />
      )}
      {/* Gradient scrim — dark, moody vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(28,16,9,0.35) 0%, rgba(28,16,9,0.5) 45%, rgba(28,16,9,0.88) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Floating polaroid — a second photo peeking in, tilted, straightens on hover */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 'clamp(4rem, 12vh, 7rem)',
          right: 'clamp(1rem, 6vw, 5rem)',
          width: 'clamp(90px, 16vw, 150px)',
          padding: '10px 10px 28px',
          backgroundColor: 'var(--parchment)',
          boxShadow: '0 16px 40px rgba(0,0,0,0.45)',
          zIndex: 1,
        }}
        initial={{ opacity: 0, y: 30, rotate: -9 }}
        animate={{ opacity: 1, y: 0, rotate: -7 }}
        whileHover={{ rotate: 0, scale: 1.05 }}
        transition={{ opacity: { duration: 0.9, delay: 1.1 }, y: { duration: 0.9, delay: 1.1 }, rotate: { duration: 0.4, ease: 'easeOut' } }}
        aria-hidden="true"
      >
        <div style={{ aspectRatio: '1 / 1', overflow: 'hidden' }}>
          <img
            src={polaroidImage}
            alt=""
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.85) brightness(0.95)' }}
          />
        </div>
      </motion.div>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1100px', width: '100%' }}>
        {/* Script Save the Date */}
        <motion.p
          className="font-script"
          style={{
            fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
            color: 'var(--brass)',
            margin: '0 0 0.25rem',
            lineHeight: 1.1,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
        >
          Save the Date
        </motion.p>

        {/* Gold hairline */}
        <motion.div
          style={{ width: '60px', height: '1px', backgroundColor: 'var(--accent)', margin: '1rem auto', opacity: 0.6 }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        />

        {/* Couple names — each word lands with its own bounce */}
        <h1
          id="landing-heading"
          tabIndex="-1"
          className="font-display"
          style={{
            fontSize: 'clamp(2rem, 6.5vw, 5.5rem)',
            color: 'var(--text-light)',
            fontWeight: 300,
            margin: '0 0 0.25rem',
            lineHeight: 1.0,
            letterSpacing: '-0.01em',
            outline: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {wedding.partnerA}
          </motion.span>
          <AmpersandBurst />
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {wedding.partnerB}
          </motion.span>
        </h1>

        {/* Date + venue */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: 'easeOut' }}
        >
          <div style={{ width: '80px', height: '1px', backgroundColor: 'var(--accent)', margin: '1.2rem auto 1rem', opacity: 0.5 }} />
          <p
            className="font-display"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', color: 'var(--text-light)', fontStyle: 'italic', margin: '0 0 0.3rem', letterSpacing: '0.02em' }}
          >
            {wedding.dateDisplay}
          </p>
          <p
            className="font-body text-label"
            style={{ color: 'var(--accent)', margin: '0 0 0.25rem' }}
          >
            {wedding.venueName} · {wedding.venueCity}
          </p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', opacity: 0.5 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5, y: [0, 6, 0] }}
          transition={{ opacity: { delay: 1.5, duration: 0.8 }, y: { delay: 2, duration: 1.8, repeat: Infinity, ease: 'easeInOut' } }}
        >
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" aria-hidden="true">
            <rect x="6" y="0" width="4" height="12" rx="2" fill="var(--text-light)" />
            <path d="M8 20 L2 14 M8 20 L14 14" stroke="var(--text-light)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
