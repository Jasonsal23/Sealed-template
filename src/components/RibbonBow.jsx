import { motion, useReducedMotion } from 'motion/react';

export default function RibbonBow({ onOpen, isOpening }) {
  const prefersReduced = useReducedMotion();

  const loopTransition = { duration: 0.55, ease: [0.4, 0, 0.2, 1] };
  const knotTransition = { duration: 0.4, delay: 0.12, ease: 'easeIn' };
  const tailTransition = { duration: 0.6, delay: 0.05, ease: 'easeIn' };

  return (
    <motion.button
      onClick={onOpen}
      aria-label="Untie the ribbon to open your invitation"
      disabled={isOpening}
      style={{ background: 'none', border: 'none', padding: 0, cursor: isOpening ? 'default' : 'pointer' }}
      // Idle sway — a soft, ribbon-like breathing motion
      animate={
        isOpening || prefersReduced
          ? {}
          : {
              rotate: [-2, 2, -2],
              filter: [
                'drop-shadow(0 4px 14px rgba(var(--brass-rgb),0.3))',
                'drop-shadow(0 6px 20px rgba(var(--brass-rgb),0.5))',
                'drop-shadow(0 4px 14px rgba(var(--brass-rgb),0.3))',
              ],
            }
      }
      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e0b880" />
            <stop offset="45%" stopColor="#c99a5c" />
            <stop offset="100%" stopColor="#8f6636" />
          </linearGradient>
          <linearGradient id="ribbonSheen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f3e6d2" stopOpacity="0" />
            <stop offset="50%" stopColor="#f3e6d2" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#f3e6d2" stopOpacity="0" />
          </linearGradient>
          <filter id="ribbonShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#7d5629" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Tails — hang from the knot, slide down and fade as the bow releases */}
        <motion.path
          d="M54 62 C51 78 48 94 44 108 L52 100 L57 110 C58 94 58 78 58 62 Z"
          fill="url(#ribbonGrad)"
          filter="url(#ribbonShadow)"
          animate={isOpening ? { y: 46, opacity: 0 } : { y: 0, opacity: 1 }}
          transition={tailTransition}
          style={{ transformOrigin: '54px 62px' }}
        />
        <motion.path
          d="M66 62 C69 78 72 94 76 108 L68 100 L63 110 C62 94 62 78 62 62 Z"
          fill="url(#ribbonGrad)"
          filter="url(#ribbonShadow)"
          animate={isOpening ? { y: 46, opacity: 0 } : { y: 0, opacity: 1 }}
          transition={tailTransition}
          style={{ transformOrigin: '66px 62px' }}
        />

        {/* Left loop — pulls left and away as the bow comes untied */}
        <motion.path
          d="M58 58 C40 46 20 48 13 62 C7 76 20 88 40 82 C50 79 58 68 58 58 Z"
          fill="url(#ribbonGrad)"
          filter="url(#ribbonShadow)"
          animate={
            isOpening
              ? { x: -46, y: -18, rotate: -50, opacity: 0 }
              : { x: 0, y: 0, rotate: 0, opacity: 1 }
          }
          transition={loopTransition}
          style={{ transformOrigin: '58px 58px' }}
        />
        <motion.path
          d="M58 58 C44 50 30 51 25 61 C21 70 29 78 43 74"
          stroke="url(#ribbonSheen)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          animate={
            isOpening
              ? { x: -46, y: -18, rotate: -50, opacity: 0 }
              : { x: 0, y: 0, rotate: 0, opacity: 1 }
          }
          transition={loopTransition}
          style={{ transformOrigin: '58px 58px' }}
        />

        {/* Right loop — mirrors the left */}
        <motion.path
          d="M62 58 C80 46 100 48 107 62 C113 76 100 88 80 82 C70 79 62 68 62 58 Z"
          fill="url(#ribbonGrad)"
          filter="url(#ribbonShadow)"
          animate={
            isOpening
              ? { x: 46, y: -18, rotate: 50, opacity: 0 }
              : { x: 0, y: 0, rotate: 0, opacity: 1 }
          }
          transition={loopTransition}
          style={{ transformOrigin: '62px 58px' }}
        />
        <motion.path
          d="M62 58 C76 50 90 51 95 61 C99 70 91 78 77 74"
          stroke="url(#ribbonSheen)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          animate={
            isOpening
              ? { x: 46, y: -18, rotate: 50, opacity: 0 }
              : { x: 0, y: 0, rotate: 0, opacity: 1 }
          }
          transition={loopTransition}
          style={{ transformOrigin: '62px 58px' }}
        />

        {/* Knot — sits over both loops, slips away just after they release */}
        <motion.g
          animate={
            isOpening
              ? { scale: 0.6, y: -6, opacity: 0 }
              : { scale: 1, y: 0, opacity: 1 }
          }
          transition={knotTransition}
          style={{ transformOrigin: '60px 60px' }}
        >
          <rect x="49" y="50" width="22" height="20" rx="4" fill="url(#ribbonGrad)" filter="url(#ribbonShadow)" />
          <line x1="60" y1="52" x2="60" y2="68" stroke="#7d5629" strokeWidth="1" opacity="0.5" />
          <line x1="52" y1="60" x2="68" y2="60" stroke="#f3e6d2" strokeWidth="1" opacity="0.35" />
        </motion.g>
      </svg>
    </motion.button>
  );
}
