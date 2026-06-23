import { motion } from 'motion/react';
import wedding from '../data/wedding';

function BotanicalSprig({ flip = false }) {
  return (
    <svg
      width="80"
      height="50"
      viewBox="0 0 80 50"
      fill="none"
      aria-hidden="true"
      style={{ opacity: 0.38, transform: flip ? 'rotate(180deg) scaleX(-1)' : undefined }}
    >
      {/* Main stem */}
      <path d="M40 48 Q40 28 40 8" stroke="var(--sage)" strokeWidth="1.2" />
      {/* Left branches */}
      <path d="M40 36 Q30 28 20 24" stroke="var(--sage)" strokeWidth="0.9" />
      <path d="M40 26 Q31 19 24 14" stroke="var(--sage)" strokeWidth="0.8" />
      <path d="M40 18 Q33 12 28 7" stroke="var(--sage)" strokeWidth="0.7" />
      {/* Right branches */}
      <path d="M40 36 Q50 28 60 24" stroke="var(--sage)" strokeWidth="0.9" />
      <path d="M40 26 Q49 19 56 14" stroke="var(--sage)" strokeWidth="0.8" />
      <path d="M40 18 Q47 12 52 7" stroke="var(--sage)" strokeWidth="0.7" />
      {/* Leaves */}
      <ellipse cx="18" cy="23" rx="6" ry="3.5" fill="var(--sage)" opacity="0.5" transform="rotate(-30 18 23)" />
      <ellipse cx="62" cy="23" rx="6" ry="3.5" fill="var(--sage)" opacity="0.5" transform="rotate(30 62 23)" />
      <ellipse cx="22" cy="13" rx="5" ry="3" fill="var(--sage)" opacity="0.4" transform="rotate(-25 22 13)" />
      <ellipse cx="58" cy="13" rx="5" ry="3" fill="var(--sage)" opacity="0.4" transform="rotate(25 58 13)" />
      <ellipse cx="27" cy="6" rx="4" ry="2.5" fill="var(--sage)" opacity="0.35" transform="rotate(-20 27 6)" />
      <ellipse cx="53" cy="6" rx="4" ry="2.5" fill="var(--sage)" opacity="0.35" transform="rotate(20 53 6)" />
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
      <div style={{ maxWidth: '620px', margin: '0 auto' }}>
        <BotanicalSprig />

        <p
          className="font-script"
          style={{
            fontSize: 'clamp(1.9rem, 4.5vw, 3rem)',
            color: 'var(--ink)',
            margin: '1.2rem 0 0.4rem',
            lineHeight: 1.1,
          }}
        >
          How it Started
        </p>

        <div style={{ width: '35px', height: '1px', backgroundColor: 'var(--gold)', margin: '0.5rem auto 2rem', opacity: 0.45 }} />

        <p
          className="font-body"
          style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            lineHeight: 1.85,
            color: 'var(--ink)',
            fontStyle: 'italic',
            maxWidth: '56ch',
            margin: '0 auto',
            opacity: 0.85,
          }}
        >
          {wedding.story}
        </p>

        <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}>
          <BotanicalSprig flip />
        </div>
      </div>
    </motion.section>
  );
}
