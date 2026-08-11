import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import wedding from '../data/wedding.js';

/* ── Shared reveal animation ─────────────────────────────── */
const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.2, 0, 0.1, 1] },
};

/* ── SVG Decorative Components ───────────────────────────── */

function GoldRule() {
  return (
    <div style={{ margin: '0 auto', maxWidth: 280, display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, var(--gold))', opacity: 0.4 }} />
      <svg width="10" height="10" viewBox="0 0 10 10"><polygon points="5,0 10,5 5,10 0,5" fill="var(--gold)" opacity="0.55" /></svg>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, var(--gold), transparent)', opacity: 0.4 }} />
    </div>
  );
}

function FleurDeLis({ size = 22, opacity = 0.45 }) {
  return (
    <svg width={size} height={size * 1.35} viewBox="0 0 24 32" style={{ display: 'inline-block' }}>
      <path d="M12,32 C12,32 6,26 6,20 C6,16 8,14 10,13 C8,11 7,9 7,7 C7,4 9,2 12,2 C15,2 17,4 17,7 C17,9 16,11 14,13 C16,14 18,16 18,20 C18,26 12,32 12,32 Z" fill="none" stroke="var(--gold)" strokeWidth="1" opacity={opacity} />
      <path d="M7,14 C5,13 3,11 3,9 C3,7 5,6 7,7" fill="none" stroke="var(--gold)" strokeWidth="0.8" opacity={opacity} />
      <path d="M17,14 C19,13 21,11 21,9 C21,7 19,6 17,7" fill="none" stroke="var(--gold)" strokeWidth="0.8" opacity={opacity} />
      <line x1="9" y1="26" x2="15" y2="26" stroke="var(--gold)" strokeWidth="0.8" opacity={opacity} />
    </svg>
  );
}

function OrnamentDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '2rem auto', maxWidth: 340 }}>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, var(--gold))', opacity: 0.35 }} />
      <FleurDeLis size={18} opacity={0.5} />
      <svg width="10" height="10" viewBox="0 0 10 10"><polygon points="5,0 10,5 5,10 0,5" fill="var(--gold)" opacity="0.5" /></svg>
      <FleurDeLis size={18} opacity={0.5} />
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, var(--gold), transparent)', opacity: 0.35 }} />
    </div>
  );
}

function GothicArch({ width = 360, height = 90, inner = true }) {
  const hw = width / 2;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block', overflow: 'visible' }}>
      <path d={`M0,${height} L0,${height * 0.38} Q0,0 ${hw},0 Q${width},0 ${width},${height * 0.38} L${width},${height}`} fill="none" stroke="var(--gold)" strokeWidth="1" opacity="0.32" />
      {inner && <path d={`M10,${height} L10,${height * 0.44} Q10,12 ${hw},12 Q${width - 10},12 ${width - 10},${height * 0.44} L${width - 10},${height}`} fill="none" stroke="var(--gold)" strokeWidth="0.6" opacity="0.18" />}
      <polygon points={`${hw - 7},0 ${hw + 7},0 ${hw + 5},20 ${hw - 5},20`} fill="none" stroke="var(--gold)" strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function RoseWindow({ size = 160, opacity = 0.12 }) {
  const spokes = 12;
  const rings = [22, 38, 54, 68];
  const petals = 6;
  const c = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      <g opacity={opacity} stroke="var(--gold)" fill="none">
        {Array.from({ length: spokes }, (_, i) => {
          const a = (i / spokes) * Math.PI * 2;
          return <line key={i} x1={c} y1={c} x2={(c + Math.cos(a) * c * 0.95).toFixed(1)} y2={(c + Math.sin(a) * c * 0.95).toFixed(1)} strokeWidth="0.8" />;
        })}
        {rings.map(r => <circle key={r} cx={c} cy={c} r={r} strokeWidth="0.7" />)}
        {Array.from({ length: petals }, (_, i) => {
          const a = (i / petals) * Math.PI * 2;
          const px = c + Math.cos(a) * 38, py = c + Math.sin(a) * 38;
          return <circle key={i} cx={px.toFixed(1)} cy={py.toFixed(1)} r="14" strokeWidth="0.6" />;
        })}
        <circle cx={c} cy={c} r="10" strokeWidth="1" />
      </g>
    </svg>
  );
}

function LaurelWreath({ width = 180, opacity = 0.35 }) {
  return (
    <svg width={width} height={40} viewBox="0 0 180 40" style={{ display: 'block', margin: '0 auto' }}>
      {/* Left branch */}
      <path d="M90,20 Q70,15 55,8" stroke="var(--gold)" strokeWidth="0.9" fill="none" opacity={opacity} />
      <path d="M80,18 Q72,10 66,5" stroke="var(--gold)" strokeWidth="0.7" fill="none" opacity={opacity * 0.8} />
      <path d="M75,20 Q62,16 50,18" stroke="var(--gold)" strokeWidth="0.7" fill="none" opacity={opacity * 0.8} />
      <path d="M70,22 Q58,24 48,30" stroke="var(--gold)" strokeWidth="0.7" fill="none" opacity={opacity * 0.7} />
      {/* Right branch (mirrored) */}
      <path d="M90,20 Q110,15 125,8" stroke="var(--gold)" strokeWidth="0.9" fill="none" opacity={opacity} />
      <path d="M100,18 Q108,10 114,5" stroke="var(--gold)" strokeWidth="0.7" fill="none" opacity={opacity * 0.8} />
      <path d="M105,20 Q118,16 130,18" stroke="var(--gold)" strokeWidth="0.7" fill="none" opacity={opacity * 0.8} />
      <path d="M110,22 Q122,24 132,30" stroke="var(--gold)" strokeWidth="0.7" fill="none" opacity={opacity * 0.7} />
      {/* Bottom tie */}
      <path d="M82,28 Q90,32 98,28" stroke="var(--gold)" strokeWidth="0.9" fill="none" opacity={opacity} />
    </svg>
  );
}

