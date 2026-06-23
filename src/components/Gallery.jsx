import { motion } from 'motion/react';
import wedding from '../data/wedding';

const alts = [
  'Outdoor ceremony venue',
  'Celeste and Rowan portrait',
  'Wedding floral details',
  'Garden ceremony arch',
  'Couple at sunset',
  'Romantic outdoor setting',
];

// Asymmetric editorial grid — different weights from v1
const gridStyles = [
  { gridColumn: 'span 1', gridRow: 'span 2' }, // tall portrait
  { gridColumn: 'span 2', gridRow: 'span 1' }, // wide landscape
  { gridColumn: 'span 1', gridRow: 'span 1' }, // square
  { gridColumn: 'span 1', gridRow: 'span 1' }, // square
  { gridColumn: 'span 1', gridRow: 'span 1' }, // square
  { gridColumn: 'span 2', gridRow: 'span 1' }, // wide landscape
];

export default function Gallery() {
  return (
    <motion.section
      style={{
        backgroundColor: 'var(--ink)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1rem, 4vw, 3rem)',
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <p className="font-body text-label" style={{ color: 'var(--sage)', textAlign: 'center', marginBottom: '2.5rem', opacity: 0.75 }}>
        A Glimpse of Us
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(2, 260px)',
          gap: 'clamp(6px, 1.2vw, 12px)',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        {wedding.gallery.map((src, i) => (
          <motion.div
            key={src}
            style={{
              ...gridStyles[i],
              overflow: 'hidden',
              position: 'relative',
            }}
            whileHover={{ scale: 1.012 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <img
              src={src}
              alt={alts[i]}
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                filter: 'saturate(0.82) brightness(0.94)',
                transition: 'filter 0.4s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.filter = 'saturate(0.95) brightness(1)'; }}
              onMouseLeave={e => { e.currentTarget.style.filter = 'saturate(0.82) brightness(0.94)'; }}
            />
            {/* Subtle gold frame on hover — CSS overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              border: '1px solid rgba(168,124,58,0)',
              transition: 'border-color 0.35s',
              pointerEvents: 'none',
            }} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
