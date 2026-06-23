import { motion } from 'motion/react';
import wedding from '../data/wedding';

function OrnamentDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '0 auto', width: '100%', maxWidth: '500px' }}>
      <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--gold)', opacity: 0.4 }} />
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M7 0 L8.5 5.5 L14 7 L8.5 8.5 L7 14 L5.5 8.5 L0 7 L5.5 5.5 Z" fill="var(--gold)" opacity="0.6" />
      </svg>
      <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--gold)', opacity: 0.4 }} />
    </div>
  );
}

export default function Details() {
  return (
    <motion.section
      style={{
        backgroundColor: 'var(--parchment)',
        padding: 'clamp(4rem, 8vw, 7rem) 1.5rem',
        textAlign: 'center',
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <p className="font-body text-label" style={{ color: 'var(--gold)', marginBottom: '3rem' }}>
        The Details
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'clamp(2rem, 5vw, 4rem)',
          maxWidth: '900px',
          margin: '0 auto 3rem',
          alignItems: 'start',
        }}
      >
        {/* When */}
        <div>
          <p className="font-body text-label" style={{ color: 'var(--gold)', marginBottom: '0.75rem' }}>When</p>
          <p
            className="font-display"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', color: 'var(--ink)', fontStyle: 'italic', margin: '0 0 0.4rem' }}
          >
            {wedding.dateDisplay}
          </p>
          <p className="font-display" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)', color: 'var(--ink)', opacity: 0.7, margin: 0 }}>
            {wedding.yearDisplay}
          </p>
        </div>

        {/* Vertical divider (desktop only) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-hidden="true"
        >
          <div style={{ width: '1px', height: '80px', backgroundColor: 'var(--gold)', opacity: 0.3 }} />
        </div>

        {/* Where */}
        <div>
          <p className="font-body text-label" style={{ color: 'var(--gold)', marginBottom: '0.75rem' }}>Where</p>
          <p
            className="font-display"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', color: 'var(--ink)', fontStyle: 'italic', margin: '0 0 0.4rem' }}
          >
            {wedding.venueName}
          </p>
          <p className="font-display" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)', color: 'var(--ink)', opacity: 0.7, margin: 0 }}>
            {wedding.venueCity}
          </p>
        </div>
      </div>

      <OrnamentDivider />

      <p
        className="font-body"
        style={{
          color: 'var(--ink)',
          opacity: 0.7,
          fontStyle: 'italic',
          marginTop: '2.5rem',
          fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
        }}
      >
        {wedding.formalNote}
      </p>
    </motion.section>
  );
}
