import wedding from '../data/wedding';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--midnight)',
        padding: 'clamp(3rem, 6vw, 5.5rem) 1.5rem',
        textAlign: 'center',
        borderTop: '1px solid rgba(240,204,96,0.1)',
      }}
    >
      {/* Mini constellation — three connected dots */}
      <svg width="64" height="24" viewBox="0 0 64 24" fill="none" aria-hidden="true" style={{ margin: '0 auto 1.5rem', display: 'block' }}>
        <circle cx="8" cy="16" r="2.5" fill="var(--starlight)" opacity="0.55" />
        <circle cx="32" cy="6" r="3.5" fill="var(--starlight)" opacity="0.8" />
        <circle cx="56" cy="16" r="2.5" fill="var(--starlight)" opacity="0.55" />
        <line x1="8" y1="16" x2="32" y2="6" stroke="rgba(240,204,96,0.3)" strokeWidth="0.8" />
        <line x1="32" y1="6" x2="56" y2="16" stroke="rgba(240,204,96,0.3)" strokeWidth="0.8" />
      </svg>

      <p className="font-script"
        style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: 'rgba(254,250,242,0.75)', margin: '0 0 0.3rem', lineHeight: 1 }}>
        {wedding.partnerA} & {wedding.partnerB}
      </p>

      <div style={{ width: '28px', height: '1px', backgroundColor: 'var(--starlight)', margin: '1.2rem auto', opacity: 0.3 }} />

      <p className="font-display"
        style={{ fontSize: 'clamp(0.95rem, 2.2vw, 1.25rem)', color: 'rgba(254,250,242,0.55)', margin: '0 0 0.75rem', letterSpacing: '0.04em', fontWeight: 400 }}>
        We can't wait to celebrate with you.
      </p>

      <p className="font-display text-label" style={{ color: 'var(--starlight)', margin: '0 0 2rem', opacity: 0.5, fontSize: '0.54rem' }}>
        {wedding.hashtag}
      </p>

      <p className="font-body"
        style={{ fontSize: '0.6rem', color: 'rgba(254,250,242,0.18)', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: "'Cinzel', serif" }}>
        {wedding.partnerAFull} &amp; {wedding.partnerBFull} · October 11, 2027
      </p>
    </footer>
  );
}
