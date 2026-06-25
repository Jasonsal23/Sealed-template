import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import wedding from '../data/wedding';

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="11" cy="11" r="10" stroke="var(--rose)" strokeWidth="1.25" />
      <path d="M6.5 11.5L9.5 14.5L15.5 8" stroke="var(--rose)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function GuestSearch() {
  const [query, setQuery] = useState('');

  const trimmed = query.trim();
  const hasSearched = trimmed.length >= 2;
  const results = hasSearched
    ? wedding.guestList.filter(g =>
        g.name.toLowerCase().includes(trimmed.toLowerCase())
      )
    : [];

  return (
    <motion.section
      style={{
        backgroundColor: 'var(--espresso)',
        padding: 'clamp(4rem, 8vw, 7rem) 1.5rem',
        textAlign: 'center',
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <p className="font-body text-label" style={{ color: 'var(--rose)', marginBottom: '1rem', opacity: 0.75 }}>
        Guest List
      </p>

      <p
        className="font-display"
        style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          fontStyle: 'italic',
          color: 'var(--cream)',
          margin: '0 0 0.6rem',
          fontWeight: 400,
        }}
      >
        Are You on the List?
      </p>

      <p
        className="font-body"
        style={{
          color: 'rgba(250,248,245,0.45)',
          fontSize: 'clamp(0.85rem, 1.8vw, 1rem)',
          margin: '0 0 2.5rem',
          letterSpacing: '0.02em',
          fontFamily: "'Lato', sans-serif",
        }}
      >
        Type your name to confirm your spot
      </p>

      {/* Search input */}
      <div style={{ maxWidth: '400px', margin: '0 auto 2rem', position: 'relative' }}>
        <input
          type="text"
          placeholder="Your name…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label="Search guest list by name"
          style={{
            width: '100%',
            padding: '0.9rem 1.1rem',
            backgroundColor: 'rgba(250,248,245,0.06)',
            border: '1px solid rgba(196,133,122,0.35)',
            borderBottom: '1px solid rgba(196,133,122,0.55)',
            color: 'var(--cream)',
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            fontStyle: 'italic',
            outline: 'none',
            textAlign: 'center',
            letterSpacing: '0.01em',
            transition: 'border-color 0.25s, background-color 0.25s',
          }}
          onFocus={e => {
            e.target.style.backgroundColor = 'rgba(250,248,245,0.09)';
            e.target.style.borderColor = 'rgba(196,133,122,0.7)';
          }}
          onBlur={e => {
            e.target.style.backgroundColor = 'rgba(250,248,245,0.06)';
            e.target.style.borderColor = 'rgba(196,133,122,0.35)';
          }}
        />
      </div>

      {/* Results */}
      <div style={{ maxWidth: '480px', margin: '0 auto', minHeight: '80px' }}>
        <AnimatePresence mode="wait">
          {hasSearched && results.length > 0 && (
            <motion.div
              key="found"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
            >
              {results.map(guest => (
                <motion.div
                  key={guest.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.9rem',
                    padding: '1rem 1.25rem',
                    marginBottom: '0.6rem',
                    backgroundColor: 'rgba(196,133,122,0.1)',
                    border: '1px solid rgba(196,133,122,0.22)',
                    textAlign: 'left',
                  }}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CheckIcon />
                  <div>
                    <p
                      className="font-display"
                      style={{ color: 'var(--cream)', fontSize: '1.05rem', fontStyle: 'italic', margin: 0, lineHeight: 1.2 }}
                    >
                      {guest.name}
                    </p>
                    <p
                      className="font-body text-label"
                      style={{ color: 'var(--rose-light)', fontSize: '0.58rem', marginTop: '0.3rem', opacity: 0.8 }}
                    >
                      {guest.name === '🐌' ? `Party of ${guest.table}` : `Table ${guest.table}`}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {hasSearched && results.length === 0 && (
            <motion.div
              key="notfound"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              style={{ padding: '1.5rem' }}
            >
              <p
                className="font-display"
                style={{ color: 'rgba(250,248,245,0.55)', fontStyle: 'italic', fontSize: 'clamp(1rem, 2vw, 1.2rem)', margin: '0 0 0.4rem' }}
              >
                We don't see that name yet.
              </p>
              <p
                className="font-body"
                style={{ color: 'rgba(250,248,245,0.3)', fontSize: '0.85rem', fontFamily: "'Lato', sans-serif" }}
              >
                Please reach out to us directly — we'd love to have you.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
