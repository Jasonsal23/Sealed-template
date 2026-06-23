export default function Monogram({ size = 80, color = '#a87c3a', className = '' }) {
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

      {/* Botanical sprig left */}
      <g stroke={color} strokeWidth="0.8" fill="none" opacity="0.65">
        <path d="M18 50 Q15 45 17 39 Q21 44 18 50Z" fill={color} opacity="0.25" />
        <path d="M18 50 Q12 47 11 41 Q16 45 18 50Z" fill={color} opacity="0.2" />
        <path d="M18 50 Q14 55 16 61 Q20 56 18 50Z" fill={color} opacity="0.25" />
        <path d="M18 50 Q11 53 11 59 Q16 55 18 50Z" fill={color} opacity="0.2" />
        <line x1="18" y1="50" x2="27" y2="50" strokeWidth="0.7" />
      </g>

      {/* Botanical sprig right */}
      <g stroke={color} strokeWidth="0.8" fill="none" opacity="0.65">
        <path d="M82 50 Q85 45 83 39 Q79 44 82 50Z" fill={color} opacity="0.25" />
        <path d="M82 50 Q88 47 89 41 Q84 45 82 50Z" fill={color} opacity="0.2" />
        <path d="M82 50 Q86 55 84 61 Q80 56 82 50Z" fill={color} opacity="0.25" />
        <path d="M82 50 Q89 53 89 59 Q84 55 82 50Z" fill={color} opacity="0.2" />
        <line x1="82" y1="50" x2="73" y2="50" strokeWidth="0.7" />
      </g>

      {/* Monogram text */}
      <text
        x="50"
        y="56"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="17"
        fontWeight="400"
        fill={color}
        letterSpacing="2"
      >
        C &amp; R
      </text>
    </svg>
  );
}
