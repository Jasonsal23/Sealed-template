import { motion } from 'motion/react';
import { SectionHead } from './Story';
import wedding from '../data/wedding';

const TAG_COLORS = {
  Wine: '#a07840',
  Explore: '#5c3d28',
  Beach: '#7a9278',
  Culture: '#c89880',
  Food: '#a07840',
  Nature: '#7a9278',
};

export default function ThingsToDo() {
  return (
    <section id="activities" style={{ backgroundColor: 'var(--ivory)' }}>
      <div className="section-pad container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }}>
          <SectionHead eyebrow="Paso Robles" title="Things to Do" />
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
          gap: 'clamp(1rem, 2.5vw, 1.5rem)',
        }}>
          {wedding.activities.map((act, i) => (
            <motion.div
              key={act.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
              style={{
                backgroundColor: 'var(--white)',
                border: '1px solid rgba(160,120,64,0.12)',
                padding: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                boxShadow: '0 2px 16px rgba(42,26,16,0.04)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
                <h3 className="font-display" style={{ fontSize: 'clamp(1.05rem, 2.2vw, 1.3rem)', fontStyle: 'italic', fontWeight: 400, color: 'var(--mocha)', lineHeight: 1.2 }}>
                  {act.name}
                </h3>
                <span style={{
                  flexShrink: 0, marginLeft: '0.75rem',
                  backgroundColor: TAG_COLORS[act.tag] || 'var(--gold)',
                  color: '#fff', opacity: 0.85,
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase',
                  padding: '0.18rem 0.5rem', fontWeight: 600,
                }}>
                  {act.tag}
                </span>
              </div>
              <div style={{ width: '24px', height: '1px', backgroundColor: 'var(--gold)', opacity: 0.3, marginBottom: '0.85rem' }} />
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: 'var(--mocha-mid)', lineHeight: 1.72, fontWeight: 300 }}>
                {act.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
