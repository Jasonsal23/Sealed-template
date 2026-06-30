import { motion } from 'motion/react';
import wedding from '../data/wedding';

function OrionDots() {
  // Three dots like Orion's belt — a minimal celestial nod
  return (
    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', margin: '0 auto' }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: i === 1 ? '6px' : '4px',
          height: i === 1 ? '6px' : '4px',
          borderRadius: '50%',
          backgroundColor: 'var(--gold)',
          opacity: i === 1 ? 0.5 : 0.28,
        }} />
      ))}
    </div>
  );
}

export default function Story() {
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
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <OrionDots />

        <p className="font-script" style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          color: 'var(--ink)',
          margin: '1.2rem 0 0.4rem',
          lineHeight: 1.1,
        }}>
          Written in the Stars
        </p>

        <div style={{ width: '30px', height: '1px', backgroundColor: 'var(--gold)', margin: '0.6rem auto 2rem', opacity: 0.35 }} />

        <p className="font-body" style={{
          fontSize: 'clamp(1.05rem, 2vw, 1.2rem)',
          lineHeight: 1.9,
          color: 'var(--ink)',
          fontStyle: 'italic',
          maxWidth: '54ch',
          margin: '0 auto',
          opacity: 0.78,
          fontFamily: "'Raleway', sans-serif",
          fontWeight: 300,
        }}>
          {wedding.story}
        </p>

        <div style={{ marginTop: '2.5rem' }}>
          <OrionDots />
        </div>
      </div>
    </motion.section>
  );
}
