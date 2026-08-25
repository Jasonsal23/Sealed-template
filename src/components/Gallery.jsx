import { motion } from 'motion/react';
import wedding from '../data/wedding';

const alts = [
  'Eleanor and Julian together',
  'Couple portrait at golden hour',
  'Romantic wedding detail',
  'Eleanor and Julian embracing',
  'Wedding floral arrangement',
  'Couple laughing together',
];

// Editorial layout: 3 col grid with varied sizes
const gridStyles = [
  { gridColumn: 'span 2', gridRow: 'span 2', aspectRatio: '1.3 / 1' }, // large hero
  { gridColumn: 'span 1', gridRow: 'span 1', aspectRatio: '1 / 1' },
  { gridColumn: 'span 1', gridRow: 'span 1', aspectRatio: '1 / 1' },
  { gridColumn: 'span 1', gridRow: 'span 1', aspectRatio: '4 / 3' },
  { gridColumn: 'span 1', gridRow: 'span 1', aspectRatio: '4 / 3' },
  { gridColumn: 'span 1', gridRow: 'span 1', aspectRatio: '4 / 3' },
];

export default function Gallery() {
  return (
    <motion.section
      style={{
        backgroundColor: 'var(--parchment)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1rem, 4vw, 3rem)',
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <p className="font-body text-label" style={{ color: 'var(--gold)', textAlign: 'center', marginBottom: '2.5rem' }}>
        A Glimpse of Us
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(6px, 1.5vw, 14px)',
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
            whileHover={{ scale: 1.015 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                border: '1px solid rgba(182,146,78,0)',
                transition: 'border-color 0.3s',
                zIndex: 1,
                pointerEvents: 'none',
              }}
              className="gallery-frame"
            />
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
                filter: 'saturate(0.88) brightness(0.97)',
              }}
            />
          </motion.div>
        ))}
      </div>

      <style>{`
        .gallery-frame:hover, div:hover > .gallery-frame {
          border-color: rgba(182,146,78,0.55) !important;
        }
      `}</style>
    </motion.section>
  );
}
