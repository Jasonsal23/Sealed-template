import { motion } from 'motion/react';
import { SectionHead } from './Story';
import wedding from '../data/wedding';

export default function Registry() {
  return (
    <section id="registry" style={{ backgroundColor: 'var(--champagne)' }}>
      <div className="section-pad container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }}>
          <SectionHead eyebrow="Gifts" title="Registry" />
        </motion.div>

        {/* Gift note */}
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display"
          style={{
            fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
            fontStyle: 'italic', fontWeight: 400,
            color: 'var(--mocha-mid)',
            textAlign: 'center', maxWidth: '560px', margin: '0 auto clamp(2.5rem, 5vw, 4rem)',
            lineHeight: 1.75, opacity: 0.75,
          }}
        >
          {wedding.giftNote}
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
          gap: 'clamp(1rem, 2.5vw, 1.5rem)',
        }}>
          {wedding.registries.map((reg, i) => (
            <motion.div
              key={reg.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              style={{
                backgroundColor: reg.primary ? 'var(--mocha)' : 'var(--white)',
                border: reg.primary ? 'none' : '1px solid rgba(160,120,64,0.14)',
                padding: 'clamp(1.5rem, 3vw, 2.25rem)',
                display: 'flex', flexDirection: 'column',
                boxShadow: reg.primary ? '0 4px 32px rgba(42,26,16,0.15)' : '0 2px 16px rgba(42,26,16,0.04)',
              }}
            >
              {reg.primary && (
                <span className="text-label" style={{ color: 'var(--gold)', fontSize: '0.52rem', marginBottom: '1rem' }}>Primary Registry</span>
              )}
              <h3 className="font-display" style={{
                fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
                fontStyle: 'italic', fontWeight: 400,
                color: reg.primary ? 'var(--champagne)' : 'var(--mocha)',
                marginBottom: '0.25rem',
              }}>
                {reg.name}
              </h3>
              <p className="text-label" style={{ color: 'var(--gold)', fontSize: '0.54rem', marginBottom: '1rem' }}>
                {reg.tagline}
              </p>
              <div style={{ width: '24px', height: '1px', backgroundColor: 'var(--gold)', opacity: 0.3, marginBottom: '1rem' }} />
              <p style={{
                fontFamily: "'Jost', sans-serif", fontSize: '0.88rem',
                color: reg.primary ? 'rgba(242,232,213,0.7)' : 'var(--mocha-mid)',
                lineHeight: 1.7, fontWeight: 300, flex: 1, marginBottom: '1.5rem',
              }}>
                {reg.description}
              </p>
              <a
                href={reg.url}
                style={{
                  display: 'inline-block', alignSelf: 'flex-start',
                  padding: '0.7rem 1.5rem',
                  border: '1px solid var(--gold)',
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: reg.primary ? 'var(--gold-light)' : 'var(--gold)',
                  textDecoration: 'none', fontWeight: 500,
                  transition: 'background-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { e.target.style.backgroundColor = 'var(--gold)'; e.target.style.color = '#fff'; }}
                onMouseLeave={e => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = reg.primary ? 'var(--gold-light)' : 'var(--gold)'; }}
              >
                View Registry
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
