import { motion } from 'motion/react';
import { SectionHead } from './Story';
import wedding from '../data/wedding';

function EventCard({ event, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      style={{
        backgroundColor: 'var(--white)',
        border: '1px solid rgba(160,120,64,0.14)',
        padding: 'clamp(1.5rem, 3vw, 2.25rem)',
        position: 'relative',
        boxShadow: '0 2px 24px rgba(42,26,16,0.05)',
      }}
    >
      {/* Emoji */}
      <div style={{ fontSize: '1.6rem', marginBottom: '1rem', lineHeight: 1 }}>{event.emoji}</div>

      {/* Event name */}
      <h3 className="font-display" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.65rem)', fontStyle: 'italic', fontWeight: 400, color: 'var(--mocha)', marginBottom: '0.25rem', lineHeight: 1.2 }}>
        {event.name}
      </h3>

      {/* Day and time */}
      <p className="text-label" style={{ color: 'var(--gold)', fontSize: '0.56rem', marginBottom: '1.1rem' }}>
        {event.day} &nbsp;·&nbsp; {event.time}
      </p>

      <div style={{ width: '28px', height: '1px', backgroundColor: 'var(--gold)', opacity: 0.3, marginBottom: '1.1rem' }} />

      {/* Location */}
      <p className="font-display" style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', color: 'var(--mocha)', fontWeight: 400, marginBottom: '0.2rem' }}>
        {event.location}
      </p>
      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.8rem', color: 'var(--mocha-mid)', opacity: 0.65, marginBottom: '1rem', fontWeight: 300 }}>
        {event.address}
      </p>

      {/* Dress code badge */}
      <span style={{
        display: 'inline-block',
        border: '1px solid rgba(160,120,64,0.35)',
        padding: '0.2rem 0.65rem',
        fontFamily: "'Jost', sans-serif",
        fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase',
        color: 'var(--gold)', marginBottom: '1rem',
      }}>
        {event.dress}
      </span>

      {/* Note */}
      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: 'var(--mocha-mid)', lineHeight: 1.7, fontWeight: 300, fontStyle: 'italic' }}>
        {event.note}
      </p>
    </motion.div>
  );
}

export default function Events() {
  return (
    <section id="events" style={{ backgroundColor: 'var(--champagne)' }}>
      <div className="section-pad container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }}>
          <SectionHead eyebrow="The Weekend" title="Wedding Events" />
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
          gap: 'clamp(1rem, 2.5vw, 1.5rem)',
        }}>
          {wedding.events.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
