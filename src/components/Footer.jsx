import Monogram from './Monogram';
import wedding from '../data/wedding';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--ink)',
        padding: 'clamp(3rem, 6vw, 5rem) 1.5rem',
        textAlign: 'center',
      }}
    >
      <Monogram size={58} color="#d4c99a" />

      <div style={{ width: '36px', height: '1px', backgroundColor: 'var(--gold)', margin: '1.75rem auto', opacity: 0.3 }} />

      <p
        className="font-display"
        style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.45rem)',
          fontStyle: 'italic',
          color: 'var(--parchment)',
          margin: '0 0 0.75rem',
          opacity: 0.85,
        }}
      >
        We can't wait to celebrate with you.
      </p>

      <p className="font-body text-label" style={{ color: 'var(--sage)', margin: '0 0 2rem', opacity: 0.7 }}>
        {wedding.hashtag}
      </p>

      <p className="font-body" style={{ fontSize: '0.68rem', color: 'var(--parchment)', opacity: 0.25, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        {wedding.partnerAFull} &amp; {wedding.partnerBFull} · September 27, 2027
      </p>
    </footer>
  );
}