function ColumnDecor({ height = 120, opacity = 0.3 }) {
  return (
    <svg width={28} height={height} viewBox={`0 0 28 ${height}`} style={{ display: 'block' }}>
      <g stroke="var(--gold)" fill="none" opacity={opacity} strokeWidth="0.8">
        {/* Capital */}
        <rect x="2" y="0" width="24" height="5" rx="1" />
        <path d="M2,5 Q14,10 26,5" />
        {/* Shaft */}
        <rect x="9" y="10" width="10" height={height - 22} rx="1" />
        {/* Fluting lines on shaft */}
        <line x1="12" y1="12" x2="12" y2={height - 13} strokeWidth="0.4" />
        <line x1="16" y1="12" x2="16" y2={height - 13} strokeWidth="0.4" />
        {/* Base */}
        <rect x="4" y={height - 12} width="20" height="4" rx="1" />
        <rect x="0" y={height - 8} width="28" height="8" rx="1" />
      </g>
    </svg>
  );
}

function BotanicalSprig({ side = 'left', opacity = 0.35 }) {
  const flip = side === 'right' ? 'scale(-1,1)' : '';
  return (
    <svg width={70} height={90} viewBox="0 0 70 90" style={{ display: 'block' }}>
      <g stroke="var(--gold)" fill="none" opacity={opacity} strokeWidth="0.9" transform={flip ? `translate(70,0) ${flip}` : ''}>
        <path d="M35,85 Q30,60 25,40 Q20,20 30,5" />
        <path d="M27,65 Q15,58 8,52" />
        <path d="M25,52 Q12,46 5,38" />
        <path d="M26,40 Q14,35 10,26" />
        <path d="M27,28 Q18,22 16,14" />
        <ellipse cx="8" cy="52" rx="6" ry="4" transform="rotate(-30 8 52)" strokeWidth="0.7" />
        <ellipse cx="5" cy="38" rx="6" ry="4" transform="rotate(-20 5 38)" strokeWidth="0.7" />
        <ellipse cx="10" cy="26" rx="5" ry="3.5" transform="rotate(-15 10 26)" strokeWidth="0.7" />
        <ellipse cx="16" cy="14" rx="5" ry="3" transform="rotate(-10 16 14)" strokeWidth="0.7" />
      </g>
    </svg>
  );
}

