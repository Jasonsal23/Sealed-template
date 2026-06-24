import { motion } from 'motion/react';
import wedding from '../data/wedding';

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100svh',
        backgroundColor: 'var(--espresso)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '3rem 1.5rem',
        overflow: 'hidden',
      }}
    >
      {/* Subtle radial glow at center */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 70% 60% at center, rgba(196,133,122,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '700px' }}>

        {/* Eyebrow label */}
        <motion.p
          className="font-body text-label"
          style={{ color: 'var(--rose)', marginBottom: '1.5rem' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Save the Date
        </motion.p>

        {/* Thin rose rule */}
        <motion.div
          aria-hidden="true"
          style={{ width: '48px', height: '1px', backgroundColor: 'var(--rose)', margin: '0 auto 2.5rem', opacity: 0.5 }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />

        {/* Partner A name */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
        >
          <h1
            id="landing-heading"
            tabIndex="-1"
            className="font-display"
            style={{
              fontSize: 'clamp(3.8rem, 11vw, 7.5rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'var(--cream)',
              lineHeight: 1.0,
              margin: 0,
              outline: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            {wedding.partnerA}
          </h1>
        </motion.div>

        {/* Ampersand */}
        <motion.div
          aria-hidden="true"
          className="font-display"
          style={{
            fontSize: 'clamp(5rem, 18vw, 13rem)',
            color: 'var(--rose)',
            lineHeight: 0.75,
            fontStyle: 'italic',
            fontWeight: 400,
            userSelect: 'none',
          }}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.6, ease: 'easeOut' }}
        >
          &
        </motion.div>

        {/* Partner B name */}
        <motion.div
          initial={{ opacity: 0, y: -28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
        >
          <span
            className="font-display"
            style={{
              fontSize: 'clamp(3.8rem, 11vw, 7.5rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'var(--cream)',
              lineHeight: 1.0,
              display: 'block',
              letterSpacing: '-0.01em',
            }}
          >
            {wedding.partnerB}
          </span>
        </motion.div>

        {/* Script flourish */}
        <motion.p
          className="font-script"
          style={{
            fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)',
            color: 'var(--gold-light)',
            margin: '1.5rem 0 0',
            opacity: 0.9,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 1, delay: 0.85 }}
        >
          are getting married
        </motion.p>

        {/* Gold divider */}
        <motion.div
          aria-hidden="true"
          style={{ width: '64px', height: '1px', backgroundColor: 'var(--gold)', margin: '2rem auto', opacity: 0.35 }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        />

        {/* Date + venue */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05, ease: 'easeOut' }}
        >
          <p
            className="font-display"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
              color: 'rgba(250,248,245,0.82)',
              fontStyle: 'italic',
              margin: '0 0 0.6rem',
              letterSpacing: '0.01em',
            }}
          >
            {wedding.dateDisplay}
          </p>
          <p
            className="font-body text-label"
            style={{ color: 'var(--rose-light)', opacity: 0.85 }}
          >
            {wedding.venueName} · {wedding.venueCity}
          </p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          aria-hidden="true"
          style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.7, duration: 0.8 }}
        >
          <div style={{ width: '1px', height: '28px', backgroundColor: 'var(--rose-light)' }} />
          <div style={{ width: '5px', height: '5px', borderRight: '1px solid var(--rose-light)', borderBottom: '1px solid var(--rose-light)', transform: 'rotate(45deg)' }} />
        </motion.div>
      </div>
    </section>
  );
}
