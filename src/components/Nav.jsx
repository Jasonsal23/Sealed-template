import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import wedding from '../data/wedding';

const NAV_LINKS = [
  { label: 'Our Story', id: 'story' },
  { label: 'Events', id: 'events' },
  { label: 'Travel', id: 'travel' },
  { label: 'The Party', id: 'party' },
  { label: 'Activities', id: 'activities' },
  { label: 'Registry', id: 'registry' },
  { label: 'FAQ', id: 'faq' },
  { label: 'RSVP', id: 'rsvp' },
];

function scrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 72; // nav height
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.id);
    const els = ids.map(id => document.getElementById(id)).filter(Boolean);
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-25% 0px -70% 0px' }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleLink = (id) => {
    setMenuOpen(false);
    setTimeout(() => scrollTo(id), menuOpen ? 300 : 0);
  };

  const navBg = scrolled ? 'rgba(250,247,240,0.97)' : 'transparent';
  const navShadow = scrolled ? '0 1px 24px rgba(42,26,16,0.07)' : 'none';
  const textColor = scrolled ? 'var(--mocha)' : '#ffffff';

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          height: '68px',
          backgroundColor: navBg,
          boxShadow: navShadow,
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          transition: 'background-color 0.4s, box-shadow 0.4s',
        }}
      >
        <div
          style={{
            maxWidth: '1200px', margin: '0 auto',
            padding: '0 clamp(1rem, 4vw, 2rem)',
            height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem 0', lineHeight: 1 }}
            aria-label="Back to top"
          >
            <span className="font-script" style={{ fontSize: '1.55rem', color: textColor, transition: 'color 0.4s', lineHeight: 1 }}>
              {wedding.partnerA} &amp; {wedding.partnerB}
            </span>
          </button>

          {/* Desktop links */}
          <ul className="nav-links" style={{ gap: '1.75rem', listStyle: 'none', alignItems: 'center' }}>
            {NAV_LINKS.map(link => (
              <li key={link.id}>
                <button
                  onClick={() => handleLink(link.id)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500,
                    padding: '0.3rem 0',
                    color: scrolled
                      ? (active === link.id ? 'var(--gold)' : 'var(--mocha-mid)')
                      : (active === link.id ? 'var(--gold-light)' : 'rgba(255,255,255,0.82)'),
                    borderBottom: active === link.id ? '1px solid var(--gold)' : '1px solid transparent',
                    transition: 'color 0.25s, border-color 0.25s',
                  }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button
            className="nav-burger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', flexDirection: 'column', gap: '5px', alignItems: 'center', justifyContent: 'center' }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: '22px', height: '1.5px',
                backgroundColor: menuOpen ? 'var(--mocha)' : textColor,
                transition: 'transform 0.3s, opacity 0.3s, background-color 0.4s',
                transformOrigin: 'center',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(4.5px, 4.5px)'
                  : i === 1 ? 'scaleX(0)'
                  : 'rotate(-45deg) translate(4.5px, -4.5px)'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            style={{
              position: 'fixed', inset: 0, zIndex: 999,
              backgroundColor: 'var(--ivory)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '0.25rem',
              paddingBottom: '2rem',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.045, duration: 0.3 }}
              >
                <button
                  onClick={() => handleLink(link.id)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    padding: '0.65rem 1.5rem',
                    display: 'block', textAlign: 'center',
                  }}
                >
                  <span
                    className="font-display"
                    style={{
                      fontSize: 'clamp(1.6rem, 7vw, 2.2rem)',
                      color: active === link.id ? 'var(--gold)' : 'var(--mocha)',
                      fontWeight: 400, letterSpacing: '0.03em',
                    }}
                  >
                    {link.label}
                  </span>
                </button>
              </motion.div>
            ))}

            <div style={{ width: '36px', height: '1px', backgroundColor: 'var(--gold)', opacity: 0.3, margin: '1rem 0 0.5rem' }} />
            <p className="font-script" style={{ fontSize: '1.3rem', color: 'var(--gold)', opacity: 0.7 }}>
              {wedding.hashtag}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
