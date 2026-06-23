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
      {/* Background image with scrim */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${wedding.heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
        aria-hidden="true"
      />
      {/* Gradient scrim */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(248,244,237,0.72) 0%, rgba(248,244,237,0.55) 40%, rgba(248,244,237,0.78) 100%)',
        }}
        aria-hidden="true"
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', width: '100%' }}>
        {/* Script Save the Date */}
        <motion.p
          className="font-script"
          style={{
            fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
            color: 'var(--wax)',
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
          style={{ width: '60px', height: '1px', backgroundColor: 'var(--gold)', margin: '1rem auto', opacity: 0.6 }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        />

        {/* Couple names */}
        <motion.h1
          id="landing-heading"
          tabIndex="-1"
          className="font-display"
          style={{
            fontSize: 'clamp(3.2rem, 9vw, 7.5rem)',
            color: 'var(--ink)',
            fontWeight: 300,
            margin: '0 0 0.25rem',
            lineHeight: 1.0,
            letterSpacing: '-0.01em',
            outline: 'none',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        >
          Eleanor
          <span style={{ color: 'var(--gold)', fontStyle: 'italic', margin: '0 0.1em', fontSize: '1.1em' }}>&</span>
          Julian
        </motion.h1>

        {/* Date + venue */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: 'easeOut' }}
        >
          <div style={{ width: '80px', height: '1px', backgroundColor: 'var(--gold)', margin: '1.2rem auto 1rem', opacity: 0.5 }} />
          <p
            className="font-display"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', color: 'var(--ink)', fontStyle: 'italic', margin: '0 0 0.3rem', letterSpacing: '0.02em' }}
          >
            {wedding.dateDisplay}
          </p>
          <p
            className="font-body text-label"
            style={{ color: 'var(--gold)', margin: '0 0 0.25rem' }}
          >
            {wedding.venueName} · {wedding.venueCity}
          </p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', opacity: 0.5 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" aria-hidden="true">
            <rect x="6" y="0" width="4" height="12" rx="2" fill="var(--ink)" />
            <path d="M8 20 L2 14 M8 20 L14 14" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
