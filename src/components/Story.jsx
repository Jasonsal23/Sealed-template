import { motion } from 'motion/react';
import wedding from '../data/wedding';

function RingMark() {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden="true">
      <circle cx="21" cy="21" r="18" stroke="var(--rose)" strokeWidth="1" opacity="0.3" />
      <circle cx="21" cy="21" r="13" stroke="var(--gold)" strokeWidth="0.75" opacity="0.25" />
      <circle cx="21" cy="21" r="2.5" fill="var(--rose)" opacity="0.35" />
    </svg>
  );
}

export default function Story() {
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
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <RingMark />

        <p
          className="font-script"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            color: 'var(--espresso)',
            margin: '1rem 0 0.4rem',
            lineHeight: 1.1,
          }}
        >
          How it Started
        </p>

        <div style={{ width: '32px', height: '1px', backgroundColor: 'var(--gold)', margin: '0.6rem auto 2rem', opacity: 0.4 }} />

        <p
          className="font-display"
          style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.22rem)',
            lineHeight: 1.9,
            color: 'var(--espresso)',
            fontStyle: 'italic',
            fontWeight: 400,
            maxWidth: '54ch',
            margin: '0 auto',
            opacity: 0.82,
          }}
        >
          {wedding.story}
        </p>

        <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}>
          <RingMark />
        </div>
      </div>
    </motion.section>
  );
}
