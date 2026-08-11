import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import wedding from '../data/wedding';

// Same star field as the opening scene for visual continuity
function lcg(seed) {
  let s = seed >>> 0;
  return () => { s = (Math.imul(1664525, s) + 1013904223) >>> 0; return s / 0x100000000; };
}
const _r = lcg(31415);
const BG_STARS = Array.from({ length: 140 }, () => ({
  cx: `${_r() * 100}%`,
  cy: `${_r() * 100}%`,
  r: 0.3 + _r() * 1.2,
  opacity: 0.04 + _r() * 0.13,
}));

const STORAGE_KEY = 'wil_submitted_v6';

// ── Utilities ────────────────────────────────────────────────────────────────
function calcTime(dateStr) {
  const diff = new Date(dateStr) - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, past: true };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    past: false,
  };
}

function useCountdown(dateStr) {
  const [time, setTime] = useState(() => calcTime(dateStr));
  useEffect(() => {
    const id = setInterval(() => setTime(calcTime(dateStr)), 1000);
    return () => clearInterval(id);
  }, [dateStr]);
  return time;
}

// ── Shared components ────────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
}

function GoldRule() {
  return (
    <div style={{ width: 36, height: 1, backgroundColor: 'var(--gold)', opacity: 0.3, margin: '0 auto' }} />
  );
}

function SectionLabel({ children }) {
  return (
    <p style={{
      fontFamily: "'Jost', sans-serif",
      fontSize: '0.55rem',
      letterSpacing: '0.32em',
      textTransform: 'uppercase',
      fontWeight: 500,
      color: 'var(--gold)',
      opacity: 0.7,
      marginBottom: '0.75rem',
    }}>
      {children}
    </p>
  );
}

