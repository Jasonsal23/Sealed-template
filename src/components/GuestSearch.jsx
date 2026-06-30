import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import wedding from '../data/wedding';

function StarCheck() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="11" cy="11" r="10" stroke="var(--starlight)" strokeWidth="1.2" opacity="0.7" />
      <path d="M6.5 11.5L9.5 14.5L15.5 8" stroke="var(--starlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function GuestSearch() {
  const [query, setQuery] = useState('');

  const trimmed = query.trim();
  const hasSearched = trimmed.length >= 2;
  const results = hasSearched
    ? wedding.guestList.filter(g => g.name.toLowerCase().includes(trimmed.toLowerCase()))
    : [];

  return (
    <motion.section
      style={{
        backgroundColor: 'var(--midnight)',
        padding: 'clamp(4rem, 8vw, 7rem) 1.5rem',
        textAlign: 'center',
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <p className="font-display text-label" style={{ color: 'var(--starlight)', marginBottom: '1rem', opacity: 0.65 }}>
        Guest List
      </p>

      <p className="font-display" style={{
        fontSize: 'clamp(1.5rem, 4vw, 2.4rem)',
        color: 'var(--cream)',
        margin: '0 0 0.6rem',
        fontWeight: 400,
        letterSpacing: '0.05em',
      }}>
        Are You on the List?
      </p>

      <p className="font-body" style={{
        color: 'rgba(254,250,242,0.38)',
        fontSize: '0.88rem',
        margin: '0 0 2.5rem',
        fontFamily: "'Raleway', sans-serif",
        fontWeight: 300,
      }}>
        Type your name to confirm your spot
      </p>

      {/* Input */}
      <div style={{ maxWidth: '380px', margin: '0 auto 2rem' }}>
        <input
          type="text"
          placeholder="Your name…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label="Search guest list by name"
          style={{
            width: '100%',
            padding: '0.85rem 1rem',
            backgroundColor: 'rgba(254,250,242,0.05)',
            border: '1px solid rgba(240,204,96,0.2)',
            borderBottom: '1px solid rgba(240,204,96,0.4)',
            color: 'var(--cream)',
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
            letterSpacing: '0.05em',
            outline: 'none',
            textAlign: 'center',
            transition: 'border-color 0.25s, background-color 0.25s',
          }}
          onFocus={e => {
            e.target.style.backgroundColor = 'rgba(254,250,242,0.08)';
            e.target.style.borderBottomColor = 'rgba(240,204,96,0.65)';
          }}
          onBlur={e => {
            e.target.style.backgroundColor = 'rgba(254,250,242,0.05)';
            e.target.style.borderBottomColor = 'rgba(240,204,96,0.4)';
          }}
        />
      </div>

      {/* Results */}
      <div style={{ maxWidth: '460px', margin: '0 auto', minHeight: '80px' }}>
        <AnimatePresence mode="wait">
          {hasSearched && results.length > 0 && (
            <motion.div key="found"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
            >
              {results.map(guest => (
                <motion.div key={guest.name}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.9rem',
                    padding: '0.9rem 1.2rem', marginBottom: '0.5rem',
                    backgroundColor: 'rgba(240,204,96,0.07)',
                    border: '1px solid rgba(240,204,96,0.18)',
                    textAlign: 'left',
                  }}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <StarCheck />
                  <div>
                    <p className="font-display" style={{ color: 'var(--cream)', fontSize: '1.02rem', letterSpacing: '0.04em', margin: 0, lineHeight: 1.2 }}>
                      {guest.name}
                    </p>
                    <p className="font-display text-label" style={{ color: 'var(--starlight)', fontSize: '0.52rem', marginTop: '0.3rem', opacity: 0.65 }}>
                      {guest.name === '🐌' ? `Party of ${guest.table}` : `Table ${guest.table}`}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {hasSearched && results.length === 0 && (
            <motion.div key="notfound"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
              style={{ padding: '1.5rem' }}
            >
              <p className="font-display" style={{ color: 'rgba(254,250,242,0.45)', fontSize: 'clamp(1rem, 2vw, 1.15rem)', letterSpacing: '0.04em', margin: '0 0 0.4rem' }}>
                We don't see that name yet.
              </p>
              <p className="font-body" style={{ color: 'rgba(254,250,242,0.25)', fontSize: '0.85rem', fontFamily: "'Raleway', sans-serif", fontWeight: 300 }}>
                Please reach out to us — we'd love to have you there.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
