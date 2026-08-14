import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import wedding from '../data/wedding.js';

/* ── Scroll reveal ───────────────────────────────────────── */
const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.8, ease: [0.2, 0, 0.1, 1] },
};

/* ── Thin rule ───────────────────────────────────────────── */
function Rule({ width = '100%', opacity = 0.15 }) {
  return <div style={{ width, height: 1, background: 'var(--ink)', opacity, margin: '0 auto' }} />;
}

/* ── Botanical vine SVG divider ─────────────────────────── */
function VineDivider({ width = 600 }) {
  return (
    <svg viewBox="0 0 600 36" width={width} style={{ maxWidth: '90vw', display: 'block', margin: '0 auto', opacity: 0.28 }}>
      <path d="M0,18 Q75,8 150,18 Q225,28 300,18 Q375,8 450,18 Q525,28 600,18"
        fill="none" stroke="var(--ink)" strokeWidth="0.9" />
      <path d="M75,14 Q70,4 62,8 Q56,12 68,18" fill="none" stroke="var(--ink)" strokeWidth="0.8" />
      <path d="M75,14 Q80,5 88,9 Q94,13 82,18" fill="none" stroke="var(--ink)" strokeWidth="0.8" />
      <path d="M525,22 Q520,12 512,16 Q506,20 518,26" fill="none" stroke="var(--ink)" strokeWidth="0.8" />
      <path d="M525,22 Q530,13 538,17 Q544,21 532,26" fill="none" stroke="var(--ink)" strokeWidth="0.8" />
      <path d="M300,12 L300,5" stroke="var(--ink)" strokeWidth="0.9" />
      <circle cx="300" cy="4" r="2.5" fill="var(--ink)" />
      <path d="M296,9 Q290,5 295,3" fill="none" stroke="var(--ink)" strokeWidth="0.7" />
      <path d="M304,9 Q310,5 305,3" fill="none" stroke="var(--ink)" strokeWidth="0.7" />
      {[150, 225, 375, 450].map(x => <circle key={x} cx={x} cy={18} r="1.8" fill="var(--ink)" />)}
    </svg>
  );
}

