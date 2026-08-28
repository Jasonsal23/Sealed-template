import { useState } from 'react';
import { motion } from 'motion/react';
import wedding from '../data/wedding';

function FlipCard({ prompt, answer }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div style={{ perspective: '1400px' }}>
      <motion.button
        onClick={() => setFlipped(f => !f)}
        aria-pressed={flipped}
        aria-label={flipped ? answer : `${prompt} — tap to reveal`}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4 / 5',
          border: 'none',
          background: 'none',
          padding: 0,
          cursor: 'pointer',
          transformStyle: 'preserve-3d',
        }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Front — the prompt */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.85rem',
            padding: '1.5rem',
            textAlign: 'center',
            backgroundColor: 'rgba(var(--accent-rgb),0.06)',
            border: '1px solid rgba(var(--accent-rgb),0.4)',
            borderRadius: '2px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" style={{ opacity: 0.7 }}>
            <path d="M4 11 Q11 4 18 11 Q11 18 4 11 Z" stroke="var(--accent)" strokeWidth="1" />
            <circle cx="11" cy="11" r="2.2" fill="var(--accent)" />
          </svg>
          <p
            className="font-display"
            style={{
              color: 'var(--text-light)',
              fontSize: 'clamp(1.05rem, 2.4vw, 1.35rem)',
              fontStyle: 'italic',
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            {prompt}
          </p>
          <span className="font-body text-label" style={{ color: 'var(--accent)', fontSize: '0.6rem' }}>
            Tap to reveal
          </span>
        </div>

        {/* Back — the answer */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            textAlign: 'center',
            backgroundColor: 'var(--parchment)',
            border: '1px solid rgba(var(--accent-rgb),0.4)',
            borderRadius: '2px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          }}
        >
          <p
            className="font-body"
            style={{
              color: 'var(--ink)',
              fontSize: 'clamp(0.9rem, 2vw, 1.02rem)',
              fontStyle: 'italic',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {answer}
          </p>
        </div>
      </motion.button>
    </div>
  );
}

export default function FunFacts() {
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
      <p className="font-body text-label" style={{ color: 'var(--accent)', marginBottom: '0.75rem' }}>
        A Few Things To Know
      </p>
      <p
        className="font-script"
        style={{ color: 'var(--text-light)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', margin: '0 0 3rem' }}
      >
        Get to know us
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 'clamp(1rem, 3vw, 1.5rem)',
          maxWidth: '920px',
          margin: '0 auto',
        }}
      >
        {wedding.funFacts.map((fact, i) => (
          <FlipCard key={i} {...fact} />
        ))}
      </div>
    </motion.section>
  );
}