/* ── Timeline icons ──────────────────────────────────────── */
function TimelineIcon({ type }) {
  const s = { stroke: 'var(--crimson)', fill: 'none', strokeWidth: '1.5', strokeLinecap: 'round', strokeLinejoin: 'round' };
  const icons = {
    arch: (
      <g {...s}>
        <path d="M6,22 L6,10 Q6,3 12,3 Q18,3 18,10 L18,22" />
        <line x1="4" y1="22" x2="20" y2="22" />
      </g>
    ),
    rings: (
      <g {...s}>
        <circle cx="9" cy="12" r="6" />
        <circle cx="15" cy="12" r="6" />
      </g>
    ),
    glass: (
      <g {...s}>
        <path d="M8,4 L16,4 L14,14 Q14,19 12,19 Q10,19 10,14 Z" />
        <line x1="9" y1="19" x2="15" y2="19" />
        <line x1="9" y1="21" x2="15" y2="21" />
      </g>
    ),
    doors: (
      <g {...s}>
        <rect x="4" y="5" width="7" height="17" rx="3.5 3.5 0 0" />
        <rect x="13" y="5" width="7" height="17" rx="3.5 3.5 0 0" />
        <line x1="4" y1="22" x2="20" y2="22" />
      </g>
    ),
    music: (
      <g {...s}>
        <path d="M10,18 L10,6 L19,4 L19,16" />
        <circle cx="8" cy="18" r="3" />
        <circle cx="17" cy="16" r="3" />
      </g>
    ),
    cake: (
      <g {...s}>
        <rect x="6" y="14" width="12" height="8" rx="1" />
        <rect x="8" y="9" width="8" height="5" rx="1" />
        <line x1="12" y1="5" x2="12" y2="9" />
        <line x1="10" y1="6" x2="14" y2="6" />
        <path d="M6,14 Q9,11 12,14 Q15,11 18,14" strokeWidth="1" />
      </g>
    ),
    stars: (
      <g stroke="var(--crimson)" fill="var(--crimson)" opacity="0.7">
        <circle cx="12" cy="12" r="1.5" />
        <circle cx="7" cy="7" r="1" />
        <circle cx="17" cy="7" r="1" />
        <circle cx="6" cy="16" r="1" />
        <circle cx="18" cy="16" r="1" />
        <circle cx="12" cy="5" r="0.8" />
        <circle cx="19" cy="12" r="0.8" />
        <circle cx="5" cy="12" r="0.8" />
      </g>
    ),
  };
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" style={{ display: 'block', flexShrink: 0 }}>
      {icons[type] || icons.stars}
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
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '2rem', color: 'var(--crimson)', textAlign: 'center' }}>
        Today's the day — we're getting married!
      </p>
    );
  }

  const units = [
    { value: time.days, label: 'Days' },
    { value: time.hours, label: 'Hours' },
    { value: time.minutes, label: 'Minutes' },
    { value: time.seconds, label: 'Seconds' },
  ];

  return (
    <div style={{ display: 'flex', gap: 'clamp(1rem, 3vw, 2.5rem)', justifyContent: 'center', flexWrap: 'wrap' }}>
      {units.map(({ value, label }, i) => (
        <div key={label} style={{ textAlign: 'center', minWidth: 80 }}>
          {/* Gothic arch top */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: -2 }}>
            <svg width="90" height="24" viewBox="0 0 90 24">
              <path d="M0,24 L0,10 Q0,0 45,0 Q90,0 90,10 L90,24" fill="none" stroke="var(--gold)" strokeWidth="0.8" opacity="0.4" />
            </svg>
          </div>
          <div style={{
            border: '1px solid rgba(181,136,58,0.35)',
            padding: '1rem 1.4rem',
            background: 'var(--parchment)',
            position: 'relative',
          }}>
            {/* Corner marks */}
            {[[-1,-1],[1,-1],[1,1],[-1,1]].map(([sx,sy], ci) => (
              <div key={ci} style={{
                position: 'absolute',
                width: 8, height: 8,
                top: sx < 0 ? 3 : 'auto',
                bottom: sy > 0 ? 3 : 'auto',
                left: sx < 0 ? 3 : 'auto',
                right: sy > 0 ? 3 : 'auto',
                borderTop: ci < 2 ? '1px solid rgba(181,136,58,0.5)' : 'none',
                borderBottom: ci >= 2 ? '1px solid rgba(181,136,58,0.5)' : 'none',
                borderLeft: ci === 0 || ci === 3 ? '1px solid rgba(181,136,58,0.5)' : 'none',
                borderRight: ci === 1 || ci === 2 ? '1px solid rgba(181,136,58,0.5)' : 'none',
              }} />
            ))}
            <div style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2.4rem, 6vw, 3.8rem)',
              fontWeight: 300,
              color: 'var(--ink)',
              lineHeight: 1,
              minWidth: '2ch',
              letterSpacing: '-0.02em',
            }}>
              {String(value).padStart(2, '0')}
            </div>
          </div>
          <div style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '0.52rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--crimson)',
            marginTop: '0.6rem',
          }}>
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── RSVP Form ───────────────────────────────────────────── */
function RsvpForm() {
  const STORAGE_KEY = 'cathedral_submitted_v8';
  const [submitted, setSubmitted] = useState(() => !!localStorage.getItem(STORAGE_KEY));
  const [pending, setPending] = useState(false);
  const [fields, setFields] = useState({ name: '', email: '', street: '', city: '', state: '', zip: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!fields.name.trim()) e.name = 'Your name is required.';
    if (!fields.street.trim()) e.street = 'Street address is required.';
    if (!fields.city.trim()) e.city = 'City is required.';
    if (!fields.state.trim()) e.state = 'State is required.';
    if (!fields.zip.trim()) e.zip = 'ZIP code is required.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setPending(true);
    setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, '1');
      setSubmitted(true);
      setPending(false);
    }, 850);
  };

  const set = (k) => (ev) => {
    setFields(f => ({ ...f, [k]: ev.target.value }));
    setErrors(er => ({ ...er, [k]: undefined }));
  };

  const inputStyle = (err) => ({
    width: '100%',
    background: 'var(--parchment)',
    border: 'none',
    borderBottom: `1px solid ${err ? 'var(--crimson)' : 'rgba(181,136,58,0.45)'}`,
    padding: '0.6rem 0.2rem',
    fontFamily: "'EB Garamond', serif",
    fontSize: '1rem',
    color: 'var(--ink)',
    outline: 'none',
  });

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', padding: '3rem 2rem' }}>
        <svg viewBox="0 0 80 80" width="64" height="64" style={{ margin: '0 auto 1.5rem' }}>
          <defs><radialGradient id="sg2" cx="40%" cy="35%" r="60%"><stop offset="0%" stopColor="#a02a3a" /><stop offset="100%" stopColor="#5c1220" /></radialGradient></defs>
          <path d="M40,4 C55,4 76,18 76,38 C76,56 62,76 40,76 C18,76 4,57 4,38 C4,19 25,4 40,4 Z" fill="url(#sg2)" />
          {Array.from({ length: 6 }, (_, i) => {
            const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
            const x = 40 + Math.cos(a) * 14, y = 39 + Math.sin(a) * 14;
            return <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r="7" fill="none" stroke="rgba(255,210,140,0.3)" strokeWidth="0.9" />;
          })}
          <text x="40" y="35" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="7" fill="rgba(255,220,150,0.85)" letterSpacing="1">I &amp; M</text>
        </svg>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.4rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>
          You're on the list.
        </p>
        <p style={{ fontFamily: "'EB Garamond', serif", color: 'var(--ink-mid)', lineHeight: 1.7 }}>
          Your invitation will arrive by post.<br />We can't wait to celebrate with you.
        </p>
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--gold)', marginTop: '1.2rem', textTransform: 'uppercase' }}>
          {wedding.hashtag}
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ maxWidth: 520, margin: '0 auto' }}>
      <div style={{ display: 'grid', gap: '1.8rem' }}>
        {[
          { k: 'name', label: 'Full Name', type: 'text', col: '1/-1' },
          { k: 'email', label: 'Email Address (optional)', type: 'email', col: '1/-1' },
          { k: 'street', label: 'Street Address', type: 'text', col: '1/-1' },
          { k: 'city', label: 'City', type: 'text', col: '1/2' },
          { k: 'state', label: 'State', type: 'text', col: '2/3' },
          { k: 'zip', label: 'ZIP Code', type: 'text', col: '1/2' },
        ].map(({ k, label, type, col }) => (
          <div key={k} style={{ gridColumn: col, position: 'relative' }}>
            <label style={{
              display: 'block',
              fontFamily: "'Cinzel', serif",
              fontSize: '0.55rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: errors[k] ? 'var(--crimson)' : 'var(--ink-mid)',
              marginBottom: '0.4rem',
            }}>{label}</label>
            <input
              type={type}
              value={fields[k]}
              onChange={set(k)}
              style={inputStyle(errors[k])}
            />
            {errors[k] && (
              <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--crimson)', marginTop: '0.25rem' }}>
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
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--stone)',
            background: pending ? 'var(--ink-mid)' : 'var(--crimson)',
            border: 'none',
            padding: '1rem 2.4rem',
            cursor: pending ? 'default' : 'pointer',
            transition: 'background 0.3s',
          }}
        >
          {pending ? 'Sending…' : 'Reserve My Place'}
        </button>
      </div>
    </form>
  );
}

