import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHead } from './Story';
import wedding from '../data/wedding';

const STORAGE_KEY = 'std_submitted_v5';

const INPUT_STYLE = {
  width: '100%',
  padding: '0.75rem 0',
  background: 'none',
  border: 'none',
  borderBottom: '1px solid rgba(160,120,64,0.35)',
  fontFamily: "'Jost', sans-serif",
  fontSize: '0.95rem',
  color: 'var(--mocha)',
  fontWeight: 300,
  outline: 'none',
  transition: 'border-color 0.2s',
};

const SELECT_STYLE = {
  ...INPUT_STYLE,
  cursor: 'pointer',
  appearance: 'none',
  WebkitAppearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23a07840' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 0.25rem center',
  paddingRight: '1.5rem',
};

function Label({ children }) {
  return (
    <p className="text-label" style={{ color: 'var(--gold)', fontSize: '0.52rem', marginBottom: '0.5rem' }}>
      {children}
    </p>
  );
}

function FieldError({ msg }) {
  if (!msg) return null;
  return <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', color: '#b84040', marginTop: '0.35rem', fontWeight: 400 }}>{msg}</p>;
}

function GuestRow({ index, guest, onChange, mealChoices }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem', paddingTop: '1rem', borderTop: index === 0 ? 'none' : '1px solid rgba(160,120,64,0.1)' }}>
      <div>
        <Label>Guest {index + 1} Name</Label>
        <input
          style={INPUT_STYLE}
          value={guest.name}
          onChange={e => onChange(index, 'name', e.target.value)}
          placeholder="Full name"
        />
      </div>
      <div>
        <Label>Meal Preference</Label>
        <select
          style={SELECT_STYLE}
          value={guest.meal}
          onChange={e => onChange(index, 'meal', e.target.value)}
        >
          <option value="">Select a meal</option>
          {mealChoices.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>
    </div>
  );
}

function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      style={{ textAlign: 'center', padding: 'clamp(2rem, 5vw, 4rem) 0' }}
    >
      {/* Monogram crest */}
      <svg viewBox="0 0 80 80" width="72" height="72" style={{ display: 'block', margin: '0 auto 1.5rem' }} aria-hidden="true">
        <circle cx="40" cy="40" r="36" fill="none" stroke="var(--gold)" strokeWidth="0.8" opacity="0.5" />
        <circle cx="40" cy="40" r="31" fill="none" stroke="var(--gold)" strokeWidth="0.25" opacity="0.3" />
        <text x="40" y="47" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="16" fontWeight="400" fontStyle="italic" fill="var(--gold)" opacity="0.85">
          {wedding.partnerA[0]} &amp; {wedding.partnerB[0]}
        </text>
      </svg>

      <h3 className="font-display" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontStyle: 'italic', fontWeight: 300, color: 'var(--mocha)', marginBottom: '0.75rem' }}>
        You're on the list.
      </h3>
      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 'clamp(0.9rem, 1.8vw, 1rem)', color: 'var(--mocha-mid)', fontWeight: 300, lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
        We've noted your RSVP. We can't wait to celebrate with you at Villa San Juliette.
      </p>
      <p className="font-script" style={{ fontSize: 'clamp(1.3rem, 3vw, 1.7rem)', color: 'var(--gold)', opacity: 0.7 }}>
        {wedding.hashtag}
      </p>
    </motion.div>
  );
}

