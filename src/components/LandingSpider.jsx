import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import wedding from '../data/wedding';

const STORAGE_KEY = 'spider_submitted_v7';

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

// ── Shared ───────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay }}
    >
      {children}
    </motion.div>
  );
}

// A corner web decoration — thin SVG quarter-web radiating from a corner
function CornerWeb({ corner = 'tl', size = 100, opacity = 0.18 }) {
  const rays = 5;
  const rings = 3;
  const maxR = size * 0.95;

  // Angle range depends on corner
  const baseAngles = { tl: 0, tr: Math.PI / 2, br: Math.PI, bl: -Math.PI / 2 };
  const base = baseAngles[corner];

  const paths = [];
  // Rays
  for (let i = 0; i <= rays; i++) {
    const a = base + (i / rays) * (Math.PI / 2);
    paths.push(`M0,0L${(Math.cos(a) * maxR).toFixed(1)},${(Math.sin(a) * maxR).toFixed(1)}`);
  }
  // Rings
  for (let r = 1; r <= rings; r++) {
    const radius = (r / rings) * maxR * 0.88;
    for (let i = 0; i < rays; i++) {
      const a1 = base + (i / rays) * (Math.PI / 2);
      const a2 = base + ((i + 1) / rays) * (Math.PI / 2);
      const ma = base + ((i + 0.5) / rays) * (Math.PI / 2);
      const p1x = Math.cos(a1) * radius;
      const p1y = Math.sin(a1) * radius;
      const p2x = Math.cos(a2) * radius;
      const p2y = Math.sin(a2) * radius;
      const qx = Math.cos(ma) * radius * 1.15;
      const qy = Math.sin(ma) * radius * 1.15;
      paths.push(`M${p1x.toFixed(1)},${p1y.toFixed(1)}Q${qx.toFixed(1)},${qy.toFixed(1)} ${p2x.toFixed(1)},${p2y.toFixed(1)}`);
    }
  }

  const transforms = { tl: '', tr: `translate(${size},0)`, br: `translate(${size},${size})`, bl: `translate(0,${size})` };

  return (
    <svg
      width={size} height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ position: 'absolute', opacity, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <g transform={transforms[corner]}>
        {paths.map((d, i) => (
          <path key={i} d={d} stroke="rgba(210,215,235,1)" strokeWidth="0.6" fill="none" strokeLinecap="round" />
        ))}
      </g>
    </svg>
  );
}

function RedRule() {
  return <div style={{ width: 28, height: 1, backgroundColor: 'var(--red)', opacity: 0.45, margin: '0 auto' }} />;
}

