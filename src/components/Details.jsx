import { motion } from 'motion/react';
import wedding from '../data/wedding';

function LeafOrnament() {
  return (
    <svg width="28" height="14" viewBox="0 0 28 14" fill="none" aria-hidden="true">
      <path d="M14 7 Q10 2 4 3 Q8 7 14 7Z" fill="var(--sage)" opacity="0.45" />
      <path d="M14 7 Q18 2 24 3 Q20 7 14 7Z" fill="var(--sage)" opacity="0.45" />
      <path d="M14 7 Q10 12 4 11 Q8 7 14 7Z" fill="var(--sage)" opacity="0.3" />
      <path d="M14 7 Q18 12 24 11 Q20 7 14 7Z" fill="var(--sage)" opacity="0.3" />
      <circle cx="14" cy="7" r="1.5" fill="var(--gold)" opacity="0.55" />
    </svg>
  );
}

function OrnamentDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', maxWidth: '480px', margin: '0 auto', width: '100%' }}>
      <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--gold)', opacity: 0.35 }} />
      <LeafOrnament />
      <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--gold)', opacity: 0.35 }} />
    </div>
  );
}

export default function Details() {
  return (
    <motion.section
      style={{
        backgroundColor: 'var(--ink)',
        padding: 'clamp(4rem, 8vw, 7rem) 1.5rem',
        textAlign: 'center',
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <p className="font-body text-label" style={{ color: 'var(--sage)', marginBottom: '3rem', opacity: 0.8 }}>
        The Details
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'clamp(2rem, 5vw, 4rem)',
          maxWidth: '860px',
          margin: '0 auto 3rem',
          alignItems: 'start',
        }}
      >
        {/* When */}
        <div>
          <p className="font-body text-label" style={{ color: 'var(--sage)', marginBottom: '0.85rem', opacity: 0.75 }}>When</p>
          <p
            className="font-display"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', color: 'var(--parchment)', fontStyle: 'italic', margin: '0 0 0.4rem' }}
          >
            {wedding.dateDisplay}
          </p>
          <p className="font-display" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)', color: 'var(--parchment)', opacity: 0.55, margin: 0 }}>
            {wedding.yearDisplay}
          </p>
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-hidden="true">
          <div style={{ width: '1px', height: '70px', backgroundColor: 'var(--gold)', opacity: 0.25 }} />
        </div>

        {/* Where */}
        <div>
          <p className="font-body text-label" style={{ color: 'var(--sage)', marginBottom: '0.85rem', opacity: 0.75 }}>Where</p>
          <p
            className="font-display"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', color: 'var(--parchment)', fontStyle: 'italic', margin: '0 0 0.4rem' }}
          >
            {wedding.venueName}
          </p>
          <p className="font-display" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)', color: 'var(--parchment)', opacity: 0.55, margin: 0 }}>
            {wedding.venueCity}
          </p>
        </div>
      </div>

      <OrnamentDivider />

      <p
        className="font-body"
        style={{
          color: 'var(--parchment)',
          opacity: 0.5,
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
