import { motion } from 'motion/react';
import wedding from '../data/wedding';

export default function Gallery() {
  return (
    <motion.section
      style={{
        backgroundColor: 'var(--ink)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)',
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <p className="font-body text-label" style={{ color: 'var(--sage)', textAlign: 'center', marginBottom: '2rem', opacity: 0.75 }}>
        A Glimpse of Us
      </p>

      <div
        style={{
          maxWidth: '860px',
          margin: '0 auto',
          position: 'relative',
          /* thin gold frame */
          padding: '8px',
          border: '1px solid rgba(168,124,58,0.3)',
        }}
      >
        <img
          src={wedding.gallery[0]}
          alt={`${wedding.partnerA} and ${wedding.partnerB}`}
          style={{
            width: '100%',
            display: 'block',
            filter: 'saturate(0.85) brightness(0.95)',
            maxHeight: '70vh',
            objectFit: 'cover',
          }}
        />
      </div>
    </motion.section>
  );
}