function SectionLabel({ children }) {
  return (
    <p style={{
      fontFamily: "'Jost', sans-serif",
      fontSize: '0.54rem',
      letterSpacing: '0.32em',
      textTransform: 'uppercase',
      fontWeight: 500,
      color: 'var(--red)',
      opacity: 0.7,
      marginBottom: '0.75rem',
    }}>
      {children}
    </p>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const headingRef = { current: null };
  useEffect(() => { headingRef.current?.focus(); }, []);

  return (
    <section style={{
      position: 'relative',
      minHeight: '100svh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
      overflow: 'hidden',
      backgroundColor: '#080b14',
    }}>
      {/* Corner webs */}
      <div style={{ position: 'absolute', top: 0, left: 0 }}><CornerWeb corner="tl" size={140} opacity={0.22} /></div>
      <div style={{ position: 'absolute', top: 0, right: 0 }}><CornerWeb corner="tr" size={140} opacity={0.22} /></div>

      {/* City warm glow */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
        background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(220,100,30,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            color: 'var(--gold)',
            opacity: 0.8,
            lineHeight: 1,
            marginBottom: 'clamp(0.75rem, 2vw, 1.25rem)',
          }}
        >
          Save the Date
        </motion.p>

        <motion.h1
          ref={r => { headingRef.current = r; }}
          tabIndex={-1}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45 }}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(3.5rem, 12vw, 8.5rem)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: '#f0ece4',
            lineHeight: 1.02,
            letterSpacing: '-0.01em',
            marginBottom: 'clamp(1.25rem, 3vw, 2rem)',
            outline: 'none',
          }}
        >
          {wedding.partnerA}<br />
          <span style={{ fontSize: '0.38em', fontStyle: 'normal', color: 'var(--red)', opacity: 0.7, letterSpacing: '0.1em' }}>&amp;</span>
          <br />
          {wedding.partnerB}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.75 }}
        >
          <RedRule />
          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 'clamp(0.6rem, 1.8vw, 0.82rem)',
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            fontWeight: 400,
            marginTop: 'clamp(0.75rem, 2vw, 1rem)',
            marginBottom: '0.35rem',
          }}>
            {wedding.dateDisplay}
          </p>
          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 'clamp(0.52rem, 1.4vw, 0.68rem)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(240,236,228,0.4)',
            fontWeight: 300,
          }}>
            {wedding.venueName}  ·  {wedding.venueCity}
          </p>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.4 }}
        style={{ position: 'absolute', bottom: 'clamp(6rem, 14vw, 9rem)' }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: 'var(--red)', opacity: 0.35, fontSize: '1rem' }}
        >
          ↓
        </motion.div>
      </motion.div>

      {/* City skyline */}
      <svg
        viewBox="0 0 1200 180"
        preserveAspectRatio="xMidYMax meet"
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', height: 'clamp(55px, 13vw, 120px)', pointerEvents: 'none' }}
        aria-hidden="true"
      >
        <rect x="0" y="80" width="60" height="100" fill="#080b14" />
        <rect x="55" y="50" width="40" height="130" fill="#080b14" />
        <rect x="90" y="70" width="55" height="110" fill="#080b14" />
        <rect x="140" y="30" width="30" height="150" fill="#080b14" />
        <rect x="165" y="55" width="50" height="125" fill="#080b14" />
        <rect x="210" y="75" width="45" height="105" fill="#080b14" />
        <rect x="250" y="40" width="35" height="140" fill="#080b14" />
        <rect x="280" y="65" width="60" height="115" fill="#080b14" />
        <rect x="335" y="20" width="25" height="160" fill="#080b14" />
        <polygon points="335,20 347,5 360,20" fill="#080b14" />
        <rect x="355" y="55" width="55" height="125" fill="#080b14" />
        <rect x="405" y="70" width="40" height="110" fill="#080b14" />
        <rect x="440" y="35" width="50" height="145" fill="#080b14" />
        <rect x="485" y="60" width="45" height="120" fill="#080b14" />
        <rect x="525" y="15" width="30" height="165" fill="#080b14" />
        <polygon points="525,15 540,0 555,15" fill="#080b14" />
        <rect x="550" y="50" width="60" height="130" fill="#080b14" />
        <rect x="605" y="75" width="40" height="105" fill="#080b14" />
        <rect x="640" y="30" width="55" height="150" fill="#080b14" />
        <rect x="690" y="60" width="45" height="120" fill="#080b14" />
        <rect x="730" y="45" width="35" height="135" fill="#080b14" />
        <rect x="760" y="20" width="30" height="160" fill="#080b14" />
        <polygon points="760,20 775,5 790,20" fill="#080b14" />
        <rect x="785" y="55" width="60" height="125" fill="#080b14" />
        <rect x="840" y="70" width="50" height="110" fill="#080b14" />
        <rect x="885" y="35" width="40" height="145" fill="#080b14" />
        <rect x="920" y="60" width="55" height="120" fill="#080b14" />
        <rect x="970" y="40" width="35" height="140" fill="#080b14" />
        <rect x="1000" y="65" width="60" height="115" fill="#080b14" />
        <rect x="1055" y="25" width="30" height="155" fill="#080b14" />
        <rect x="1080" y="50" width="50" height="130" fill="#080b14" />
        <rect x="1125" y="70" width="75" height="110" fill="#080b14" />
        <rect x="0" y="160" width="1200" height="20" fill="#080b14" />
        {[
          [70,60],[75,72],[72,84],[350,35],[352,50],[358,65],
          [540,25],[543,40],[547,55],[770,30],[774,45],[778,60],
          [1063,38],[1067,55],[1071,72],
        ].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="2.5" height="1.5" fill="rgba(255,220,120,0.35)" />
        ))}
      </svg>
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
    <section style={{ backgroundColor: '#0c1020', padding: 'clamp(3.5rem, 7vw, 6rem) clamp(1.5rem, 5vw, 3rem)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <Reveal><SectionLabel>Until we say I do</SectionLabel></Reveal>
        {time.past ? (
          <Reveal delay={0.1}>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontStyle: 'italic', color: '#f0ece4', fontWeight: 300 }}>
              Today's the day.
            </p>
          </Reveal>
        ) : (
          <Reveal delay={0.1}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(0.75rem, 2.5vw, 1.5rem)', flexWrap: 'wrap' }}>
              {units.map(({ label, value }) => (
                <div key={label} style={{
                  textAlign: 'center',
                  minWidth: 'clamp(64px, 18vw, 100px)',
                  padding: 'clamp(1rem, 2.5vw, 1.5rem) clamp(0.75rem, 2vw, 1.25rem)',
                  border: '1px solid rgba(204,31,46,0.2)',
                  backgroundColor: 'rgba(204,31,46,0.04)',
                }}>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 'clamp(2.2rem, 7vw, 4.5rem)',
                    fontWeight: 300,
                    color: '#f0ece4',
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
                    color: 'var(--red)',
                    opacity: 0.65,
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
  return (
    <section style={{ position: 'relative', backgroundColor: '#080b14', padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3rem)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: 0, right: 0 }}><CornerWeb corner="br" size={120} opacity={0.14} /></div>

      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <SectionLabel>The Details</SectionLabel>
          </div>
        </Reveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
          gap: 'clamp(2rem, 5vw, 3.5rem)',
        }}>
          {[
            { label: 'When', main: wedding.dateDisplay, sub: '4:00 in the Afternoon' },
            { label: 'Where', main: wedding.venueName, sub: wedding.venueCity },
            { label: 'Dress', main: 'Black Tie Optional', sub: 'September evenings can be cool' },
          ].map((col, i) => (
            <Reveal key={col.label} delay={i * 0.1}>
              <div style={{ textAlign: 'center' }}>
                <SectionLabel>{col.label}</SectionLabel>
                <div style={{ width: 20, height: 1, backgroundColor: 'var(--red)', opacity: 0.3, margin: '0 auto 1rem' }} />
                <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', fontStyle: 'italic', fontWeight: 400, color: '#f0ece4', lineHeight: 1.4, marginBottom: '0.3rem' }}>
                  {col.main}
                </p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 'clamp(0.72rem, 1.6vw, 0.82rem)', fontWeight: 300, color: 'rgba(240,236,228,0.45)', lineHeight: 1.6 }}>
                  {col.sub}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div style={{ textAlign: 'center', marginTop: 'clamp(3rem, 6vw, 5rem)' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(0.95rem, 2.2vw, 1.15rem)', fontStyle: 'italic', fontWeight: 400, color: 'rgba(240,236,228,0.45)' }}>
              {wedding.formalNote}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Origin Story ─────────────────────────────────────────────────────────────
function Story() {
  return (
    <section style={{ backgroundColor: '#0c1020', padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3rem)' }}>
      <div style={{ maxWidth: 620, margin: '0 auto', textAlign: 'center' }}>
        <Reveal>
          <SectionLabel>The Origin Story</SectionLabel>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.65rem', fontStyle: 'italic', color: 'rgba(240,236,228,0.3)', letterSpacing: '0.1em', marginBottom: '1.5rem', fontWeight: 300 }}>
            (every love has one)
          </p>
          <div style={{ width: 28, height: 1, backgroundColor: 'var(--red)', opacity: 0.3, margin: '0 auto 2rem' }} />
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.1rem, 3vw, 1.55rem)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: '#f0ece4',
            lineHeight: 1.85,
            opacity: 0.88,
          }}>
            "{wedding.story}"
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'var(--gold)',
            opacity: 0.5,
            marginTop: '2rem',
          }}>
            {wedding.quote}
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
  borderBottom: '1px solid rgba(210,215,235,0.18)',
  fontFamily: "'Jost', sans-serif",
  fontSize: '0.92rem',
  color: '#f0ece4',
  fontWeight: 300,
  outline: 'none',
  transition: 'border-color 0.2s',
  caretColor: 'var(--red)',
};

function FieldError({ msg }) {
  if (!msg) return null;
  return <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.7rem', color: '#e05555', marginTop: '0.3rem' }}>{msg}</p>;
}

function AddressForm() {
  const [submitted, setSubmitted] = useState(() => {
    try { return !!localStorage.getItem(STORAGE_KEY); } catch { return false; }
  });
  const [fields, setFields] = useState({ name: '', street: '', city: '', state: '', zip: '' });
  const [errors, setErrors] = useState({});
  const [pending, setPending] = useState(false);

  const set = (k, v) => setFields(f => ({ ...f, [k]: v }));
  const clearErr = (k) => setErrors(e => ({ ...e, [k]: null }));

  function validate() {
    const errs = {};
    ['name', 'street', 'city', 'state', 'zip'].forEach(k => {
      if (!fields[k].trim()) errs[k] = 'Required';
    });
    return errs;
  }

  function handleSubmit() {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setPending(true);
    setTimeout(() => {
      setPending(false);
      setSubmitted(true);
      try { localStorage.setItem(STORAGE_KEY, '1'); } catch {}
    }, 850);
  }

  if (submitted) {
    return (
      <section style={{ backgroundColor: '#080b14', padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3rem)' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}
        >
          {/* Small web graphic */}
          <svg width="64" height="64" viewBox="-32 -32 64 64" style={{ display: 'block', margin: '0 auto 1.5rem' }} aria-hidden="true">
            {Array.from({ length: 6 }, (_, i) => {
              const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
              return <line key={i} x1="0" y1="0" x2={(Math.cos(a) * 28).toFixed(1)} y2={(Math.sin(a) * 28).toFixed(1)} stroke="rgba(204,31,46,0.6)" strokeWidth="0.8" />;
            })}
            {[1, 2, 3].map(r => {
              const radius = (r / 3) * 24;
              return Array.from({ length: 6 }, (_, i) => {
                const a1 = (i / 6) * Math.PI * 2 - Math.PI / 2;
                const a2 = ((i + 1) / 6) * Math.PI * 2 - Math.PI / 2;
                const ma = a1 + Math.PI / 6;
                return (
                  <path
                    key={`${r}-${i}`}
                    d={`M${(Math.cos(a1)*radius).toFixed(1)},${(Math.sin(a1)*radius).toFixed(1)}Q${(Math.cos(ma)*radius*1.15).toFixed(1)},${(Math.sin(ma)*radius*1.15).toFixed(1)} ${(Math.cos(a2)*radius).toFixed(1)},${(Math.sin(a2)*radius).toFixed(1)}`}
                    stroke="rgba(204,31,46,0.45)" strokeWidth="0.7" fill="none"
                  />
                );
              });
            })}
            <circle cx="0" cy="0" r="2.5" fill="var(--red)" opacity="0.7" />
          </svg>

          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontStyle: 'italic', fontWeight: 300, color: '#f0ece4', marginBottom: '0.75rem' }}>
            You're on the list.
          </p>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 'clamp(0.82rem, 1.8vw, 0.95rem)', color: 'rgba(240,236,228,0.5)', fontWeight: 300, lineHeight: 1.75, marginBottom: '1.5rem' }}>
            Your invitation will arrive by post. We can't wait to have you there.
          </p>
          <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', color: 'var(--gold)', opacity: 0.5 }}>
            {wedding.hashtag}
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section style={{ position: 'relative', backgroundColor: '#080b14', padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3rem)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0 }}><CornerWeb corner="tl" size={110} opacity={0.13} /></div>

      <div style={{ maxWidth: 540, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
            <SectionLabel>Stay in touch</SectionLabel>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontStyle: 'italic', fontWeight: 300, color: '#f0ece4', marginBottom: '0.75rem' }}>
              Be the first to receive our formal invitation
            </p>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 'clamp(0.78rem, 1.8vw, 0.9rem)', color: 'rgba(240,236,228,0.4)', fontWeight: 300, lineHeight: 1.7 }}>
              Share your mailing address and we'll send it by post.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.52rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--red)', opacity: 0.6, marginBottom: '0.4rem', fontWeight: 500 }}>Full Name</p>
              <input style={INPUT_STYLE} value={fields.name} placeholder="Your full name"
                onChange={e => { set('name', e.target.value); clearErr('name'); }}
                onFocus={e => e.target.style.borderBottomColor = 'rgba(204,31,46,0.5)'}
                onBlur={e => e.target.style.borderBottomColor = 'rgba(210,215,235,0.18)'} />
              <FieldError msg={errors.name} />
            </div>
            <div>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.52rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--red)', opacity: 0.6, marginBottom: '0.4rem', fontWeight: 500 }}>Street Address</p>
              <input style={INPUT_STYLE} value={fields.street} placeholder="123 Main Street"
                onChange={e => { set('street', e.target.value); clearErr('street'); }}
                onFocus={e => e.target.style.borderBottomColor = 'rgba(204,31,46,0.5)'}
                onBlur={e => e.target.style.borderBottomColor = 'rgba(210,215,235,0.18)'} />
              <FieldError msg={errors.street} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 72px 96px', gap: '1rem' }}>
              {[
                { key: 'city', label: 'City', placeholder: 'City', max: null },
                { key: 'state', label: 'State', placeholder: 'NY', max: 2 },
                { key: 'zip', label: 'ZIP', placeholder: '10001', max: 10 },
              ].map(({ key, label, placeholder, max }) => (
                <div key={key}>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.52rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--red)', opacity: 0.6, marginBottom: '0.4rem', fontWeight: 500 }}>{label}</p>
                  <input style={INPUT_STYLE} value={fields[key]} placeholder={placeholder} maxLength={max || undefined}
                    onChange={e => { set(key, e.target.value); clearErr(key); }}
                    onFocus={e => e.target.style.borderBottomColor = 'rgba(204,31,46,0.5)'}
                    onBlur={e => e.target.style.borderBottomColor = 'rgba(210,215,235,0.18)'} />
                  <FieldError msg={errors[key]} />
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', paddingTop: '0.75rem' }}>
              <button
                onClick={handleSubmit}
                disabled={pending}
                style={{
                  padding: '0.95rem 3rem',
                  border: '1px solid var(--red)',
                  backgroundColor: pending ? 'transparent' : 'var(--red)',
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: pending ? 'var(--red)' : '#f0ece4',
                  fontWeight: 500,
                  cursor: pending ? 'default' : 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { if (!pending) { e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'var(--red)'; } }}
                onMouseLeave={e => { if (!pending) { e.target.style.backgroundColor = 'var(--red)'; e.target.style.color = '#f0ece4'; } }}
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
      position: 'relative',
      backgroundColor: '#0c1020',
      borderTop: '1px solid rgba(204,31,46,0.1)',
      padding: 'clamp(3.5rem, 7vw, 5.5rem) clamp(1.5rem, 5vw, 3rem) clamp(2rem, 4vw, 3rem)',
      textAlign: 'center',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', bottom: 0, right: 0 }}><CornerWeb corner="br" size={100} opacity={0.12} /></div>
      <div style={{ position: 'absolute', bottom: 0, left: 0 }}><CornerWeb corner="bl" size={100} opacity={0.12} /></div>

      <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', color: '#f0ece4', opacity: 0.85, lineHeight: 1, marginBottom: '0.3rem' }}>
        {wedding.partnerAFull}
      </p>
      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontStyle: 'italic', color: 'var(--red)', opacity: 0.5, margin: '0.25rem 0', lineHeight: 1 }}>&amp;</p>
      <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', color: '#f0ece4', opacity: 0.85, lineHeight: 1, marginBottom: '1.5rem' }}>
        {wedding.partnerBFull}
      </p>

      <div style={{ width: 28, height: 1, backgroundColor: 'var(--red)', opacity: 0.25, margin: '0 auto 1.25rem' }} />

      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.54rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--red)', opacity: 0.4, marginBottom: '1.5rem', fontWeight: 400 }}>
        {wedding.dateDisplay}  ·  {wedding.venueCity}
      </p>

      <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(1.1rem, 2.8vw, 1.5rem)', color: 'var(--gold)', opacity: 0.35, marginBottom: '1.75rem' }}>
        {wedding.hashtag}
      </p>

      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.68rem', fontStyle: 'italic', fontWeight: 300, color: 'rgba(240,236,228,0.18)' }}>
        We can't wait to celebrate with you.
      </p>
    </footer>
  );
}

// ── Export ───────────────────────────────────────────────────────────────────
export default function LandingSpider() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}>
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
