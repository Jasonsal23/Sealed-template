import { useMemo } from 'react';
import { motion } from 'motion/react';
import wedding from '../data/wedding';

// Sparse star field for the hero — different from the opening but connected
function HeroStars() {
  const stars = useMemo(() => {
    const out = [];
    let s = 0xc0ffee42;
    const rng = () => { s = (s ^ (s << 13)) >>> 0; s = (s ^ (s >> 7)) >>> 0; s = (s ^ (s << 5)) >>> 0; return s / 0xffffffff; };
    for (let i = 0; i < 60; i++) {
      out.push({ id: i, x: rng() * 100, y: rng() * 100, r: 0.1 + rng() * 0.3, op: 0.2 + rng() * 0.45, d: rng() * 4, dur: 2 + rng() * 3 });
    }
    return out;
  }, []);

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true">
      <defs>
        <radialGradient id="hero-nebula" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#3020a0" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#07091a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill="url(#hero-nebula)" />
      {stars.map(s => (
        <motion.circle key={s.id} cx={s.x} cy={s.y} r={s.r} fill="#fff"
          initial={{ opacity: 0 }}
          animate={s.id % 3 === 0
            ? { opacity: [0, s.op, s.op * 0.4, s.op] }
            : { opacity: s.op }
          }
          transition={{ delay: s.d, duration: s.dur, repeat: s.id % 3 === 0 ? Infinity : 0, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100svh',
        backgroundColor: 'var(--midnight)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '3rem 1.5rem',
        overflow: 'hidden',
      }}
    >
      <HeroStars />

      {/* Bottom gradient fade into next section */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '180px',
        background: 'linear-gradient(to bottom, transparent, rgba(7,9,26,0.95))',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '760px', width: '100%' }}>

        {/* "Save the Date" eyebrow */}
        <motion.p
          className="font-display text-label"
          style={{ color: 'var(--starlight)', marginBottom: '1.5rem', opacity: 0.75 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.75, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Save the Date
        </motion.p>

        {/* Gold hairline */}
        <motion.div aria-hidden="true"
          style={{ width: '40px', height: '1px', backgroundColor: 'var(--starlight)', margin: '0 auto 2rem', opacity: 0.45 }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
        />

        {/* Partner A */}
        <motion.h1
          id="landing-heading"
          tabIndex="-1"
          className="font-display"
          style={{
            fontSize: 'clamp(3rem, 10vw, 7rem)',
            fontWeight: 400,
            color: 'var(--cream)',
            lineHeight: 1.0,
            margin: 0,
            outline: 'none',
            letterSpacing: '0.06em',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
        >
          {wedding.partnerA}
        </motion.h1>

        {/* Ampersand */}
        <motion.div
          aria-hidden="true"
          className="font-script"
          style={{
            fontSize: 'clamp(3rem, 10vw, 6.5rem)',
            color: 'var(--starlight)',
            lineHeight: 0.9,
            opacity: 0.9,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          &amp;
        </motion.div>

        {/* Partner B */}
        <motion.div
          className="font-display"
          style={{
            fontSize: 'clamp(3rem, 10vw, 7rem)',
            fontWeight: 400,
            color: 'var(--cream)',
            lineHeight: 1.0,
            letterSpacing: '0.06em',
          }}
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
        >
          {wedding.partnerB}
        </motion.div>

        {/* Script flourish */}
        <motion.p
          className="font-script"
          style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)', color: 'rgba(240,204,96,0.75)', margin: '1.2rem 0 0' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.85 }}
        >
          are getting married
        </motion.p>

        {/* Divider */}
        <motion.div aria-hidden="true"
          style={{ width: '56px', height: '1px', backgroundColor: 'var(--starlight)', margin: '1.8rem auto', opacity: 0.3 }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 1.0 }}
        />

        {/* Date + venue */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05 }}
        >
          <p className="font-display"
            style={{ fontSize: 'clamp(0.85rem, 2vw, 1.15rem)', color: 'rgba(254,250,242,0.72)', fontWeight: 400, letterSpacing: '0.08em', margin: '0 0 0.5rem' }}>
            {wedding.dateDisplay}
          </p>
          <p className="font-body text-label" style={{ color: 'var(--starlight)', opacity: 0.6, fontSize: '0.58rem' }}>
            {wedding.venueName} · {wedding.venueCity}
          </p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div aria-hidden="true"
          style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
          initial={{ opacity: 0 }} animate={{ opacity: 0.35 }} transition={{ delay: 1.7, duration: 0.8 }}
        >
          <div style={{ width: '1px', height: '26px', backgroundColor: 'var(--starlight)' }} />
          <div style={{ width: '5px', height: '5px', borderRight: '1px solid var(--starlight)', borderBottom: '1px solid var(--starlight)', transform: 'rotate(45deg)' }} />
        </motion.div>
      </div>
    </section>
  );
}
