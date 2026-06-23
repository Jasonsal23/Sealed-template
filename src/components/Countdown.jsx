import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import wedding from '../data/wedding';

function pad(n) {
  return String(n).padStart(2, '0');
}

function getTimeLeft() {
  const target = new Date(wedding.date).getTime();
  const diff = target - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const units = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
];

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.section
      style={{
        backgroundColor: 'var(--parchment)',
        padding: 'clamp(4rem, 8vw, 7rem) 1.5rem',
        textAlign: 'center',
        borderTop: '1px solid rgba(168,124,58,0.15)',
        borderBottom: '1px solid rgba(168,124,58,0.15)',
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <p className="font-body text-label" style={{ color: 'var(--gold)', marginBottom: '2.5rem', letterSpacing: '0.24em' }}>
        Until We Say I Do
      </p>

      {timeLeft === null ? (
        <p className="font-display" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontStyle: 'italic', color: 'var(--ink)' }}>
          Today's the day — just married!
        </p>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch',
            gap: 'clamp(1rem, 4vw, 3rem)',
            flexWrap: 'wrap',
          }}
        >
          {units.map((unit) => (
            <div
              key={unit.key}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.6rem',
                minWidth: 'clamp(64px, 15vw, 115px)',
              }}
            >
              <span
                className="font-display"
                style={{
                  fontSize: 'clamp(2.8rem, 9vw, 6rem)',
                  fontWeight: 300,
                  color: 'var(--ink)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  minWidth: '1.6ch',
                  display: 'inline-block',
                  textAlign: 'center',
                }}
                aria-label={`${timeLeft[unit.key]} ${unit.label}`}
              >
                {unit.key === 'days' ? String(timeLeft[unit.key]) : pad(timeLeft[unit.key])}
              </span>
              <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--gold)', opacity: 0.3 }} />
              <span className="font-body text-label" style={{ color: 'var(--gold)', fontSize: '0.58rem', letterSpacing: '0.24em' }}>
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.section>
  );
}
