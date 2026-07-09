import wedding from '../data/wedding';

const FOOTER_LINKS = [
  { label: 'Our Story', id: 'story' },
  { label: 'Events', id: 'events' },
  { label: 'Travel', id: 'travel' },
  { label: 'The Party', id: 'party' },
  { label: 'Registry', id: 'registry' },
  { label: 'FAQ', id: 'faq' },
  { label: 'RSVP', id: 'rsvp' },
];

function scrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--mocha)',
      padding: 'clamp(4rem, 8vw, 6rem) clamp(1.25rem, 5vw, 3rem) clamp(2.5rem, 5vw, 3.5rem)',
      textAlign: 'center',
    }}>
      {/* Monogram crest */}
      <svg viewBox="0 0 80 80" width="68" height="68" style={{ display: 'block', margin: '0 auto 1.75rem' }} aria-hidden="true">
        <circle cx="40" cy="40" r="36" fill="none" stroke="var(--gold)" strokeWidth="0.8" opacity="0.4" />
        <circle cx="40" cy="40" r="31" fill="none" stroke="var(--gold)" strokeWidth="0.25" opacity="0.2" />
        <text x="40" y="47" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="16" fontWeight="400" fontStyle="italic" fill="var(--gold)" opacity="0.75">
          {wedding.partnerA[0]} &amp; {wedding.partnerB[0]}
        </text>
      </svg>

      {/* Couple names */}
      <p className="font-script" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--champagne)', marginBottom: '0.5rem', lineHeight: 1 }}>
        {wedding.partnerAFull}
      </p>
      <p className="font-script" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', color: 'var(--gold)', marginBottom: '0.5rem', lineHeight: 1, opacity: 0.6 }}>
        &amp;
      </p>
      <p className="font-script" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--champagne)', marginBottom: '1.5rem', lineHeight: 1 }}>
        {wedding.partnerBFull}
      </p>

      {/* Date */}
      <p className="text-label" style={{ color: 'var(--gold)', fontSize: '0.56rem', opacity: 0.65, marginBottom: '2.5rem' }}>
        {wedding.dateDisplay} &nbsp;·&nbsp; {wedding.venue.city}
      </p>

      {/* Hairline */}
      <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--gold)', opacity: 0.2, margin: '0 auto 2rem' }} />

      {/* Nav links */}
      <nav aria-label="Footer navigation">
        <ul style={{
          listStyle: 'none', padding: 0, margin: '0 auto 2rem',
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.25rem 1.5rem',
        }}>
          {FOOTER_LINKS.map(link => (
            <li key={link.id}>
              <button
                onClick={() => scrollTo(link.id)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'rgba(242,232,213,0.4)',
                  fontWeight: 400, padding: '0.25rem 0',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                onMouseLeave={e => e.target.style.color = 'rgba(242,232,213,0.4)'}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hashtag */}
      <p className="font-script" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', color: 'var(--gold)', opacity: 0.5, marginBottom: '2rem' }}>
        {wedding.hashtag}
      </p>

      {/* Closing line */}
      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.78rem', fontWeight: 300, fontStyle: 'italic', color: 'rgba(242,232,213,0.35)', marginBottom: '2rem' }}>
        We can't wait to celebrate with you.
      </p>

      {/* Copyright */}
      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.58rem', letterSpacing: '0.1em', color: 'rgba(242,232,213,0.15)', fontWeight: 400 }}>
        &copy; {new Date().getFullYear()} {wedding.partnerAFull} &amp; {wedding.partnerBFull}
      </p>
    </footer>
  );
}
