import { motion, useReducedMotion } from 'motion/react';

export default function RibbonBow({ onOpen, isOpening }) {
  const prefersReduced = useReducedMotion();

  // A single continuous "pull" gesture: the right tail is what you'd tug,
  // so it's the first thing to move and travels the farthest. As slack
  // leaves the bow the loops cinch down toward the knot and disappear,
  // the left tail gets drawn in after them, and the knot flattens last —
  // reads as one string being pulled loose rather than the bow just
  // falling apart symmetrically.
  const pulledTail = {
    animate: isOpening
      ? { y: [0, 60, 130], x: [0, 10, 26], rotate: [0, 6, 14], opacity: [1, 1, 0] }
      : { y: 0, x: 0, rotate: 0, opacity: 1 },
    transition: { duration: 0.95, times: [0, 0.32, 1], ease: 'easeIn' },
  };
  const slackTail = {
    animate: isOpening
      ? { y: [0, -8, -26], x: [0, 3, 8], opacity: [1, 0.85, 0] }
      : { y: 0, x: 0, opacity: 1 },
    transition: { duration: 0.75, times: [0, 0.45, 1], delay: 0.1, ease: 'easeIn' },
  };
  const loopBase = {
    animate: isOpening
      ? { scale: [1, 0.55, 0], opacity: [1, 1, 0] }
      : { scale: 1, opacity: 1 },
    transition: { duration: 0.6, times: [0, 0.55, 1], ease: 'easeIn' },
  };

  return (
    <motion.button
      onClick={onOpen}
      aria-label="Pull the ribbon to open your invitation"
      disabled={isOpening}
      style={{ background: 'none', border: 'none', padding: 0, cursor: isOpening ? 'default' : 'pointer' }}
      // Idle sway — a soft, ribbon-like breathing motion
      animate={
        isOpening || prefersReduced
          ? {}
          : {
              rotate: [-2, 2, -2],
              filter: [
                'drop-shadow(0 5px 16px rgba(var(--brass-rgb),0.3))',
                'drop-shadow(0 8px 24px rgba(var(--brass-rgb),0.5))',
                'drop-shadow(0 5px 16px rgba(var(--brass-rgb),0.3))',
              ],
            }
      }
      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg
        width="150"
        height="150"
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

        {/* Left tail — slack gets drawn up into the knot as the right tail is pulled */}
        <motion.path
          d="M54 62 C51 78 48 94 44 108 L52 100 L57 110 C58 94 58 78 58 62 Z"
          fill="url(#ribbonGrad)"
          filter="url(#ribbonShadow)"
          animate={slackTail.animate}
          transition={slackTail.transition}
          style={{ transformOrigin: '54px 62px' }}
        />

        {/* Right tail — this is the string you'd pull; it moves first and travels farthest */}
        <motion.path
          d="M66 62 C69 78 72 94 76 108 L68 100 L63 110 C62 94 62 78 62 62 Z"
          fill="url(#ribbonGrad)"
          filter="url(#ribbonShadow)"
          animate={pulledTail.animate}
          transition={pulledTail.transition}
          style={{ transformOrigin: '66px 62px' }}
        />

        {/* Left loop — cinches down toward the knot and vanishes */}
        <motion.path
          d="M58 58 C40 46 20 48 13 62 C7 76 20 88 40 82 C50 79 58 68 58 58 Z"
          fill="url(#ribbonGrad)"
          filter="url(#ribbonShadow)"
          animate={loopBase.animate}
          transition={loopBase.transition}
          style={{ transformOrigin: '58px 58px' }}
        />
        <motion.path
          d="M58 58 C44 50 30 51 25 61 C21 70 29 78 43 74"
          stroke="url(#ribbonSheen)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          animate={loopBase.animate}
          transition={loopBase.transition}
          style={{ transformOrigin: '58px 58px' }}
        />

        {/* Right loop — cinches slightly after the left, following the pull */}
        <motion.path
          d="M62 58 C80 46 100 48 107 62 C113 76 100 88 80 82 C70 79 62 68 62 58 Z"
          fill="url(#ribbonGrad)"
          filter="url(#ribbonShadow)"
          animate={
            isOpening ? { scale: [1, 0.55, 0], opacity: [1, 1, 0] } : { scale: 1, opacity: 1 }
          }
          transition={{ duration: 0.6, times: [0, 0.55, 1], delay: 0.08, ease: 'easeIn' }}
          style={{ transformOrigin: '62px 58px' }}
        />
        <motion.path
          d="M62 58 C76 50 90 51 95 61 C99 70 91 78 77 74"
          stroke="url(#ribbonSheen)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          animate={
            isOpening ? { scale: [1, 0.55, 0], opacity: [1, 1, 0] } : { scale: 1, opacity: 1 }
          }
          transition={{ duration: 0.6, times: [0, 0.55, 1], delay: 0.08, ease: 'easeIn' }}
          style={{ transformOrigin: '62px 58px' }}
        />

        {/* Knot — flattens and slips away last, once both loops are gone */}
        <motion.g
          animate={
            isOpening
              ? { scaleY: [1, 1, 0.25, 0], opacity: [1, 1, 1, 0] }
              : { scaleY: 1, opacity: 1 }
          }
          transition={{ duration: 0.85, times: [0, 0.4, 0.75, 1], ease: 'easeIn' }}
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
