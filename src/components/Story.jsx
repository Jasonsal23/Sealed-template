import { motion } from 'motion/react';
import wedding from '../data/wedding';

function SectionHead({ eyebrow, title }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
      <p className="text-label" style={{ color: 'var(--gold)', marginBottom: '0.75rem' }}>{eyebrow}</p>
      <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 400, fontStyle: 'italic', color: 'var(--mocha)', lineHeight: 1.1 }}>
        {title}
      </h2>
      <div style={{ width: '36px', height: '1px', backgroundColor: 'var(--gold)', opacity: 0.4, margin: '1rem auto 0' }} />
    </div>
  );
}

export { SectionHead };

export default function Story() {
  return (
    <section id="story" style={{ backgroundColor: 'var(--ivory)' }}>
      <div className="section-pad container">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }}>
          <SectionHead eyebrow="How It Began" title="Our Story" />
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative', maxWidth: '760px', margin: '0 auto' }}>
          {/* Center spine — hidden on mobile */}
          <div aria-hidden="true" style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0,
            width: '1px', backgroundColor: 'var(--gold)', opacity: 0.18,
            transform: 'translateX(-50%)',
          }} className="timeline-spine" />

          {wedding.timeline.map((item, i) => {
            const isRight = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, delay: 0.05 * i }}
                style={{
                  display: 'flex',
                  justifyContent: isRight ? 'flex-start' : 'flex-end',
                  position: 'relative',
                  marginBottom: 'clamp(2rem, 5vw, 3.5rem)',
                  paddingLeft: '2rem',
                  paddingRight: '2rem',
                }}
              >
                {/* Dot on spine */}
                <div aria-hidden="true" style={{
                  position: 'absolute', left: '50%', top: '1.2rem',
                  width: '9px', height: '9px',
                  border: '1px solid var(--gold)', borderRadius: '50%',
                  backgroundColor: 'var(--ivory)',
                  transform: 'translateX(-50%)',
                  zIndex: 1,
                }} />

                <div style={{ width: '46%', minWidth: '260px' }}>
                  <div style={{
                    backgroundColor: 'var(--white)',
                    border: '1px solid rgba(160,120,64,0.12)',
                    padding: 'clamp(1.25rem, 3vw, 2rem)',
                    boxShadow: '0 2px 20px rgba(42,26,16,0.05)',
                  }}>
                    <p className="text-label" style={{ color: 'var(--gold)', fontSize: '0.56rem', marginBottom: '0.5rem' }}>{item.year}</p>
                    <h3 className="font-display" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontStyle: 'italic', fontWeight: 400, color: 'var(--mocha)', marginBottom: '0.6rem' }}>
                      {item.title}
                    </h3>
                    <p className="font-body" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1rem)', lineHeight: 1.75, color: 'var(--mocha-mid)', fontWeight: 300 }}>
                      {item.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Photo strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          style={{ marginTop: 'clamp(2rem, 5vw, 4rem)' }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.5rem',
          }}>
            {wedding.photos.slice(0, 6).map((src, i) => (
              <div key={i} style={{ overflow: 'hidden', aspectRatio: i === 1 || i === 4 ? '3/4' : '1', position: 'relative' }}>
                <img
                  src={src}
                  alt={`Isabelle and Marcus ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', filter: 'saturate(0.9)' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .timeline-spine { display: none; }
        }
      `}</style>
    </section>
  );
}
