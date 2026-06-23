import { motion, useReducedMotion } from 'motion/react';
import Monogram from './Monogram';

export default function WaxSeal({ onOpen, isOpening }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.button
      onClick={onOpen}
      aria-label="Open your invitation"
      disabled={isOpening}
      style={{ background: 'none', border: 'none', padding: 0, cursor: isOpening ? 'default' : 'pointer' }}
      // Idle breathing pulse — stops when opening begins
      animate={
        isOpening || prefersReduced
          ? {}
          : {
              scale: [1, 1.03, 1],
              filter: [
                'drop-shadow(0 4px 18px rgba(44,85,64,0.3))',
                'drop-shadow(0 6px 24px rgba(44,85,64,0.52))',
                'drop-shadow(0 4px 18px rgba(44,85,64,0.3))',
              ],
            }
      }
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="sealShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#2c5540" floodOpacity="0.45" />
          </filter>
          <radialGradient id="waxGrad" cx="38%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#3d7358" />
            <stop offset="55%" stopColor="#2c5540" />
            <stop offset="100%" stopColor="#1a3628" />
          </radialGradient>
        </defs>

        {/* Seal body — slightly irregular wax drip shape */}
        <path
          d="M60 6
            C68 4 76 7 82 12
            C88 9 96 12 100 18
            C106 20 111 26 112 33
            C117 37 118 44 116 51
            C119 57 118 64 114 69
            C115 76 111 82 105 85
            C104 92 98 97 91 98
            C87 104 80 107 73 106
            C67 110 60 110 54 107
            C48 110 41 108 36 104
            C29 104 23 99 20 93
            C14 91 9 85 8 78
            C3 74 2 67 4 61
            C1 55 2 48 6 43
            C5 36 9 30 14 26
            C15 19 20 14 27 12
            C31 6 38 4 45 6
            C49 3 55 3 60 6Z"
          fill="url(#waxGrad)"
          filter="url(#sealShadow)"
        />
        {/* Embossed rings */}
        <circle cx="60" cy="60" r="44" stroke="#3d7358" strokeWidth="1.5" fill="none" opacity="0.6" />
        <circle cx="60" cy="60" r="38" stroke="#5a9470" strokeWidth="0.5" fill="none" opacity="0.3" />

        {/* Monogram crest */}
        <foreignObject x="20" y="20" width="80" height="80">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
            <Monogram size={68} color="#d4c99a" />
          </div>
        </foreignObject>
      </svg>
    </motion.button>
  );
}
