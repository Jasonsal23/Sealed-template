import { motion } from 'motion/react';
import { SectionHead } from './Story';
import wedding from '../data/wedding';

const PALETTE = ['#c4a060', '#a07840', '#7a9278', '#c89880', '#b8a890', '#5c3d28', '#c4a060', '#a07840'];

function PartyMember({ person, index, colorIndex }) {
  const initials = person.name.split(' ').map(n => n[0]).join('').slice(0, 2);
  const color = PALETTE[colorIndex % PALETTE.length];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      style={{ textAlign: 'center' }}
    >
      {/* Avatar */}
      <div style={{
        width: 'clamp(70px, 18vw, 96px)',
        height: 'clamp(70px, 18vw, 96px)',
        borderRadius: '50%',
        backgroundColor: color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 0.85rem',
        opacity: 0.85,
      }}>
        <span className="font-display" style={{ color: '#fff', fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)', fontWeight: 400, letterSpacing: '0.04em' }}>
          {initials}
        </span>
      </div>
      <h4 className="font-display" style={{ fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', fontStyle: 'italic', fontWeight: 400, color: 'var(--mocha)', marginBottom: '0.2rem' }}>
        {person.name}
      </h4>
      <p className="text-label" style={{ color: 'var(--gold)', fontSize: '0.52rem', marginBottom: '0.2rem' }}>{person.role}</p>
      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.75rem', color: 'var(--mocha-mid)', fontWeight: 300 }}>{person.relation}</p>
    </motion.div>
  );
}

export default function WeddingParty() {
  return (
    <section id="party" style={{ backgroundColor: 'var(--champagne)' }}>
      <div className="section-pad container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }}>
          <SectionHead eyebrow="The People" title="Wedding Party" />
        </motion.div>

        {/* Bride's side */}
        <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <p className="font-script" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', color: 'var(--blush)', textAlign: 'center', marginBottom: '2rem', lineHeight: 1 }}>
            {wedding.partnerA}'s Side
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: 'clamp(1.5rem, 4vw, 2.5rem)',
            maxWidth: '700px', margin: '0 auto',
          }}>
            {wedding.partyA.map((person, i) => (
              <PartyMember key={person.name} person={person} index={i} colorIndex={i} />
            ))}
          </div>
        </div>

        <div style={{ width: '36px', height: '1px', backgroundColor: 'var(--gold)', opacity: 0.25, margin: '0 auto clamp(2.5rem, 5vw, 4rem)' }} />

        {/* Groom's side */}
        <div>
          <p className="font-script" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', color: 'var(--blush)', textAlign: 'center', marginBottom: '2rem', lineHeight: 1 }}>
            {wedding.partnerB}'s Side
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: 'clamp(1.5rem, 4vw, 2.5rem)',
            maxWidth: '700px', margin: '0 auto',
          }}>
            {wedding.partyB.map((person, i) => (
              <PartyMember key={person.name} person={person} index={i} colorIndex={i + 4} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
