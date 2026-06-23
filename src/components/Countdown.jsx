import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import wedding from '../data/wedding';

function pad(n) {
  return String(n).padStart(2, '0');
}

function getTimeLeft() {
  const target = new Date(wedding.date).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
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
        backgroundColor: 'var(--cream)',
        padding: 'clamp(4rem, 8vw, 7rem) 1.5rem',
        textAlign: 'center',
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Section label */}
      <p className="font-body text-label" style={{ color: 'var(--gold)', marginBottom: '2.5rem' }}>
        Counting Down
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
            gap: 'clamp(0.5rem, 3vw, 2rem)',
            flexWrap: 'wrap',
          }}
        >
          {units.map((unit, i) => (
            <div
              key={unit.key}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                minWidth: 'clamp(60px, 15vw, 110px)',
              }}
            >
              {i > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    width: '1px',
                    height: '60px',
                    backgroundColor: 'var(--gold)',
                    opacity: 0.3,
                    alignSelf: 'flex-start',
                    marginLeft: '-1.5rem',
                    marginTop: '0.5rem',
                  }}
                  aria-hidden="true"
                />
              )}
              <span
                className="font-display"
                style={{
                  fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
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
              <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--gold)', opacity: 0.35 }} />
              <span
                className="font-body text-label"
                style={{ color: 'var(--gold)', fontSize: '0.6rem', letterSpacing: '0.22em' }}
              >
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.section>
  );
}
