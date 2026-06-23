import { motion } from 'motion/react';
import wedding from '../data/wedding';

export default function Hero() {
  return (
    <section
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
      {/* Background image — scroll attachment for mobile compatibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${wedding.heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundAttachment: 'scroll',
        }}
        aria-hidden="true"
      />
      {/* Dark overlay — strong enough for guaranteed legibility over any photo */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(10,18,12,0.58)',
        }}
        aria-hidden="true"
      />
      {/* Extra vignette at edges so the center reads as a stage */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 70% at center, transparent 30%, rgba(10,18,12,0.35) 100%)',
        }}
        aria-hidden="true"
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '820px', width: '100%' }}>
        {/* Small eyebrow */}
        <motion.p
          className="font-body text-label"
          style={{ color: 'var(--gold-light)', marginBottom: '1rem', letterSpacing: '0.28em', textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
        >
          Save the Date
        </motion.p>

        {/* Gold hairline */}
        <motion.div
          style={{ width: '50px', height: '1px', backgroundColor: 'var(--gold-light)', margin: '0 auto 1.25rem', opacity: 0.8 }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />

        {/* Couple names */}
        <motion.h1
          id="landing-heading"
          tabIndex="-1"
          className="font-display"
          style={{
            fontSize: 'clamp(3.2rem, 9vw, 7.5rem)',
            color: '#ffffff',
            fontWeight: 300,
            margin: '0 0 0.2rem',
            lineHeight: 1.0,
            letterSpacing: '-0.015em',
            outline: 'none',
            textShadow: '0 2px 28px rgba(0,0,0,0.7)',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: 'easeOut' }}
        >
          {wedding.partnerA}
          <span style={{ color: 'var(--gold)', fontStyle: 'italic', margin: '0 0.12em', fontSize: '1.08em' }}>&</span>
          {wedding.partnerB}
        </motion.h1>

        {/* Script flourish below names */}
        <motion.p
          className="font-script"
          style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)', color: 'var(--gold-light)', margin: '0.2rem 0 0', opacity: 1, textShadow: '0 1px 14px rgba(0,0,0,0.65)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 0.9, delay: 0.75 }}
        >
          are getting married
        </motion.p>

        {/* Date + venue */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
        >
          <div style={{ width: '70px', height: '1px', backgroundColor: 'var(--gold-light)', margin: '1.4rem auto 1.1rem', opacity: 0.7 }} />
          <p
            className="font-display"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', color: '#ffffff', fontStyle: 'italic', margin: '0 0 0.35rem', opacity: 0.95, textShadow: '0 1px 12px rgba(0,0,0,0.6)' }}
          >
            {wedding.dateDisplay}
          </p>
          <p className="font-body text-label" style={{ color: 'var(--gold-light)', margin: 0, letterSpacing: '0.22em', textShadow: '0 1px 10px rgba(0,0,0,0.6)' }}>
            {wedding.venueName} · {wedding.venueCity}
          </p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          style={{ marginTop: '3.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <div style={{ width: '1px', height: '28px', backgroundColor: '#f2f0e8', opacity: 0.7 }} />
          <div style={{ width: '5px', height: '5px', borderRight: '1px solid #f2f0e8', borderBottom: '1px solid #f2f0e8', transform: 'rotate(45deg)', opacity: 0.7 }} />
        </motion.div>
      </div>
    </section>
  );
}
