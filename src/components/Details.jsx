import { motion } from 'motion/react';
import wedding from '../data/wedding';

function DiamondDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', maxWidth: '440px', margin: '0 auto', width: '100%' }}>
      <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--rose)', opacity: 0.25 }} />
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <rect x="5" y="0.5" width="6.5" height="6.5" rx="0.5" fill="var(--rose)" opacity="0.45" transform="rotate(45 5 5)" />
      </svg>
      <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--rose)', opacity: 0.25 }} />
    </div>
  );
}

export default function Details() {
  return (
    <motion.section
      style={{
        backgroundColor: 'var(--blush)',
        padding: 'clamp(4rem, 8vw, 7rem) 1.5rem',
        textAlign: 'center',
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <p className="font-body text-label" style={{ color: 'var(--rose)', marginBottom: '3rem' }}>
        The Details
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'clamp(2rem, 5vw, 4rem)',
          maxWidth: '800px',
          margin: '0 auto 3rem',
          alignItems: 'start',
        }}
      >
        {/* When */}
        <div>
          <p className="font-body text-label" style={{ color: 'var(--rose)', marginBottom: '0.9rem', opacity: 0.7 }}>When</p>
          <p
            className="font-display"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', color: 'var(--espresso)', fontStyle: 'italic', margin: '0 0 0.4rem' }}
          >
            {wedding.dateDisplay}
          </p>
          <p className="font-display" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)', color: 'var(--espresso)', opacity: 0.5, margin: 0 }}>
            {wedding.yearDisplay}
          </p>
        </div>

        {/* Vertical divider (desktop) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-hidden="true">
          <div style={{ width: '1px', height: '70px', backgroundColor: 'var(--rose)', opacity: 0.2 }} />
        </div>

        {/* Where */}
        <div>
          <p className="font-body text-label" style={{ color: 'var(--rose)', marginBottom: '0.9rem', opacity: 0.7 }}>Where</p>
          <p
            className="font-display"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', color: 'var(--espresso)', fontStyle: 'italic', margin: '0 0 0.4rem' }}
          >
            {wedding.venueName}
          </p>
          <p className="font-display" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)', color: 'var(--espresso)', opacity: 0.5, margin: 0 }}>
            {wedding.venueCity}
          </p>
        </div>
      </div>

      <DiamondDivider />

      <p
        className="font-body"
        style={{
          color: 'var(--espresso)',
          opacity: 0.5,
          fontStyle: 'italic',
          marginTop: '2.5rem',
          fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
          fontFamily: "'Playfair Display', serif",
        }}
      >
        {wedding.formalNote}
      </p>
    </motion.section>
  );
}
