export default function Monogram({ size = 80, color = '#b6924e', className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Outer ring */}
      <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="1" fill="none" opacity="0.8" />
      {/* Inner ring */}
      <circle cx="50" cy="50" r="40" stroke={color} strokeWidth="0.5" fill="none" opacity="0.5" />

      {/* Laurel left */}
      <g stroke={color} strokeWidth="0.8" fill="none" opacity="0.7">
        <path d="M18 50 Q14 44 17 38 Q21 44 18 50Z" />
        <path d="M18 50 Q12 48 11 42 Q16 46 18 50Z" />
        <path d="M18 50 Q13 54 15 60 Q19 55 18 50Z" />
        <path d="M18 50 Q12 52 11 58 Q16 54 18 50Z" />
        <line x1="18" y1="50" x2="26" y2="50" strokeWidth="0.6" />
      </g>

      {/* Laurel right */}
      <g stroke={color} strokeWidth="0.8" fill="none" opacity="0.7">
        <path d="M82 50 Q86 44 83 38 Q79 44 82 50Z" />
        <path d="M82 50 Q88 48 89 42 Q84 46 82 50Z" />
        <path d="M82 50 Q87 54 85 60 Q81 55 82 50Z" />
        <path d="M82 50 Q88 52 89 58 Q84 54 82 50Z" />
        <line x1="82" y1="50" x2="74" y2="50" strokeWidth="0.6" />
      </g>

      {/* Monogram text */}
      <text
        x="50"
        y="56"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="18"
        fontWeight="400"
        fill={color}
        letterSpacing="2"
      >
        E &amp; J
      </text>
    </svg>
  );
}