/* ── SECTION: Hero ───────────────────────────────────────── */
function Hero() {
  return (
    <section style={{ position: 'relative', minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {/* Hero image */}
      <img
        src={wedding.heroImage}
        alt="Wedding venue"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
      />
      {/* Scrim */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(44,36,24,0.55) 0%, rgba(44,36,24,0.35) 40%, rgba(44,36,24,0.75) 100%)' }} />

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '4rem clamp(1.5rem, 5vw, 4rem)' }}>

        {/* Gothic arch frame top */}
        <motion.div {...reveal} style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <svg width="340" height="80" viewBox="0 0 340 80" style={{ maxWidth: '90vw' }}>
            <path d="M0,80 L0,30 Q0,0 170,0 Q340,0 340,30 L340,80" fill="none" stroke="rgba(213,168,78,0.5)" strokeWidth="1.2" />
            <path d="M14,80 L14,36 Q14,14 170,14 Q326,14 326,36 L326,80" fill="none" stroke="rgba(213,168,78,0.28)" strokeWidth="0.7" />
            <polygon points="163,0 177,0 174,22 166,22" fill="none" stroke="rgba(213,168,78,0.45)" strokeWidth="0.9" />
          </svg>
        </motion.div>

        {/* "Save the Date" script */}
        <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(1.3rem, 4vw, 2rem)',
          color: 'rgba(213,168,78,0.9)',
          letterSpacing: '0.08em',
          marginBottom: '0.8rem',
        }}>
          Save the Date
        </motion.p>

        {/* Couple names — the showstopper */}
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.15 }} style={{ position: 'relative', display: 'inline-block' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(0.5rem, 2vw, 1.2rem)', flexWrap: 'wrap' }}>
            <ColumnDecor height={90} opacity={0.35} />
            <div>
              <h1 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(3rem, 10vw, 7rem)',
                fontWeight: 300,
                color: '#f5ead4',
                lineHeight: 1.05,
                letterSpacing: '0.02em',
                textShadow: '0 2px 20px rgba(0,0,0,0.3)',
              }}>
                {wedding.partnerA}
                <span style={{ color: 'rgba(213,168,78,0.85)', fontStyle: 'italic', margin: '0 0.25em' }}>&amp;</span>
                {wedding.partnerB}
              </h1>
            </div>
            <ColumnDecor height={90} opacity={0.35} />
          </div>
        </motion.div>

        {/* Gold rule */}
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.2 }} style={{ margin: '1.2rem auto', maxWidth: 300 }}>
          <svg viewBox="0 0 300 12" width="300" style={{ maxWidth: '80vw', display: 'block', margin: '0 auto' }}>
            <line x1="0" y1="6" x2="128" y2="6" stroke="rgba(213,168,78,0.5)" strokeWidth="0.8" />
            <polygon points="150,1 156,6 150,11 144,6" fill="rgba(213,168,78,0.6)" />
            <line x1="172" y1="6" x2="300" y2="6" stroke="rgba(213,168,78,0.5)" strokeWidth="0.8" />
          </svg>
        </motion.div>

        <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.25 }} style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 'clamp(0.6rem, 1.8vw, 0.85rem)',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'rgba(245,234,212,0.75)',
          marginBottom: '0.5rem',
        }}>
          {wedding.dateDisplay}
        </motion.p>
        <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.3 }} style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: 'clamp(0.9rem, 2.5vw, 1.15rem)',
          color: 'rgba(245,234,212,0.65)',
          letterSpacing: '0.04em',
        }}>
          {wedding.venueName} · {wedding.venueCity}
        </motion.p>

        {/* Bottom arch */}
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.35 }} style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
          <svg width="340" height="50" viewBox="0 0 340 50">
            <path d="M0,0 L0,20 Q0,50 170,50 Q340,50 340,20 L340,0" fill="none" stroke="rgba(213,168,78,0.4)" strokeWidth="1" />
          </svg>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
        >
          <div style={{ width: 1, height: 30, background: 'rgba(213,168,78,0.4)' }} />
          <svg width="12" height="8" viewBox="0 0 12 8"><path d="M1,1 L6,7 L11,1" stroke="rgba(213,168,78,0.5)" strokeWidth="1" fill="none" /></svg>
        </motion.div>
      </div>
    </section>
  );
}

