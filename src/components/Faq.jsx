import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHead } from './Story';
import wedding from '../data/wedding';

function FaqItem({ item, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      style={{ borderBottom: '1px solid rgba(160,120,64,0.15)' }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: 'clamp(1rem, 2.5vw, 1.4rem) 0',
          background: 'none', border: 'none', cursor: 'pointer',
          textAlign: 'left', gap: '1rem',
        }}
        aria-expanded={open}
      >
        <span className="font-display" style={{
          fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
          fontStyle: 'italic', fontWeight: 400,
          color: 'var(--mocha)', lineHeight: 1.35,
        }}>
          {item.q}
        </span>
        <span style={{
          flexShrink: 0,
          width: '22px', height: '22px',
          border: '1px solid var(--gold)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--gold)',
          fontSize: '0.9rem', fontWeight: 300,
          transition: 'transform 0.25s',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
        }}>
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              fontFamily: "'Jost', sans-serif", fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)',
              color: 'var(--mocha-mid)', lineHeight: 1.8, fontWeight: 300,
              paddingBottom: 'clamp(1rem, 2.5vw, 1.4rem)',
              maxWidth: '640px',
            }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Faq() {
  return (
    <section id="faq" style={{ backgroundColor: 'var(--ivory)' }}>
      <div className="section-pad container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }}>
          <SectionHead eyebrow="Questions" title="FAQ" />
        </motion.div>

        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          {/* First item border-top */}
          <div style={{ borderTop: '1px solid rgba(160,120,64,0.15)' }}>
            {wedding.faqs.map((item, i) => (
              <FaqItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