function Monogram({ size = 68 }) {
  return (
    <svg viewBox="0 0 80 80" width={size} height={size} aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
      <circle cx="40" cy="40" r="36" fill="none" stroke="var(--gold)" strokeWidth="0.8" opacity="0.4" />
      <circle cx="40" cy="40" r="30" fill="none" stroke="var(--gold)" strokeWidth="0.25" opacity="0.2" />
      <text
        x="40" y="47"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="16"
        fontWeight="400"
        fontStyle="italic"
        fill="var(--gold)"
        opacity="0.8"
      >
        {wedding.partnerA[0]} &amp; {wedding.partnerB[0]}
      </text>
    </svg>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
        overflow: 'hidden',
        backgroundColor: 'var(--night)',
      }}
    >
      {/* Stars */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true">
        {BG_STARS.map((s, i) => (
          <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="white" opacity={s.opacity} />
        ))}
      </svg>

      {/* Center glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(200,168,76,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            color: 'var(--gold)',
            opacity: 0.75,
            marginBottom: 'clamp(0.75rem, 2vw, 1.25rem)',
            lineHeight: 1,
          }}
        >
          Save the Date
        </motion.p>

        <motion.h1
          ref={headingRef}
          tabIndex={-1}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(3.2rem, 11vw, 8rem)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: 'var(--ink)',
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
            marginBottom: 'clamp(1.25rem, 3vw, 2rem)',
            outline: 'none',
          }}
        >
          {wedding.partnerA}<br />
          <span style={{ fontSize: '0.45em', fontStyle: 'normal', color: 'var(--gold)', opacity: 0.6, letterSpacing: '0.12em' }}>
            &amp;
          </span>
          <br />
          {wedding.partnerB}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          style={{ marginBottom: 'clamp(0.5rem, 1.5vw, 0.75rem)' }}
        >
          <GoldRule />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.1 }}
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 'clamp(0.62rem, 1.8vw, 0.85rem)',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            fontWeight: 400,
            marginTop: 'clamp(0.5rem, 1.5vw, 0.75rem)',
            marginBottom: '0.4rem',
          }}
        >
          {wedding.dateDisplay}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.25 }}
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 'clamp(0.55rem, 1.4vw, 0.7rem)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--ink-muted)',
            fontWeight: 300,
          }}
        >
          {wedding.venueName}  ·  {wedding.venueCity}
        </motion.p>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.8 }}
        style={{ position: 'absolute', bottom: 'clamp(1.5rem, 4vw, 2.5rem)', left: '50%', transform: 'translateX(-50%)' }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: 'var(--gold)', opacity: 0.3, fontSize: '1.1rem' }}
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── Countdown ────────────────────────────────────────────────────────────────
function Countdown() {
  const time = useCountdown(wedding.date);

  const units = time.past
    ? null
    : [
        { label: 'Days', value: time.days },
        { label: 'Hours', value: time.hours },
        { label: 'Minutes', value: time.minutes },
        { label: 'Seconds', value: time.seconds },
      ];

  return (
    <section style={{ backgroundColor: 'var(--deep)', padding: 'clamp(3.5rem, 7vw, 6rem) clamp(1.5rem, 5vw, 3rem)' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
        <Reveal>
          <SectionLabel>Until we say I do</SectionLabel>
        </Reveal>

        {time.past ? (
          <Reveal delay={0.1}>
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontStyle: 'italic',
              color: 'var(--ink)',
              fontWeight: 300,
            }}>
              Today's the day.
            </p>
          </Reveal>
        ) : (
          <Reveal delay={0.1}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 'clamp(0.75rem, 2.5vw, 1.5rem)',
              flexWrap: 'wrap',
            }}>
              {units.map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    textAlign: 'center',
                    minWidth: 'clamp(64px, 18vw, 100px)',
                    padding: 'clamp(1rem, 2.5vw, 1.5rem) clamp(0.75rem, 2vw, 1.25rem)',
                    border: '1px solid var(--border)',
                    backgroundColor: 'rgba(200,168,76,0.04)',
                  }}
                >
                  <p style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 'clamp(2.2rem, 7vw, 4.5rem)',
                    fontWeight: 300,
                    color: 'var(--ink)',
                    lineHeight: 1,
                    marginBottom: '0.5rem',
                    fontVariantNumeric: 'tabular-nums',
                  }}>
                    {String(value).padStart(2, '0')}
                  </p>
                  <p style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '0.5rem',
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    opacity: 0.6,
                    fontWeight: 500,
                  }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

// ── Details ──────────────────────────────────────────────────────────────────
function Details() {
  const cols = [
    {
      label: 'When',
      lines: [wedding.dateDisplay, '5:00 in the Evening'],
    },
    {
      label: 'Where',
      lines: [wedding.venueName, wedding.venueCity],
    },
    {
      label: 'Dress',
      lines: ['Black Tie Optional', 'October evenings are cool — bring a wrap'],
    },
  ];

  return (
    <section style={{ backgroundColor: 'var(--night)', padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3rem)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <SectionLabel>The Details</SectionLabel>
          </div>
        </Reveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
          gap: 'clamp(2rem, 5vw, 3rem)',
        }}>
          {cols.map((col, i) => (
            <Reveal key={col.label} delay={i * 0.1}>
              <div style={{ textAlign: 'center' }}>
                <p style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '0.52rem',
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  opacity: 0.6,
                  fontWeight: 500,
                  marginBottom: '1rem',
                }}>
                  {col.label}
                </p>
                <div style={{ width: 24, height: 1, backgroundColor: 'var(--gold)', opacity: 0.25, margin: '0 auto 1rem' }} />
                {col.lines.map((line, j) => (
                  <p
                    key={j}
                    style={{
                      fontFamily: j === 0 ? "'Cormorant Garamond', Georgia, serif" : "'Jost', sans-serif",
                      fontSize: j === 0 ? 'clamp(1rem, 2.5vw, 1.3rem)' : 'clamp(0.75rem, 1.8vw, 0.85rem)',
                      fontStyle: j === 0 ? 'italic' : 'normal',
                      fontWeight: j === 0 ? 400 : 300,
                      color: j === 0 ? 'var(--ink)' : 'var(--ink-muted)',
                      lineHeight: 1.5,
                      marginBottom: j === 0 ? '0.3rem' : 0,
                    }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div style={{ textAlign: 'center', marginTop: 'clamp(3rem, 6vw, 5rem)' }}>
            <div style={{ width: 36, height: 1, backgroundColor: 'var(--gold)', opacity: 0.2, margin: '0 auto 1.5rem' }} />
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(0.95rem, 2.2vw, 1.15rem)',
              fontStyle: 'italic',
              fontWeight: 400,
              color: 'var(--ink-muted)',
            }}>
              {wedding.formalNote}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Story ────────────────────────────────────────────────────────────────────
function Story() {
  return (
    <section style={{ backgroundColor: 'var(--deep)', padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3rem)' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
        <Reveal>
          <SectionLabel>Our Story</SectionLabel>
          <div style={{ width: 36, height: 1, backgroundColor: 'var(--gold)', opacity: 0.25, margin: '0.75rem auto 2rem' }} />
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.15rem, 3vw, 1.6rem)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: 'var(--ink)',
            lineHeight: 1.85,
            opacity: 0.88,
          }}>
            "{wedding.story}"
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: '0.62rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            opacity: 0.45,
            marginTop: '2rem',
            fontWeight: 400,
          }}>
            {wedding.partnerA} &amp; {wedding.partnerB}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ── Address Form ─────────────────────────────────────────────────────────────
const INPUT_STYLE = {
  width: '100%',
  padding: '0.8rem 0',
  background: 'none',
  border: 'none',
  borderBottom: '1px solid rgba(200,168,76,0.28)',
  fontFamily: "'Jost', sans-serif",
  fontSize: '0.92rem',
  color: 'var(--ink)',
  fontWeight: 300,
  outline: 'none',
  transition: 'border-color 0.2s',
  caretColor: 'var(--gold)',
};

function FieldError({ msg }) {
  if (!msg) return null;
  return <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.7rem', color: '#d16060', marginTop: '0.3rem' }}>{msg}</p>;
}

function AddressForm() {
  const [submitted, setSubmitted] = useState(() => {
    try { return !!localStorage.getItem(STORAGE_KEY); } catch { return false; }
  });
  const [fields, setFields] = useState({ name: '', street: '', city: '', state: '', zip: '' });
  const [errors, setErrors] = useState({});
  const [pending, setPending] = useState(false);

  const set = (key, val) => setFields(f => ({ ...f, [key]: val }));
  const clearErr = (key) => setErrors(e => ({ ...e, [key]: null }));

  function validate() {
    const required = ['name', 'street', 'city', 'state', 'zip'];
    const errs = {};
    required.forEach(k => { if (!fields[k].trim()) errs[k] = 'Required'; });
    return errs;
  }

  function handleSubmit() {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setPending(true);
    setTimeout(() => {
      setPending(false);
      setSubmitted(true);
      try { localStorage.setItem(STORAGE_KEY, '1'); } catch {}
    }, 850);
  }

  if (submitted) {
    return (
      <section style={{ backgroundColor: 'var(--night)', padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3rem)' }}>
        <div style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Monogram size={64} />
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: 'var(--ink)',
              margin: '1.5rem 0 0.75rem',
            }}>
              You're on the list.
            </p>
            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 'clamp(0.82rem, 1.8vw, 0.95rem)',
              color: 'var(--ink-muted)',
              fontWeight: 300,
              lineHeight: 1.75,
              marginBottom: '1.5rem',
            }}>
              Your formal invitation will arrive by post. We can't wait to celebrate with you.
            </p>
            <p style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
              color: 'var(--gold)',
              opacity: 0.55,
            }}>
              {wedding.hashtag}
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="reserve" style={{ backgroundColor: 'var(--night)', padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3rem)' }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
            <SectionLabel>Stay in touch</SectionLabel>
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: 'var(--ink)',
              marginBottom: '0.75rem',
            }}>
              Be the first to receive our formal invitation
            </p>
            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)',
              color: 'var(--ink-muted)',
              fontWeight: 300,
              lineHeight: 1.7,
            }}>
              Share your mailing address and we'll send your invitation by post.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {/* Name */}
            <div>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.52rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0.6, marginBottom: '0.4rem', fontWeight: 500 }}>Full Name</p>
              <input
                style={INPUT_STYLE}
                value={fields.name}
                onChange={e => { set('name', e.target.value); clearErr('name'); }}
                placeholder="Your full name"
                onFocus={e => e.target.style.borderBottomColor = 'var(--gold)'}
                onBlur={e => e.target.style.borderBottomColor = 'rgba(200,168,76,0.28)'}
              />
              <FieldError msg={errors.name} />
            </div>

            {/* Street */}
            <div>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.52rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0.6, marginBottom: '0.4rem', fontWeight: 500 }}>Street Address</p>
              <input
                style={INPUT_STYLE}
                value={fields.street}
                onChange={e => { set('street', e.target.value); clearErr('street'); }}
                placeholder="123 Main Street, Apt 4"
                onFocus={e => e.target.style.borderBottomColor = 'var(--gold)'}
                onBlur={e => e.target.style.borderBottomColor = 'rgba(200,168,76,0.28)'}
              />
              <FieldError msg={errors.street} />
            </div>

            {/* City / State / ZIP */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 100px', gap: '1rem' }}>
              <div>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.52rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0.6, marginBottom: '0.4rem', fontWeight: 500 }}>City</p>
                <input
                  style={INPUT_STYLE}
                  value={fields.city}
                  onChange={e => { set('city', e.target.value); clearErr('city'); }}
                  placeholder="City"
                  onFocus={e => e.target.style.borderBottomColor = 'var(--gold)'}
                  onBlur={e => e.target.style.borderBottomColor = 'rgba(200,168,76,0.28)'}
                />
                <FieldError msg={errors.city} />
              </div>
              <div>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.52rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0.6, marginBottom: '0.4rem', fontWeight: 500 }}>State</p>
                <input
                  style={INPUT_STYLE}
                  value={fields.state}
                  onChange={e => { set('state', e.target.value); clearErr('state'); }}
                  placeholder="CA"
                  maxLength={2}
                  onFocus={e => e.target.style.borderBottomColor = 'var(--gold)'}
                  onBlur={e => e.target.style.borderBottomColor = 'rgba(200,168,76,0.28)'}
                />
                <FieldError msg={errors.state} />
              </div>
              <div>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.52rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0.6, marginBottom: '0.4rem', fontWeight: 500 }}>ZIP</p>
                <input
                  style={INPUT_STYLE}
                  value={fields.zip}
                  onChange={e => { set('zip', e.target.value); clearErr('zip'); }}
                  placeholder="90210"
                  maxLength={10}
                  onFocus={e => e.target.style.borderBottomColor = 'var(--gold)'}
                  onBlur={e => e.target.style.borderBottomColor = 'rgba(200,168,76,0.28)'}
                />
                <FieldError msg={errors.zip} />
              </div>
            </div>

            {/* Submit */}
            <div style={{ textAlign: 'center', paddingTop: '0.75rem' }}>
              <button
                onClick={handleSubmit}
                disabled={pending}
                style={{
                  padding: '0.95rem 3rem',
                  border: '1px solid var(--gold)',
                  backgroundColor: pending ? 'transparent' : 'var(--gold)',
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '0.62rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: pending ? 'var(--gold)' : 'var(--night)',
                  fontWeight: 500,
                  cursor: pending ? 'default' : 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { if (!pending) { e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'var(--gold)'; } }}
                onMouseLeave={e => { if (!pending) { e.target.style.backgroundColor = 'var(--gold)'; e.target.style.color = 'var(--night)'; } }}
              >
                {pending ? 'Sending…' : 'Send My Address'}
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--deep)',
      borderTop: '1px solid rgba(200,168,76,0.08)',
      padding: 'clamp(3.5rem, 7vw, 5.5rem) clamp(1.5rem, 5vw, 3rem) clamp(2rem, 4vw, 3rem)',
      textAlign: 'center',
    }}>
      <Monogram size={60} />

      <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', color: 'var(--ink)', opacity: 0.85, marginTop: '1.5rem', lineHeight: 1 }}>
        {wedding.partnerAFull}
      </p>
      <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', color: 'var(--gold)', opacity: 0.4, margin: '0.25rem 0', lineHeight: 1 }}>&amp;</p>
      <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', color: 'var(--ink)', opacity: 0.85, lineHeight: 1, marginBottom: '1.25rem' }}>
        {wedding.partnerBFull}
      </p>

      <div style={{ width: 32, height: 1, backgroundColor: 'var(--gold)', opacity: 0.2, margin: '0 auto 1.25rem' }} />

      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.55rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0.45, marginBottom: '1.5rem', fontWeight: 400 }}>
        {wedding.dateDisplay}  ·  {wedding.venueCity}
      </p>

      <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(1.1rem, 2.8vw, 1.5rem)', color: 'var(--gold)', opacity: 0.35, marginBottom: '1.75rem' }}>
        {wedding.hashtag}
      </p>

      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.7rem', fontStyle: 'italic', fontWeight: 300, color: 'rgba(245,237,216,0.2)' }}>
        We can't wait to celebrate with you.
      </p>
    </footer>
  );
}

// ── Landing ──────────────────────────────────────────────────────────────────
export default function LandingV6() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9 }}
    >
      <main>
        <Hero />
        <Countdown />
        <Details />
        <Story />
        <AddressForm />
      </main>
      <Footer />
    </motion.div>
  );
}
