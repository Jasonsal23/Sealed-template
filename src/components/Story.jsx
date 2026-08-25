import { motion } from 'motion/react';
import wedding from '../data/wedding';

function BotanicalSprig() {
  return (
    <svg width="60" height="40" viewBox="0 0 60 40" fill="none" aria-hidden="true" style={{ opacity: 0.35 }}>
      <path d="M30 38 Q30 20 30 8" stroke="var(--sage)" strokeWidth="1" />
      <path d="M30 28 Q22 22 16 18" stroke="var(--sage)" strokeWidth="0.8" />
      <path d="M30 28 Q38 22 44 18" stroke="var(--sage)" strokeWidth="0.8" />
      <path d="M30 20 Q24 15 20 10" stroke="var(--sage)" strokeWidth="0.7" />
      <path d="M30 20 Q36 15 40 10" stroke="var(--sage)" strokeWidth="0.7" />
      <ellipse cx="14" cy="16" rx="5" ry="3" fill="var(--sage)" opacity="0.5" transform="rotate(-25 14 16)" />
      <ellipse cx="46" cy="16" rx="5" ry="3" fill="var(--sage)" opacity="0.5" transform="rotate(25 46 16)" />
      <ellipse cx="18" cy="8" rx="4" ry="2.5" fill="var(--sage)" opacity="0.4" transform="rotate(-20 18 8)" />
      <ellipse cx="42" cy="8" rx="4" ry="2.5" fill="var(--sage)" opacity="0.4" transform="rotate(20 42 8)" />
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
        <BotanicalSprig />

        <p
          className="font-script"
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            color: 'var(--ink)',
            margin: '1rem 0 1.5rem',
          }}
        >
          Our Story
        </p>

        <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--gold)', margin: '0 auto 2rem', opacity: 0.5 }} />

        <p
          className="font-body"
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            lineHeight: 1.9,
            color: 'var(--ink)',
            fontStyle: 'italic',
            maxWidth: '58ch',
            margin: '0 auto',
          }}
        >
          {wedding.story}
        </p>

        <div style={{ marginTop: '2rem', transform: 'rotate(180deg)' }}>
          <BotanicalSprig />
        </div>
      </div>
    </motion.section>
  );
}