/* ── SECTION: Countdown ──────────────────────────────────── */
function CountdownSection() {
  return (
    <section className="section-pad" style={{ background: 'var(--stone)', textAlign: 'center' }}>
      <div className="container">
        <motion.div {...reveal} style={{ marginBottom: '0.8rem', display: 'flex', justifyContent: 'center' }}>
          <RoseWindow size={100} opacity={0.14} />
        </motion.div>
        <motion.p {...reveal} style={{ fontFamily: "'Cinzel', serif", fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--crimson)', marginBottom: '0.6rem' }}>
          Until We Say I Do
        </motion.p>
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.1 }}>
          <Countdown />
        </motion.div>
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.15 }} style={{ marginTop: '2rem' }}>
          <LaurelWreath width={160} opacity={0.3} />
        </motion.div>
      </div>
    </section>
  );
}

/* ── SECTION: Details ────────────────────────────────────── */
function Details() {
  const cols = [
    {
      heading: 'When',
      lines: [wedding.dateDisplay, wedding.yearDisplay],
      sub: 'Ceremony at Half Past Three',
    },
    {
      heading: 'Where',
      lines: [wedding.venueName, wedding.venueAddress],
      sub: wedding.venueCity,
    },
    {
      heading: 'To Follow',
      lines: [wedding.formalNote],
      sub: 'Black Tie Optional',
    },
  ];

  return (
    <section className="section-pad" style={{ background: 'var(--parchment)', textAlign: 'center' }}>
      <div className="container">
        <motion.div {...reveal} style={{ marginBottom: '2rem' }}>
          <GothicArch width={300} height={60} />
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'clamp(2rem, 4vw, 0)',
          position: 'relative',
        }}>
          {cols.map((col, i) => (
            <motion.div key={col.heading} {...reveal} transition={{ ...reveal.transition, delay: i * 0.1 }}
              style={{
                padding: '2rem',
                borderLeft: i > 0 ? '1px solid rgba(181,136,58,0.2)' : 'none',
                position: 'relative',
              }}>
              {/* Fleur de lis at top of each column */}
              <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                <FleurDeLis size={20} opacity={0.45} />
              </div>
              <p className="text-label" style={{ color: 'var(--crimson)', marginBottom: '0.8rem' }}>{col.heading}</p>
              {col.lines.map(line => (
                <p key={line} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: 'var(--ink)', lineHeight: 1.5 }}>
                  {line}
                </p>
              ))}
              <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--ink-mid)', marginTop: '0.6rem' }}>
                {col.sub}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div {...reveal} style={{ marginTop: '2.5rem' }}>
          <GoldRule />
        </motion.div>
      </div>
    </section>
  );
}

/* ── SECTION: Timeline ───────────────────────────────────── */
function Timeline() {
  return (
    <section className="section-pad" style={{ background: 'var(--stone)' }}>
      <div className="container">
        <motion.div {...reveal} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p className="text-label" style={{ color: 'var(--crimson)', marginBottom: '0.6rem' }}>The Day Unfolds</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--ink)',
            lineHeight: 1.2,
          }}>
            A Day in Florence
          </h2>
          <div style={{ margin: '1rem auto' }}><GoldRule /></div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
            <BotanicalSprig side="left" opacity={0.3} />
            <BotanicalSprig side="right" opacity={0.3} />
          </div>
        </motion.div>

        {/* Vertical timeline */}
        <div style={{ position: 'relative', maxWidth: 640, margin: '0 auto' }}>
          {/* Center line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: 1,
            background: 'linear-gradient(to bottom, transparent, rgba(181,136,58,0.4) 10%, rgba(181,136,58,0.4) 90%, transparent)',
            transform: 'translateX(-50%)',
          }} />

          {wedding.timeline.map((event, i) => {
            const isRight = i % 2 === 0;
            return (
              <motion.div
                key={event.time}
                {...reveal}
                transition={{ ...reveal.transition, delay: i * 0.08 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 40px 1fr',
                  alignItems: 'center',
                  marginBottom: '2.8rem',
                  gap: 0,
                }}
              >
                {/* Left side */}
                <div style={{ textAlign: 'right', paddingRight: '1.5rem' }}>
                  {isRight ? (
                    <>
                      <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.3rem' }}>
                        {event.time}
                      </p>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: 'var(--ink)', fontWeight: 500 }}>
                        {event.label}
                      </p>
                      <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--ink-mid)', lineHeight: 1.5 }}>
                        {event.note}
                      </p>
                    </>
                  ) : null}
                </div>

                {/* Center node */}
                <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                  <div style={{
                    width: 40, height: 40,
                    background: 'var(--parchment)',
                    border: '1px solid rgba(181,136,58,0.45)',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                    flexShrink: 0,
                  }}>
                    <TimelineIcon type={event.icon} />
                  </div>
                </div>

                {/* Right side */}
                <div style={{ paddingLeft: '1.5rem' }}>
                  {!isRight ? (
                    <>
                      <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.3rem' }}>
                        {event.time}
                      </p>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: 'var(--ink)', fontWeight: 500 }}>
                        {event.label}
                      </p>
                      <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--ink-mid)', lineHeight: 1.5 }}>
                        {event.note}
                      </p>
                    </>
                  ) : null}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── SECTION: Story ──────────────────────────────────────── */
