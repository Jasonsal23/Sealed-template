import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Monogram from './Monogram';
import wedding from '../data/wedding';

const STORAGE_KEY = 'std_submitted';

const inputStyle = {
  width: '100%',
  padding: '0.75rem 0.25rem',
  backgroundColor: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(182,146,78,0.5)',
  color: 'var(--ink)',
  fontFamily: 'EB Garamond, Georgia, serif',
  fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
  outline: 'none',
  transition: 'border-color 0.25s',
};

const labelStyle = {
  fontFamily: 'EB Garamond, Georgia, serif',
  fontSize: '0.65rem',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--gold)',
  display: 'block',
  marginBottom: '0.25rem',
};

const errorStyle = {
  fontFamily: 'EB Garamond, Georgia, serif',
  fontSize: '0.8rem',
  color: 'var(--wax)',
  marginTop: '0.3rem',
  fontStyle: 'italic',
};

function Field({ label, id, value, onChange, error, ...props }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <label htmlFor={id} style={labelStyle}>{label}</label>
      <input
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          ...inputStyle,
          borderBottomColor: error ? 'var(--wax)' : undefined,
        }}
        {...props}
      />
      {error && <p style={errorStyle} role="alert">{error}</p>}
    </div>
  );
}

function wasSubmitted() {
  try { return localStorage.getItem(STORAGE_KEY) === '1'; } catch { return false; }
}

export default function RsvpForm() {
  const [submitted, setSubmitted] = useState(wasSubmitted);
  const [pending, setPending] = useState(false);
  const [fields, setFields] = useState({ name: '', email: '', street: '', city: '', state: '', zip: '' });
  const [errors, setErrors] = useState({});

  const set = key => val => setFields(f => ({ ...f, [key]: val }));

  const validate = () => {
    const e = {};
    if (!fields.name.trim()) e.name = 'Please enter your name.';
    if (!fields.street.trim()) e.street = 'Please enter a street address.';
    if (!fields.city.trim()) e.city = 'Please enter your city.';
    if (!fields.state.trim()) e.state = 'Please enter your state.';
    if (!fields.zip.trim()) e.zip = 'Please enter your ZIP code.';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setPending(true);
    setTimeout(() => {
      setPending(false);
      setSubmitted(true);
      try { localStorage.setItem(STORAGE_KEY, '1'); } catch {}
    }, 800);
  };

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
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ maxWidth: '500px', margin: '0 auto' }}
          >
            <Monogram size={72} />
            <p
              className="font-display"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontStyle: 'italic', color: 'var(--ink)', margin: '1.5rem 0 0.75rem' }}
            >
              You're on the list.
            </p>
            <p className="font-body" style={{ color: 'var(--ink)', opacity: 0.7, fontSize: '1rem', fontStyle: 'italic', margin: '0 0 1rem' }}>
              Your invitation will arrive by post.
            </p>
            <p className="font-body text-label" style={{ color: 'var(--gold)' }}>{wedding.hashtag}</p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ maxWidth: '480px', margin: '0 auto' }}
          >
            <p className="font-body text-label" style={{ color: 'var(--gold)', marginBottom: '0.75rem' }}>
              Reserve Your Invitation
            </p>
            <p
              className="font-display"
              style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontStyle: 'italic', color: 'var(--ink)', margin: '0 0 0.5rem' }}
            >
              Be the first to receive our formal invitation
            </p>
            <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--gold)', margin: '1rem auto 2rem', opacity: 0.5 }} />

            <div style={{ textAlign: 'left' }}>
              <Field label="Full Name" id="name" value={fields.name} onChange={set('name')} error={errors.name} autoComplete="name" />
              <Field label="Email (Optional)" id="email" value={fields.email} onChange={set('email')} type="email" autoComplete="email" />
              <Field label="Street Address" id="street" value={fields.street} onChange={set('street')} error={errors.street} autoComplete="street-address" />

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.2fr', gap: '1rem' }}>
                <Field label="City" id="city" value={fields.city} onChange={set('city')} error={errors.city} autoComplete="address-level2" />
                <Field label="State" id="state" value={fields.state} onChange={set('state')} error={errors.state} autoComplete="address-level1" />
                <Field label="ZIP" id="zip" value={fields.zip} onChange={set('zip')} error={errors.zip} autoComplete="postal-code" />
              </div>
            </div>

            <motion.button
              onClick={handleSubmit}
              disabled={pending}
              style={{
                marginTop: '1rem',
                padding: '0.85rem 2.5rem',
                backgroundColor: pending ? 'rgba(122,46,58,0.6)' : 'var(--wax)',
                color: 'var(--cream)',
                border: 'none',
                fontFamily: 'EB Garamond, Georgia, serif',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                cursor: pending ? 'default' : 'pointer',
                transition: 'background-color 0.25s',
              }}
              whileHover={!pending ? { backgroundColor: '#9b3a48' } : {}}
              whileFocus={{ outline: '2px solid var(--gold)', outlineOffset: '3px' }}
            >
              {pending ? 'Sending…' : 'Reserve My Spot'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