/* ── Countdown ───────────────────────────────────────────── */
function Countdown() {
  const [time, setTime] = useState(getTimeLeft());

  function getTimeLeft() {
    const diff = new Date(wedding.date) - new Date();
    if (diff <= 0) return null;
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  }

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) {
    return (
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '2rem', color: 'var(--ink)', textAlign: 'center' }}>
        Today's the day.
      </p>
    );
  }

  const units = [
    { value: time.days,    label: 'Days'    },
    { value: time.hours,   label: 'Hours'   },
    { value: time.minutes, label: 'Minutes' },
    { value: time.seconds, label: 'Seconds' },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center', gap: 0 }}>
      {units.map(({ value, label }, i) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', padding: '0 clamp(1.2rem, 3vw, 2.5rem)' }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(3rem, 9vw, 5.5rem)',
              fontWeight: 300,
              color: 'var(--ink)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              minWidth: '2ch',
            }}>
              {String(value).padStart(2, '0')}
            </div>
            <div className="text-label" style={{ color: 'var(--ink)', opacity: 0.45, marginTop: '0.6rem', fontSize: '0.5rem' }}>
              {label}
            </div>
          </div>
          {i < 3 && (
            <div style={{ width: 1, background: 'var(--ink)', opacity: 0.15, alignSelf: 'stretch', margin: '4px 0' }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── RSVP Form ───────────────────────────────────────────── */
function RsvpForm() {
  const STORAGE_KEY = 'noir_submitted_v9';
  const [submitted, setSubmitted] = useState(() => !!localStorage.getItem(STORAGE_KEY));
  const [pending, setPending] = useState(false);
  const [fields, setFields] = useState({ name: '', email: '', street: '', city: '', state: '', zip: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!fields.name.trim())   e.name   = 'Name required.';
    if (!fields.street.trim()) e.street = 'Street address required.';
    if (!fields.city.trim())   e.city   = 'City required.';
    if (!fields.state.trim())  e.state  = 'State required.';
    if (!fields.zip.trim())    e.zip    = 'ZIP required.';
    return e;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setPending(true);
    setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, '1');
      setSubmitted(true);
      setPending(false);
    }, 800);
  };

  const set = k => ev => {
    setFields(f => ({ ...f, [k]: ev.target.value }));
    setErrors(er => ({ ...er, [k]: undefined }));
  };

  const inputStyle = err => ({
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${err ? 'var(--ink)' : 'rgba(26,22,20,0.25)'}`,
    padding: '0.55rem 0.1rem',
    fontFamily: "'EB Garamond', serif",
    fontSize: '1rem',
    color: 'var(--ink)',
    outline: 'none',
  });

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', padding: '2.5rem 0' }}>
        {/* Small bow confirmation mark */}
        <svg viewBox="0 0 80 50" width="70" height="44" style={{ margin: '0 auto 1.2rem' }}>
          <path d="M40,26 C32,14 8,2 8,18 C8,30 28,34 40,26 Z" fill="var(--ink)" opacity="0.85" />
          <path d="M40,26 C48,14 72,2 72,18 C72,30 52,34 40,26 Z" fill="var(--ink)" opacity="0.85" />
          <ellipse cx="40" cy="26" rx="8" ry="6" fill="rgba(26,22,20,0.9)" />
          <path d="M36,34 C34,40 30,48 32,50" stroke="var(--ink)" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.85"/>
          <path d="M44,34 C46,40 50,48 48,50" stroke="var(--ink)" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.85"/>
        </svg>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.5rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>
          You're on the list.
        </p>
        <p style={{ fontFamily: "'EB Garamond', serif", color: 'var(--ink)', opacity: 0.55, lineHeight: 1.7 }}>
          Your formal invitation will arrive by post.<br />We cannot wait to see you in Paris.
        </p>
        <p className="text-label" style={{ marginTop: '1.2rem', color: 'var(--ink)', opacity: 0.35 }}>
          {wedding.hashtag}
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ maxWidth: 500, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem 2.5rem' }}>
        {[
          { k: 'name',   label: 'Full Name',            span: '1/-1' },
          { k: 'email',  label: 'Email (optional)',      span: '1/-1', type: 'email' },
          { k: 'street', label: 'Street Address',        span: '1/-1' },
          { k: 'city',   label: 'City',                  span: '1/2'  },
          { k: 'state',  label: 'State',                 span: '2/3'  },
          { k: 'zip',    label: 'ZIP Code',              span: '1/2'  },
        ].map(({ k, label, span, type = 'text' }) => (
          <div key={k} style={{ gridColumn: span }}>
            <label style={{
              display: 'block',
              fontFamily: "'Cinzel', serif",
              fontSize: '0.5rem',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: 'var(--ink)',
              opacity: errors[k] ? 1 : 0.45,
              marginBottom: '0.4rem',
            }}>{label}</label>
            <input type={type} value={fields[k]} onChange={set(k)} style={inputStyle(errors[k])} />
            {errors[k] && (
              <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '0.82rem', color: 'var(--ink)', opacity: 0.6, marginTop: '0.2rem' }}>
                {errors[k]}
              </p>
            )}
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
        <button
          type="submit"
          disabled={pending}
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '0.56rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'var(--blush)',
            background: pending ? 'rgba(26,22,20,0.5)' : 'var(--ink)',
            border: 'none',
            padding: '0.9rem 2.2rem',
            cursor: pending ? 'default' : 'pointer',
            transition: 'background 0.3s',
          }}
        >
          {pending ? 'Sending…' : 'Confirm My Place'}
        </button>
      </div>
    </form>
  );
}

/* ── SECTION: Hero ───────────────────────────────────────── */
function Hero() {
  return (
    <section style={{ position: 'relative', minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {/* B&W hero photo */}
      <img
        src={wedding.heroImage}
        alt="Wedding"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          filter: 'grayscale(1) contrast(1.05)',
        }}
      />
      {/* Dark gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(14,12,10,0.5) 0%, rgba(14,12,10,0.6) 50%, rgba(14,12,10,0.82) 100%)' }} />

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 clamp(1.5rem, 5vw, 4rem)' }}>

        {/* WE'RE GETTING MARRIED */}
        <motion.p {...reveal} style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 'clamp(0.5rem, 1.5vw, 0.7rem)',
          letterSpacing: '0.45em',
          textTransform: 'uppercase',
          color: 'rgba(240,235,229,0.7)',
          marginBottom: '1.4rem',
        }}>
          We're Getting Married
        </motion.p>

        {/* Thin rule */}
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.05 }} style={{ marginBottom: '1.8rem' }}>
          <Rule width="min(260px, 60vw)" opacity={0.25} />
        </motion.div>

        {/* Couple names — the showstopper */}
        <motion.h1 {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(3.2rem, 11vw, 7.5rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: '#f5f0ea',
          lineHeight: 1.08,
          letterSpacing: '0.01em',
          marginBottom: '1.8rem',
        }}>
          {wedding.partnerA} &amp;<br />{wedding.partnerB}
        </motion.h1>

        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.15 }} style={{ marginBottom: '1.4rem' }}>
          <Rule width="min(260px, 60vw)" opacity={0.25} />
        </motion.div>

        {/* Date */}
        <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.2 }} style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 'clamp(0.55rem, 1.6vw, 0.78rem)',
          letterSpacing: '0.38em',
          textTransform: 'uppercase',
          color: 'rgba(240,235,229,0.55)',
        }}>
          {wedding.dateDisplay.toUpperCase()} · {wedding.yearDisplay.toUpperCase()}
        </motion.p>

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ marginTop: '3.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
        >
          <div style={{ width: 1, height: 32, background: 'rgba(240,235,229,0.3)' }} />
          <svg width="12" height="8" viewBox="0 0 12 8">
            <path d="M1,1 L6,7 L11,1" stroke="rgba(240,235,229,0.35)" strokeWidth="1" fill="none" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

/* ── SECTION: Countdown ──────────────────────────────────── */
function CountdownSection() {
  return (
    <section className="section-pad" style={{ background: 'var(--blush)', textAlign: 'center' }}>
      <div className="container">
        {/* Vine decoration at top */}
        <motion.div {...reveal} style={{ marginBottom: '2.5rem' }}>
          <VineDivider width={560} />
        </motion.div>

        {/* "COUNTDOWN" letterpress watermark */}
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.05 }} style={{ position: 'relative', marginBottom: '1rem' }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(3.5rem, 14vw, 8rem)',
            fontWeight: 200,
            letterSpacing: '0.18em',
            color: 'rgba(26,22,20,0.055)',
            lineHeight: 1,
            textTransform: 'uppercase',
            userSelect: 'none',
          }}>
            Countdown
          </h2>
        </motion.div>

        {/* Italic subtitle */}
        <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
          color: 'var(--ink)',
          opacity: 0.45,
          letterSpacing: '0.04em',
          marginBottom: '2rem',
        }}>
          to the most special day of our lives
        </motion.p>

        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} style={{ marginBottom: '2.2rem' }}>
          <Rule width="min(60px, 14vw)" />
        </motion.div>

        {/* Countdown units */}
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.15 }}>
          <Countdown />
        </motion.div>

        {/* Date numeric watermark */}
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.2 }} style={{ marginTop: '2.2rem' }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 200,
            fontSize: 'clamp(1.8rem, 7vw, 3.5rem)',
            color: 'rgba(26,22,20,0.07)',
            letterSpacing: '0.08em',
            userSelect: 'none',
          }}>
            {wedding.dateNumeric}
          </p>
        </motion.div>

        {/* "Formal invitation to follow" */}
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.25 }} style={{ marginTop: '1.8rem' }}>
          <p className="text-label" style={{ color: 'var(--ink)', opacity: 0.3, fontSize: '0.48rem', letterSpacing: '0.42em' }}>
            {wedding.formalNote.toUpperCase()}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ── SECTION: Details ────────────────────────────────────── */
function Details() {
  return (
    <section className="section-pad" style={{ background: 'var(--ivory)', textAlign: 'center' }}>
      <div className="container">
        <motion.div {...reveal} style={{ marginBottom: '3rem' }}>
          <p className="text-label" style={{ opacity: 0.4, marginBottom: '0.8rem' }}>The Details</p>
          <Rule width="min(40px, 10vw)" />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'clamp(2rem, 5vw, 0)', position: 'relative' }}>
          {[
            {
              heading: 'When',
              lines: [wedding.dateDisplay, wedding.yearDisplay],
              sub: "Ceremony at Five o’Clock",
            },
            {
              heading: 'Where',
              lines: [wedding.venueName, wedding.venueAddress],
              sub: wedding.venueCity,
            },
            {
              heading: 'Attire',
              lines: ['Black Tie'],
              sub: 'Cocktail Attire Welcome',
            },
          ].map((col, i) => (
            <motion.div key={col.heading} {...reveal} transition={{ ...reveal.transition, delay: i * 0.08 }}
              style={{
                padding: '1.5rem 2rem',
                borderLeft: i > 0 ? '1px solid rgba(26,22,20,0.1)' : 'none',
              }}>
              <p className="text-label" style={{ opacity: 0.35, marginBottom: '1rem' }}>{col.heading}</p>
              {col.lines.map(l => (
                <p key={l} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: 'var(--ink)', lineHeight: 1.55 }}>
                  {l}
                </p>
              ))}
              <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '0.88rem', color: 'var(--ink)', opacity: 0.45, marginTop: '0.5rem' }}>
                {col.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── SECTION: Story ──────────────────────────────────────── */
function Story() {
  return (
    <section className="section-pad" style={{ background: 'var(--blush)', textAlign: 'center' }}>
      <div className="container">
        <motion.div {...reveal} style={{ marginBottom: '2rem' }}>
          <VineDivider width={320} />
        </motion.div>

        <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.05 }} className="text-label"
          style={{ opacity: 0.35, marginBottom: '0.8rem' }}>Our Story</motion.p>

        <motion.h2 {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(1.8rem, 4.5vw, 2.6rem)',
          color: 'var(--ink)',
          marginBottom: '1.5rem',
          lineHeight: 1.25,
        }}>
          A Grey October Afternoon
        </motion.h2>

        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.12 }} style={{ marginBottom: '1.5rem' }}>
          <Rule width="min(40px, 10vw)" />
        </motion.div>

        <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.15 }} style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: 'clamp(1.05rem, 2.5vw, 1.22rem)',
          color: 'var(--ink)',
          opacity: 0.65,
          lineHeight: 1.9,
          maxWidth: '58ch',
          margin: '0 auto',
        }}>
          {wedding.story}
        </motion.p>
      </div>
    </section>
  );
}

/* ── SECTION: Gallery ────────────────────────────────────── */
function Gallery() {
  return (
    <section style={{ background: 'var(--ink)', padding: 'clamp(3rem, 6vw, 5rem) 0' }}>
      <motion.div {...reveal} style={{ textAlign: 'center', marginBottom: '2rem', padding: '0 1.5rem' }}>
        <p className="text-label" style={{ color: 'rgba(240,235,229,0.35)', marginBottom: '0.5rem' }}>Moments</p>
        <Rule width="min(30px, 8vw)" opacity={0.2} />
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
        {wedding.gallery.map((src, i) => (
          <motion.div key={i} {...reveal} transition={{ ...reveal.transition, delay: i * 0.06 }}
            style={{ aspectRatio: i === 1 ? '4/5' : '1', overflow: 'hidden' }}>
            <img
              src={src}
              alt={`Photo ${i + 1}`}
              loading="lazy"
              decoding="async"
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                filter: 'grayscale(1) contrast(1.05)',
                transition: 'transform 0.6s ease, filter 0.4s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.filter = 'grayscale(0.6) contrast(1.05)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'grayscale(1) contrast(1.05)'; }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ── SECTION: RSVP ───────────────────────────────────────── */
function RsvpSection() {
  return (
    <section className="section-pad" style={{ background: 'var(--ivory)', textAlign: 'center' }}>
      <div className="container">
        <motion.div {...reveal} style={{ marginBottom: '2.5rem' }}>
          <p className="text-label" style={{ opacity: 0.35, marginBottom: '0.8rem' }}>Reserve Your Place</p>
          <Rule width="min(40px, 10vw)" />
        </motion.div>

        <motion.h2 {...reveal} transition={{ ...reveal.transition, delay: 0.05 }} style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
          color: 'var(--ink)',
          marginBottom: '0.6rem',
        }}>
          Be the First to Receive Our Invitation
        </motion.h2>

        <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} style={{
          fontFamily: "'EB Garamond', serif",
          fontStyle: 'italic',
          fontSize: '1rem',
          color: 'var(--ink)',
          opacity: 0.45,
          marginBottom: '2.5rem',
          maxWidth: '42ch',
          margin: '0 auto 2.5rem',
        }}>
          Share your mailing address and we'll send your formal invitation as soon as they're ready.
        </motion.p>

        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.15 }}>
          <RsvpForm />
        </motion.div>
      </div>
    </section>
  );
}

/* ── SECTION: Footer ─────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--ivory)', padding: 'clamp(3.5rem, 7vw, 5.5rem) clamp(1.5rem, 5vw, 3rem)', textAlign: 'center' }}>
      <div className="container">
        {/* Vine */}
        <motion.div {...reveal} style={{ marginBottom: '2rem' }}>
          <svg viewBox="0 0 600 36" width="min(480px, 90vw)" style={{ display: 'block', margin: '0 auto', opacity: 0.2 }}>
            <path d="M0,18 Q75,8 150,18 Q225,28 300,18 Q375,8 450,18 Q525,28 600,18" fill="none" stroke="var(--ivory)" strokeWidth="0.9" />
            <path d="M300,12 L300,5" stroke="var(--ivory)" strokeWidth="0.9" />
            <circle cx="300" cy="4" r="2.5" fill="var(--ivory)" />
            {[150, 225, 375, 450].map(x => <circle key={x} cx={x} cy={18} r="1.8" fill="var(--ivory)" />)}
          </svg>
        </motion.div>

        <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.05 }} style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(2rem, 5.5vw, 3.2rem)',
          color: 'rgba(250,249,247,0.9)',
          marginBottom: '1rem',
          letterSpacing: '0.02em',
        }}>
          Serena &amp; Dorian
        </motion.p>

        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.08 }} style={{ marginBottom: '1rem' }}>
          <Rule width="min(40px, 10vw)" opacity={0.18} />
        </motion.div>

        <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.12 }} className="text-label"
          style={{ color: 'rgba(250,249,247,0.35)', marginBottom: '0.5rem', fontSize: '0.48rem' }}>
          Château de Vaux · Paris, France · November 6, 2027
        </motion.p>

        <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.15 }} style={{
          fontFamily: "'EB Garamond', serif",
          fontStyle: 'italic',
          fontSize: '1rem',
          color: 'rgba(250,249,247,0.35)',
          marginBottom: '1.5rem',
        }}>
          We cannot wait to celebrate with you.
        </motion.p>

        <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.2 }} className="text-label"
          style={{ color: 'rgba(250,249,247,0.2)', fontSize: '0.46rem', letterSpacing: '0.32em' }}>
          {wedding.hashtag}
        </motion.p>
      </div>
    </footer>
  );
}

/* ── Main Landing ────────────────────────────────────────── */
export default function LandingNoir() {
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <motion.div
      key="landing-noir"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <span ref={headingRef} tabIndex={-1} className="sr-only">Save the Date — Serena and Dorian</span>
      <Hero />
      <CountdownSection />
      <Details />
      <Story />
      <Gallery />
      <RsvpSection />
      <Footer />
    </motion.div>
  );
}
