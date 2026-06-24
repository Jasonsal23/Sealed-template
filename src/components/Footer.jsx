import wedding from '../data/wedding';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--cream)',
        padding: 'clamp(3rem, 6vw, 5rem) 1.5rem',
        textAlign: 'center',
        borderTop: '1px solid rgba(184,149,106,0.2)',
      }}
    >
      {/* Monogram text mark */}
      <p
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          color: 'var(--rose)',
          margin: '0 0 0.5rem',
          lineHeight: 1,
          opacity: 0.7,
        }}
      >
        {wedding.partnerA} & {wedding.partnerB}
      </p>

      <div style={{ width: '32px', height: '1px', backgroundColor: 'var(--gold)', margin: '1.25rem auto', opacity: 0.35 }} />

      <p
        className="font-display"
        style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
          fontStyle: 'italic',
          color: 'var(--espresso)',
          margin: '0 0 0.75rem',
          opacity: 0.75,
        }}
      >
        We can't wait to celebrate with you.
      </p>

      <p className="font-body text-label" style={{ color: 'var(--rose)', margin: '0 0 2rem', opacity: 0.65 }}>
        {wedding.hashtag}
      </p>

      <p
        className="font-body"
        style={{
          fontSize: '0.65rem',
          color: 'var(--espresso)',
          opacity: 0.25,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontFamily: "'Lato', sans-serif",
        }}
      >
        {wedding.partnerAFull} &amp; {wedding.partnerBFull} · March 20, 2027
      </p>
    </footer>
  );
}
