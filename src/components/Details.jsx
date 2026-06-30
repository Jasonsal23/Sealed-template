import { motion } from 'motion/react';
import wedding from '../data/wedding';

function StarDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', maxWidth: '440px', margin: '0 auto', width: '100%' }}>
      <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--gold)', opacity: 0.2 }} />
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <line x1="8" y1="0" x2="8" y2="16" stroke="var(--gold)" strokeWidth="0.8" opacity="0.4" />
        <line x1="0" y1="8" x2="16" y2="8" stroke="var(--gold)" strokeWidth="0.8" opacity="0.4" />
        <line x1="2.3" y1="2.3" x2="13.7" y2="13.7" stroke="var(--gold)" strokeWidth="0.5" opacity="0.25" />
        <line x1="13.7" y1="2.3" x2="2.3" y2="13.7" stroke="var(--gold)" strokeWidth="0.5" opacity="0.25" />
        <circle cx="8" cy="8" r="2" fill="var(--gold)" opacity="0.45" />
      </svg>
      <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--gold)', opacity: 0.2 }} />
    </div>
  );
}

export default function Details() {
  return (
    <motion.section
      style={{
        backgroundColor: 'var(--cream)',
        padding: 'clamp(4rem, 8vw, 7rem) 1.5rem',
        textAlign: 'center',
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <p className="font-display text-label" style={{ color: 'var(--gold)', marginBottom: '3rem', opacity: 0.75 }}>
        The Details
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 'clamp(2rem, 5vw, 4rem)',
        maxWidth: '800px',
        margin: '0 auto 3rem',
        alignItems: 'start',
      }}>
        <div>
          <p className="font-display text-label" style={{ color: 'var(--gold)', marginBottom: '0.9rem', opacity: 0.65, fontSize: '0.55rem' }}>When</p>
          <p className="font-display" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', color: 'var(--ink)', fontWeight: 400, letterSpacing: '0.04em', margin: '0 0 0.45rem' }}>
            {wedding.dateDisplay}
          </p>
          <p className="font-display" style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)', color: 'var(--ink)', opacity: 0.45, letterSpacing: '0.04em', margin: 0 }}>
            {wedding.yearDisplay}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-hidden="true">
          <div style={{ width: '1px', height: '60px', backgroundColor: 'var(--gold)', opacity: 0.18 }} />
        </div>

        <div>
          <p className="font-display text-label" style={{ color: 'var(--gold)', marginBottom: '0.9rem', opacity: 0.65, fontSize: '0.55rem' }}>Where</p>
          <p className="font-display" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', color: 'var(--ink)', fontWeight: 400, letterSpacing: '0.04em', margin: '0 0 0.45rem' }}>
            {wedding.venueName}
          </p>
          <p className="font-display" style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)', color: 'var(--ink)', opacity: 0.45, letterSpacing: '0.04em', margin: 0 }}>
            {wedding.venueCity}
          </p>
        </div>
      </div>

      <StarDivider />

      <p className="font-body" style={{
        color: 'var(--ink)', opacity: 0.45, fontStyle: 'italic', marginTop: '2.5rem',
        fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', fontFamily: "'Raleway', sans-serif",
      }}>
        {wedding.formalNote}
      </p>
    </motion.section>
  );
}
