import Monogram from './Monogram';
import wedding from '../data/wedding';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--parchment)',
        padding: 'clamp(3rem, 6vw, 5rem) 1.5rem',
        textAlign: 'center',
        borderTop: '1px solid rgba(182,146,78,0.2)',
      }}
    >
      <Monogram size={56} />

      <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--gold)', margin: '1.5rem auto', opacity: 0.4 }} />

      <p
        className="font-display"
        style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
          fontStyle: 'italic',
          color: 'var(--ink)',
          margin: '0 0 0.75rem',
        }}
      >
        We can't wait to celebrate with you.
      </p>

      <p className="font-body text-label" style={{ color: 'var(--gold)', margin: '0 0 2rem' }}>
        {wedding.hashtag}
      </p>

      <p
        className="font-body"
        style={{
          fontSize: '0.7rem',
          color: 'var(--ink)',
          opacity: 0.35,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        Eleanor Hayes &amp; Julian Bennett · May 15, 2027
      </p>
    </footer>
  );
}
