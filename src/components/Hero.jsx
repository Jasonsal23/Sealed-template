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
      {/* Gradient scrim — light enough to see the photo, dense enough for legible text */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(26,40,32,0.38) 0%, rgba(26,40,32,0.18) 35%, rgba(26,40,32,0.28) 100%)',
        }}
        aria-hidden="true"
      />
      {/* Cream center panel for text legibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 55% at center, rgba(242,240,232,0.72) 0%, rgba(242,240,232,0) 100%)',
        }}
        aria-hidden="true"
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '820px', width: '100%' }}>
        {/* Small eyebrow */}
        <motion.p
          className="font-body text-label"
          style={{ color: 'var(--gold-light)', marginBottom: '1rem', letterSpacing: '0.28em' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
        >
          Save the Date
        </motion.p>

        {/* Gold hairline */}
        <motion.div
          style={{ width: '50px', height: '1px', backgroundColor: 'var(--gold)', margin: '0 auto 1.25rem', opacity: 0.55 }}
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
            color: '#f2f0e8',
            fontWeight: 300,
            margin: '0 0 0.2rem',
            lineHeight: 1.0,
            letterSpacing: '-0.015em',
            outline: 'none',
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
          style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)', color: 'var(--gold-light)', margin: '0.2rem 0 0', opacity: 0.9 }}
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
          <div style={{ width: '70px', height: '1px', backgroundColor: 'var(--gold)', margin: '1.4rem auto 1.1rem', opacity: 0.45 }} />
          <p
            className="font-display"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', color: '#f2f0e8', fontStyle: 'italic', margin: '0 0 0.35rem', opacity: 0.9 }}
          >
            {wedding.dateDisplay}
          </p>
          <p className="font-body text-label" style={{ color: 'var(--gold-light)', margin: 0, letterSpacing: '0.22em' }}>
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