function Story() {
  return (
    <section className="section-pad" style={{ background: 'var(--parchment)', textAlign: 'center' }}>
      <div className="container">
        <motion.div {...reveal} style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: '1.5rem' }}>
          <BotanicalSprig side="left" opacity={0.35} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <RoseWindow size={70} opacity={0.18} />
          </div>
          <BotanicalSprig side="right" opacity={0.35} />
        </motion.div>

        <motion.p {...reveal} className="text-label" style={{ color: 'var(--crimson)', marginBottom: '0.6rem' }}>
          Our Story
        </motion.p>
        <motion.h2 {...reveal} transition={{ ...reveal.transition, delay: 0.05 }} style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
          color: 'var(--ink)',
          marginBottom: '1.5rem',
        }}>
          A Wrong Turn in Rome
        </motion.h2>

        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} style={{ margin: '0 auto 1.5rem' }}>
          <LaurelWreath width={140} opacity={0.32} />
        </motion.div>

        <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.15 }} style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
          color: 'var(--ink-mid)',
          lineHeight: 1.85,
          maxWidth: '58ch',
          margin: '0 auto',
        }}>
          {wedding.story}
        </motion.p>
      </div>
    </section>
  );
}

/* ── Baroque ornate gold frame ───────────────────────────── */

function OrnateFrame({ src, alt }) {
  // Total SVG canvas: 800 x 560
  // Photo area: x=96, y=76, w=608, h=408
  const W = 800, H = 560;
  const FL = 96, FT = 76;
  const PW = W - FL * 2;   // 608
  const PH = H - FT * 2;   // 408

  // Corner rosette centers
  const corners = [
    [FL / 2, FT / 2],
    [FL + PW + FL / 2, FT / 2],
    [FL / 2, FT + PH + FT / 2],
    [FL + PW + FL / 2, FT + PH + FT / 2],
  ];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ display: 'block', filter: 'drop-shadow(0 16px 56px rgba(44,36,24,0.38)) drop-shadow(0 4px 12px rgba(44,36,24,0.18))' }}
      aria-label={alt}
    >
      <defs>
        {/* Molding profile gradients — simulate curved cross-section */}
        <linearGradient id="gL" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%"   stopColor="#1e1005" />
          <stop offset="12%"  stopColor="#6b4a14" />
          <stop offset="28%"  stopColor="#c9a84c" />
          <stop offset="46%"  stopColor="#f0d880" />
          <stop offset="58%"  stopColor="#ffe9a0" />
          <stop offset="72%"  stopColor="#c9a84c" />
          <stop offset="86%"  stopColor="#7a5612" />
          <stop offset="100%" stopColor="#2c1a05" />
        </linearGradient>
        <linearGradient id="gR" x1="1" x2="0" y1="0" y2="0">
          <stop offset="0%"   stopColor="#1e1005" />
          <stop offset="12%"  stopColor="#6b4a14" />
          <stop offset="28%"  stopColor="#c9a84c" />
          <stop offset="46%"  stopColor="#f0d880" />
          <stop offset="58%"  stopColor="#ffe9a0" />
          <stop offset="72%"  stopColor="#c9a84c" />
          <stop offset="86%"  stopColor="#7a5612" />
          <stop offset="100%" stopColor="#2c1a05" />
        </linearGradient>
        <linearGradient id="gT" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%"   stopColor="#1e1005" />
          <stop offset="12%"  stopColor="#6b4a14" />
          <stop offset="28%"  stopColor="#c9a84c" />
          <stop offset="46%"  stopColor="#f0d880" />
          <stop offset="58%"  stopColor="#ffe9a0" />
          <stop offset="72%"  stopColor="#c9a84c" />
          <stop offset="86%"  stopColor="#7a5612" />
          <stop offset="100%" stopColor="#2c1a05" />
        </linearGradient>
        <linearGradient id="gB" x1="0" x2="0" y1="1" y2="0">
          <stop offset="0%"   stopColor="#1e1005" />
          <stop offset="12%"  stopColor="#6b4a14" />
          <stop offset="28%"  stopColor="#c9a84c" />
          <stop offset="46%"  stopColor="#f0d880" />
          <stop offset="58%"  stopColor="#ffe9a0" />
          <stop offset="72%"  stopColor="#c9a84c" />
          <stop offset="86%"  stopColor="#7a5612" />
          <stop offset="100%" stopColor="#2c1a05" />
        </linearGradient>
        <radialGradient id="gCorner" cx="0.5" cy="0.5" r="0.55">
          <stop offset="0%"   stopColor="#ffe9a0" />
          <stop offset="35%"  stopColor="#e8c96a" />
          <stop offset="65%"  stopColor="#b5883a" />
          <stop offset="100%" stopColor="#2c1a05" />
        </radialGradient>
      </defs>

      {/* Photo */}
      <image href={src} x={FL} y={FT} width={PW} height={PH} preserveAspectRatio="xMidYMid slice" />

      {/* Frame trapezoid sides — drawn on top of photo */}
      <polygon points={`0,0 ${FL},${FT} ${FL},${FT + PH} 0,${H}`} fill="url(#gL)" />
      <polygon points={`${W},0 ${FL + PW},${FT} ${FL + PW},${FT + PH} ${W},${H}`} fill="url(#gR)" />
      <polygon points={`0,0 ${W},0 ${FL + PW},${FT} ${FL},${FT}`} fill="url(#gT)" />
      <polygon points={`0,${H} ${W},${H} ${FL + PW},${FT + PH} ${FL},${FT + PH}`} fill="url(#gB)" />

      {/* Corner blocks (square fills, radial gradient) */}
      {corners.map(([cx, cy], i) => (
        <rect key={i}
          x={i % 2 === 0 ? 0 : FL + PW} y={i < 2 ? 0 : FT + PH}
          width={FL} height={FT}
          fill="url(#gCorner)"
        />
      ))}

      {/* Corner rosette ornaments */}
      {corners.map(([cx, cy], i) => (
        <g key={`r${i}`}>
          {/* Outer ring */}
          <circle cx={cx} cy={cy} r="30" fill="#7a5210" />
          <circle cx={cx} cy={cy} r="26" fill="#c9a84c" />
          <circle cx={cx} cy={cy} r="21" fill="#e8c96a" />
          <circle cx={cx} cy={cy} r="15" fill="#f5dfa0" />
          {/* 8-point petal rays */}
          {Array.from({ length: 8 }, (_, j) => {
            const a = (j / 8) * Math.PI * 2;
            return (
              <line key={j}
                x1={(cx + Math.cos(a) * 7).toFixed(1)} y1={(cy + Math.sin(a) * 7).toFixed(1)}
                x2={(cx + Math.cos(a) * 21).toFixed(1)} y2={(cy + Math.sin(a) * 21).toFixed(1)}
                stroke="#8a6018" strokeWidth="2.2"
              />
            );
          })}
          {/* Center jewel */}
          <circle cx={cx} cy={cy} r="7" fill="#8a6018" />
          <circle cx={cx} cy={cy} r="4.5" fill="#e8c96a" />
          <circle cx={cx} cy={cy} r="2.5" fill="#4a2c08" />
        </g>
      ))}

      {/* Molding detail lines on frame sides */}
      {[14, 28, 46].map((off, i) => (
        <g key={i} stroke="rgba(255,230,140,0.18)" strokeWidth="0.7" fill="none">
          <line x1={off} y1={off * FT / FL} x2={off} y2={H - off * FT / FL} />
          <line x1={W - off} y1={off * FT / FL} x2={W - off} y2={H - off * FT / FL} />
          <line x1={off * FL / FT} y1={off} x2={W - off * FL / FT} y2={off} />
          <line x1={off * FL / FT} y1={H - off} x2={W - off * FL / FT} y2={H - off} />
        </g>
      ))}

      {/* Outer frame edge */}
      <rect x="2" y="2" width={W - 4} height={H - 4} fill="none" stroke="#0e0804" strokeWidth="3.5" />
      <rect x="6" y="6" width={W - 12} height={H - 12} fill="none" stroke="rgba(255,230,140,0.28)" strokeWidth="1" />

      {/* Inner frame shadow at photo opening */}
      <rect x={FL} y={FT} width={PW} height={PH} fill="none" stroke="#1a0e02" strokeWidth="5" />
      <rect x={FL + 3} y={FT + 3} width={PW - 6} height={PH - 6} fill="none" stroke="rgba(255,215,120,0.2)" strokeWidth="1.5" />

      {/* Top center cartouche */}
      <g transform={`translate(${W / 2}, ${FT / 2})`}>
        <ellipse cx="0" cy="0" rx="68" ry="28" fill="#5a3c0a" />
        <ellipse cx="0" cy="0" rx="62" ry="22" fill="#c9a84c" />
        <ellipse cx="0" cy="0" rx="56" ry="16" fill="#e8c96a" />
        {/* Scroll wings */}
        <path d="M-62,0 Q-76,-10 -70,14 Q-76,26 -62,22" fill="none" stroke="#5a3c0a" strokeWidth="2.8" strokeLinecap="round" />
        <path d="M62,0 Q76,-10 70,14 Q76,26 62,22" fill="none" stroke="#5a3c0a" strokeWidth="2.8" strokeLinecap="round" />
        <text x="0" y="5" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="14" fontWeight="700" fill="#2c1a05" letterSpacing="4">I &amp; M</text>
      </g>

      {/* Bottom center plaque */}
      <g transform={`translate(${W / 2}, ${FT + PH + FT / 2})`}>
        <rect x="-115" y="-18" width="230" height="36" rx="3" fill="#5a3c0a" />
        <rect x="-109" y="-12" width="218" height="24" rx="2" fill="#c9a84c" />
        <rect x="-104" y="-7" width="208" height="14" rx="1" fill="#e8c96a" />
        <text x="0" y="4.5" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="10" fontWeight="600" fill="#2c1a05" letterSpacing="2">Isabella &amp; Matteo</text>
      </g>

      {/* Side center ornaments */}
      {[[FL / 2, H / 2], [FL + PW + FL / 2, H / 2]].map(([cx, cy], i) => (
        <g key={`s${i}`}>
          <ellipse cx={cx} cy={cy} rx="10" ry="36" fill="#7a5210" opacity="0.6" />
          <ellipse cx={cx} cy={cy} rx="6" ry="28" fill="#c9a84c" opacity="0.5" />
          <circle cx={cx} cy={cy} r="7" fill="#c9a84c" />
          <circle cx={cx} cy={cy} r="4.5" fill="#e8c96a" />
          <circle cx={cx} cy={cy} r="2" fill="#4a2c08" />
          <line x1={cx} y1={cy - 28} x2={cx} y2={cy - 10} stroke="rgba(255,220,120,0.35)" strokeWidth="1.2" />
          <line x1={cx} y1={cy + 10} x2={cx} y2={cy + 28} stroke="rgba(255,220,120,0.35)" strokeWidth="1.2" />
        </g>
      ))}
    </svg>
  );
}

