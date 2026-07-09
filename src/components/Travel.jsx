import { motion } from 'motion/react';
import { SectionHead } from './Story';
import wedding from '../data/wedding';

function HotelCard({ hotel, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      style={{
        backgroundColor: hotel.recommended ? 'var(--mocha)' : 'var(--white)',
        border: hotel.recommended ? 'none' : '1px solid rgba(160,120,64,0.14)',
        padding: 'clamp(1.5rem, 3vw, 2rem)',
        position: 'relative',
        boxShadow: hotel.recommended ? '0 4px 32px rgba(42,26,16,0.18)' : '0 2px 16px rgba(42,26,16,0.04)',
      }}
    >
      {hotel.recommended && (
        <div style={{
          position: 'absolute', top: '1rem', right: '1rem',
          backgroundColor: 'var(--gold)',
          color: '#fff',
          fontFamily: "'Jost', sans-serif",
          fontSize: '0.52rem', letterSpacing: '0.18em', textTransform: 'uppercase',
          padding: '0.2rem 0.55rem', fontWeight: 600,
        }}>
          Room Block
        </div>
      )}

      {/* Stars */}
      <div style={{ marginBottom: '0.8rem' }}>
        {Array.from({ length: hotel.stars }).map((_, i) => (
          <span key={i} style={{ color: 'var(--gold)', fontSize: '0.75rem' }}>★</span>
        ))}
      </div>

      <h3 className="font-display" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)', fontStyle: 'italic', fontWeight: 400, color: hotel.recommended ? 'var(--champagne)' : 'var(--mocha)', marginBottom: '0.3rem' }}>
        {hotel.name}
      </h3>

      <p className="text-label" style={{ color: 'var(--gold)', fontSize: '0.54rem', marginBottom: '1rem' }}>
        {hotel.rate} &nbsp;·&nbsp; {hotel.distance}
      </p>

      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: hotel.recommended ? 'rgba(242,232,213,0.75)' : 'var(--mocha-mid)', lineHeight: 1.7, fontWeight: 300, marginBottom: '1.25rem' }}>
        {hotel.note}
      </p>

      {hotel.blockCode && (
        <div style={{
          backgroundColor: 'rgba(196,160,96,0.12)',
          border: '1px solid rgba(196,160,96,0.3)',
          padding: '0.65rem 0.9rem',
          marginBottom: '1rem',
        }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-light)', fontWeight: 500 }}>
            Code: <strong style={{ letterSpacing: '0.2em' }}>{hotel.blockCode}</strong>
          </p>
          {hotel.deadline && (
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', color: 'rgba(242,232,213,0.5)', marginTop: '0.2rem', fontWeight: 300 }}>
              Block expires {hotel.deadline}
            </p>
          )}
        </div>
      )}

      <a
        href={hotel.url}
        style={{
          display: 'inline-block',
          padding: '0.65rem 1.4rem',
          border: `1px solid ${hotel.recommended ? 'var(--gold)' : 'var(--gold)'}`,
          fontFamily: "'Jost', sans-serif",
          fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase',
          color: hotel.recommended ? 'var(--gold-light)' : 'var(--gold)',
          textDecoration: 'none', fontWeight: 500,
          transition: 'background-color 0.2s, color 0.2s',
        }}
        onMouseEnter={e => { e.target.style.backgroundColor = 'var(--gold)'; e.target.style.color = '#fff'; }}
        onMouseLeave={e => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = hotel.recommended ? 'var(--gold-light)' : 'var(--gold)'; }}
      >
        Book Now
      </a>
    </motion.div>
  );
}

export default function Travel() {
  return (
    <section id="travel" style={{ backgroundColor: 'var(--ivory)' }}>
      <div className="section-pad container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }}>
          <SectionHead eyebrow="Getting Here" title="Travel & Accommodations" />
        </motion.div>

        {/* Hotels */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
          gap: 'clamp(1rem, 2.5vw, 1.5rem)',
          marginBottom: 'clamp(3rem, 6vw, 5rem)',
        }}>
          {wedding.hotels.map((hotel, i) => (
            <HotelCard key={hotel.name} hotel={hotel} index={i} />
          ))}
        </div>

        {/* Shuttle callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          style={{
            backgroundColor: 'var(--champagne)',
            border: '1px solid rgba(160,120,64,0.18)',
            padding: 'clamp(1.25rem, 3vw, 2rem)',
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
            display: 'flex', alignItems: 'flex-start', gap: '1rem',
          }}
        >
          <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>🚌</span>
          <div>
            <p className="text-label" style={{ color: 'var(--gold)', fontSize: '0.55rem', marginBottom: '0.4rem' }}>Complimentary Shuttle</p>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.92rem', color: 'var(--mocha-mid)', lineHeight: 1.7, fontWeight: 300 }}>
              {wedding.shuttle}
            </p>
          </div>
        </motion.div>

        {/* Airports */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-display" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.75rem)', fontStyle: 'italic', fontWeight: 400, color: 'var(--mocha)', marginBottom: '1.5rem', textAlign: 'center' }}>
            Nearest Airports
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
            gap: '1rem',
          }}>
            {wedding.airports.map((apt, i) => (
              <div key={apt.code} style={{
                padding: 'clamp(1rem, 2.5vw, 1.5rem)',
                border: '1px solid rgba(160,120,64,0.14)',
                backgroundColor: 'var(--white)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <span className="font-display" style={{ fontSize: '1.5rem', fontWeight: 400, color: 'var(--mocha)', letterSpacing: '0.04em' }}>{apt.code}</span>
                  <span className="text-label" style={{ color: 'var(--gold)', fontSize: '0.52rem' }}>{apt.drive}</span>
                </div>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.8rem', color: 'var(--mocha)', fontWeight: 500, marginBottom: '0.4rem' }}>{apt.name}</p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.8rem', color: 'var(--mocha-mid)', lineHeight: 1.6, fontWeight: 300 }}>{apt.note}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