export default function Rsvp() {
  const [submitted, setSubmitted] = useState(() => {
    try { return !!localStorage.getItem(STORAGE_KEY); } catch { return false; }
  });
  const [attending, setAttending] = useState(null);
  const [guestCount, setGuestCount] = useState(1);
  const [guests, setGuests] = useState([{ name: '', meal: '' }]);
  const [dietary, setDietary] = useState('');
  const [song, setSong] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const count = Math.max(1, Math.min(4, guestCount));
    setGuests(prev => {
      const next = Array.from({ length: count }, (_, i) => prev[i] || { name: '', meal: '' });
      return next;
    });
  }, [guestCount]);

  function updateGuest(index, field, value) {
    setGuests(prev => prev.map((g, i) => i === index ? { ...g, [field]: value } : g));
  }

  function validate() {
    const errs = {};
    if (attending === null) errs.attending = 'Please let us know if you can attend.';
    if (attending === true) {
      guests.forEach((g, i) => {
        if (!g.name.trim()) errs[`guest_${i}_name`] = 'Please enter a name.';
        if (!g.meal) errs[`guest_${i}_meal`] = 'Please select a meal.';
      });
    }
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
    }, 800);
  }

  if (submitted) {
    return (
      <section id="rsvp" style={{ backgroundColor: 'var(--champagne)' }}>
        <div className="section-pad container">
          <SuccessState />
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" style={{ backgroundColor: 'var(--champagne)' }}>
      <div className="section-pad container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }}>
          <SectionHead eyebrow="June 5, 2027" title="RSVP" />
        </motion.div>

        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display"
            style={{ fontSize: 'clamp(1rem, 2.2vw, 1.2rem)', fontStyle: 'italic', fontWeight: 400, color: 'var(--mocha-mid)', textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.7, opacity: 0.75 }}
          >
            Kindly reply by {wedding.rsvpDeadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Attending Y/N */}
            <div style={{ marginBottom: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
              <Label>Will you be joining us?</Label>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                {[true, false].map(val => (
                  <button
                    key={String(val)}
                    onClick={() => { setAttending(val); setErrors(e => ({ ...e, attending: null })); }}
                    style={{
                      padding: '0.65rem 2rem',
                      border: `1px solid ${attending === val ? 'var(--mocha)' : 'rgba(160,120,64,0.35)'}`,
                      backgroundColor: attending === val ? 'var(--mocha)' : 'transparent',
                      fontFamily: "'Jost', sans-serif",
                      fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                      color: attending === val ? 'var(--champagne)' : 'var(--gold)',
                      cursor: 'pointer', fontWeight: 500,
                      transition: 'all 0.2s',
                    }}
                  >
                    {val ? 'Joyfully Accepts' : 'Regretfully Declines'}
                  </button>
                ))}
              </div>
              <FieldError msg={errors.attending} />
            </div>

            <AnimatePresence>
              {attending === true && (
                <motion.div
                  key="attending-form"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.32 }}
                  style={{ overflow: 'hidden' }}
                >
                  {/* Guest count */}
                  <div style={{ marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>
                    <Label>Number of Guests (including yourself)</Label>
                    <select
                      style={SELECT_STYLE}
                      value={guestCount}
                      onChange={e => setGuestCount(Number(e.target.value))}
                    >
                      {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>

                  {/* Per-guest rows */}
                  <div style={{ marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>
                    <Label>Guest Details</Label>
                    {guests.map((g, i) => (
                      <div key={i}>
                        <GuestRow index={i} guest={g} onChange={updateGuest} mealChoices={wedding.mealChoices} />
                        {(errors[`guest_${i}_name`] || errors[`guest_${i}_meal`]) && (
                          <div style={{ marginBottom: '0.5rem' }}>
                            <FieldError msg={errors[`guest_${i}_name`]} />
                            <FieldError msg={errors[`guest_${i}_meal`]} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Dietary */}
                  <div style={{ marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>
                    <Label>Dietary Restrictions or Allergies</Label>
                    <input
                      style={INPUT_STYLE}
                      value={dietary}
                      onChange={e => setDietary(e.target.value)}
                      placeholder="None (leave blank if none)"
                    />
                  </div>

                  {/* Song request */}
                  <div style={{ marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>
                    <Label>Song Request</Label>
                    <input
                      style={INPUT_STYLE}
                      value={song}
                      onChange={e => setSong(e.target.value)}
                      placeholder="What song gets you on the dance floor?"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Message to couple — always visible after Y/N */}
            <AnimatePresence>
              {attending !== null && (
                <motion.div
                  key="message"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: 'hidden', marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}
                >
                  <Label>Message to Isabelle & Marcus</Label>
                  <textarea
                    style={{
                      ...INPUT_STYLE,
                      resize: 'none',
                      height: '80px',
                      paddingTop: '0.5rem',
                    }}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Share a kind word (optional)"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <AnimatePresence>
              {attending !== null && (
                <motion.div
                  key="submit"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ textAlign: 'center', marginTop: 'clamp(1.5rem, 3vw, 2.5rem)' }}
                >
                  <button
                    onClick={handleSubmit}
                    disabled={pending}
                    style={{
                      padding: '1rem 3rem',
                      backgroundColor: pending ? 'transparent' : 'var(--mocha)',
                      border: '1px solid var(--mocha)',
                      fontFamily: "'Jost', sans-serif",
                      fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                      color: pending ? 'var(--mocha)' : 'var(--champagne)',
                      cursor: pending ? 'default' : 'pointer',
                      fontWeight: 500, transition: 'all 0.2s',
                    }}
                  >
                    {pending ? 'Sending…' : 'Send RSVP'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