/* ── SECTION: Gallery ────────────────────────────────────── */
function Gallery() {
  return (
    <section className="section-pad" style={{ background: 'var(--stone)' }}>
      <div className="container">
        <motion.div {...reveal} style={{ textAlign: 'center', marginBottom: '2.8rem' }}>
          <p className="text-label" style={{ color: 'var(--crimson)', marginBottom: '0.5rem' }}>A Portrait</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic', fontWeight: 300,
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            color: 'var(--ink)', marginBottom: '0.5rem',
          }}>
            Villa di Bellariva, Florence
          </h2>
          <GoldRule />
        </motion.div>

        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.1 }}
          style={{ maxWidth: 780, margin: '0 auto' }}>
          <OrnateFrame
            src={wedding.gallery[1]}
            alt="Isabella and Matteo at Villa di Bellariva"
          />
        </motion.div>

        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.2 }}
          style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic', fontSize: '1.05rem',
            color: 'var(--ink-mid)', letterSpacing: '0.04em',
          }}>
            June 2027 · Tuscany
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ── SECTION: RSVP ───────────────────────────────────────── */
function RsvpSection() {
  return (
    <section className="section-pad" style={{ background: 'var(--parchment)', textAlign: 'center' }}>
      <div className="container">
        <motion.div {...reveal} style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <GothicArch width={260} height={55} />
        </motion.div>
        <motion.p {...reveal} className="text-label" style={{ color: 'var(--crimson)', marginBottom: '0.6rem' }}>
          Be the First to Receive Our Invitation
        </motion.p>
        <motion.h2 {...reveal} transition={{ ...reveal.transition, delay: 0.05 }} style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
          color: 'var(--ink)',
          marginBottom: '0.6rem',
        }}>
          Reserve Your Place by Post
        </motion.h2>
        <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} style={{
          fontFamily: "'EB Garamond', serif",
          fontStyle: 'italic',
          fontSize: '1rem',
          color: 'var(--ink-mid)',
          marginBottom: '2.5rem',
          maxWidth: '44ch',
          margin: '0 auto 2.5rem',
        }}>
          Share your mailing address and you'll be among the first to receive our formal invitation.
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
    <footer style={{ background: 'var(--ink)', color: 'var(--parchment)', padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 3rem)', textAlign: 'center' }}>
      <div className="container">
        {/* Rose window */}
        <motion.div {...reveal} style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <svg viewBox="0 0 160 160" width="100" height="100">
            <g opacity="0.25" stroke="var(--gold)" fill="none">
              {Array.from({ length: 12 }, (_, i) => {
                const a = (i / 12) * Math.PI * 2;
                return <line key={i} x1="80" y1="80" x2={(80 + Math.cos(a) * 72).toFixed(1)} y2={(80 + Math.sin(a) * 72).toFixed(1)} strokeWidth="0.8" />;
              })}
              {[22, 38, 55, 68, 76].map(r => <circle key={r} cx="80" cy="80" r={r} strokeWidth="0.7" />)}
              {Array.from({ length: 6 }, (_, i) => {
                const a = (i / 6) * Math.PI * 2;
                const px = 80 + Math.cos(a) * 38, py = 80 + Math.sin(a) * 38;
                return <circle key={i} cx={px.toFixed(1)} cy={py.toFixed(1)} r="14" strokeWidth="0.6" />;
              })}
            </g>
          </svg>
        </motion.div>

        <motion.p {...reveal} style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
          color: 'rgba(245,234,212,0.9)',
          letterSpacing: '0.04em',
          marginBottom: '0.8rem',
        }}>
          Isabella &amp; Matteo
        </motion.p>

        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.05 }} style={{ margin: '0 auto 1rem', maxWidth: 200 }}>
          <svg viewBox="0 0 200 12" width="200" style={{ display: 'block', margin: '0 auto' }}>
            <line x1="0" y1="6" x2="82" y2="6" stroke="rgba(181,136,58,0.45)" strokeWidth="0.8" />
            <polygon points="100,2 106,6 100,10 94,6" fill="rgba(181,136,58,0.5)" />
            <line x1="118" y1="6" x2="200" y2="6" stroke="rgba(181,136,58,0.45)" strokeWidth="0.8" />
          </svg>
        </motion.div>

        <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} style={{
          fontFamily: "'Cinzel', serif",
          fontSize: '0.55rem',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'rgba(181,136,58,0.7)',
          marginBottom: '0.5rem',
        }}>
          Florence, Italy · June 12, 2027
        </motion.p>

        <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.15 }} style={{
          fontFamily: "'EB Garamond', serif",
          fontStyle: 'italic',
          fontSize: '1rem',
          color: 'rgba(245,234,212,0.5)',
          marginBottom: '1.5rem',
        }}>
          We can't wait to celebrate with you beneath the Tuscan sky.
        </motion.p>

        <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.2 }} style={{
          fontFamily: "'Cinzel', serif",
          fontSize: '0.6rem',
          letterSpacing: '0.25em',
          color: 'rgba(181,136,58,0.6)',
          textTransform: 'uppercase',
        }}>
          {wedding.hashtag}
        </motion.p>
      </div>
    </footer>
  );
}

/* ── Main Landing ────────────────────────────────────────── */
export default function LandingCathedral() {
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <motion.div
      key="landing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <span ref={headingRef} tabIndex={-1} className="sr-only">Save the Date — Isabella and Matteo</span>
      <Hero />
      <CountdownSection />
      <OrnamentDivider />
      <Details />
      <Timeline />
      <Story />
      <Gallery />
      <RsvpSection />
      <Footer />
    </motion.div>
  );
}
