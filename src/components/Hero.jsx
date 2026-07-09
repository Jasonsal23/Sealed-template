import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import wedding from '../data/wedding';

function pad(n) { return String(n).padStart(2, '0'); }

function getTimeLeft() {
  const diff = new Date(wedding.date).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Countdown() {
  const [t, setT] = useState(getTimeLeft);
  useEffect(() => {
    const id = setInterval(() => setT(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!t) return (
    <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.85rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>
      Today is the day
    </p>
  );

  const units = [
    { label: 'Days', value: String(t.days) },
    { label: 'Hrs', value: pad(t.hours) },
    { label: 'Min', value: pad(t.minutes) },
    { label: 'Sec', value: pad(t.seconds) },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1rem, 4vw, 2.5rem)' }}>
      {units.map((u, i) => (
        <div key={u.label} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1rem, 4vw, 2.5rem)' }}>
          <div style={{ textAlign: 'center' }}>
            <div
              className="font-display"
              style={{ fontSize: 'clamp(1.6rem, 5vw, 2.8rem)', fontWeight: 300, color: '#fff', lineHeight: 1, letterSpacing: '-0.01em' }}
              aria-label={`${u.value} ${u.label}`}
            >
              {u.value}
            </div>
            <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginTop: '0.3rem' }}>
              {u.label}
            </div>
          </div>
          {i < 3 && <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '1.1rem', fontWeight: 300 }}>·</div>}
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${wedding.heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}
      />
      {/* Gradient overlays */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(20,12,6,0.62) 0%, rgba(20,12,6,0.35) 50%, rgba(20,12,6,0.78) 100%)' }} />
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at center 35%, transparent 40%, rgba(20,12,6,0.3) 100%)' }} />

      {/* Main content — vertically centered */}
      <div
        style={{
          position: 'relative', zIndex: 1,
          flex: 1,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center',
          padding: 'clamp(5rem, 10vh, 8rem) 1.5rem clamp(2rem, 4vh, 4rem)',
        }}
      >
        <motion.p
          className="text-label"
          style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '1.5rem' }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          We're getting married
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: 'easeOut' }}
        >
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(3.5rem, 12vw, 8.5rem)',
              fontWeight: 300,
              color: '#ffffff',
              lineHeight: 0.95,
              letterSpacing: '-0.015em',
              textShadow: '0 2px 40px rgba(0,0,0,0.35)',
            }}
          >
            {wedding.partnerA}
            <span style={{ display: 'block', fontSize: '0.5em', fontStyle: 'italic', color: 'rgba(196,160,96,0.9)', lineHeight: 1.4 }}>
              &amp;
            </span>
            {wedding.partnerB}
          </h1>
        </motion.div>

        <motion.div
          style={{ marginTop: 'clamp(1.5rem, 3vh, 2.5rem)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.7 }}
        >
          <div style={{ width: '48px', height: '1px', backgroundColor: 'rgba(196,160,96,0.5)' }} />
          <p className="font-display" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', color: 'rgba(255,255,255,0.82)', fontStyle: 'italic', letterSpacing: '0.02em' }}>
            {wedding.dateDisplay}
          </p>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
            {wedding.venue.name} · {wedding.venue.city}
          </p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          aria-hidden="true"
          style={{ marginTop: 'clamp(2.5rem, 5vh, 4rem)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
          initial={{ opacity: 0 }} animate={{ opacity: 0.4 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <div style={{ width: '1px', height: '28px', backgroundColor: '#fff' }} />
          <div style={{ width: '5px', height: '5px', borderRight: '1px solid #fff', borderBottom: '1px solid #fff', transform: 'rotate(45deg)' }} />
        </motion.div>
      </div>

      {/* Countdown strip pinned to bottom of hero */}
      <motion.div
        style={{
          position: 'relative', zIndex: 1,
          backgroundColor: 'rgba(20,12,6,0.55)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(196,160,96,0.15)',
          padding: 'clamp(1rem, 2.5vh, 1.5rem) clamp(1.25rem, 5vw, 3rem)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(196,160,96,0.65)', marginBottom: '0.4rem' }}>
          Until we say I do
        </p>
        <Countdown />
      </motion.div>
    </section>
  );
}
