import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'full' | 'icon'
  color?: 'forest' | 'white' | 'charcoal'
}

const sizes = {
  sm: { width: 120, height: 32 },
  md: { width: 160, height: 42 },
  lg: { width: 220, height: 58 },
}

const colors = {
  forest: { text: '#2D5A3D', accent: '#D4725C', tooth: '#FFF8F0' },
  white: { text: '#FFF8F0', accent: '#D4725C', tooth: '#FFF8F0' },
  charcoal: { text: '#2C2C2C', accent: '#D4725C', tooth: '#FFF8F0' },
}

export function Logo({ className, size = 'md', variant = 'full', color = 'forest' }: LogoProps) {
  const { width, height } = sizes[size]
  const c = colors[color]

  if (variant === 'icon') {
    return (
      <svg
        viewBox="0 0 48 48"
        width={height}
        height={height}
        className={cn('flex-shrink-0', className)}
        aria-label="Chewawa"
      >
        {/* Dog face circle */}
        <circle cx="24" cy="24" r="22" fill={c.accent} />
        {/* Ears */}
        <ellipse cx="10" cy="12" rx="7" ry="10" fill={c.accent} transform="rotate(-15 10 12)" />
        <ellipse cx="38" cy="12" rx="7" ry="10" fill={c.accent} transform="rotate(15 38 12)" />
        <ellipse cx="10" cy="12" rx="5" ry="7.5" fill={c.text} transform="rotate(-15 10 12)" />
        <ellipse cx="38" cy="12" rx="5" ry="7.5" fill={c.text} transform="rotate(15 38 12)" />
        {/* Face */}
        <circle cx="24" cy="26" r="18" fill={c.accent} />
        {/* Eyes */}
        <circle cx="17" cy="22" r="3" fill={c.text} />
        <circle cx="31" cy="22" r="3" fill={c.text} />
        <circle cx="18" cy="21" r="1" fill={c.tooth} />
        <circle cx="32" cy="21" r="1" fill={c.tooth} />
        {/* Nose */}
        <ellipse cx="24" cy="28" rx="4" ry="3" fill={c.text} />
        <ellipse cx="24" cy="27.5" rx="1.5" ry="1" fill={c.accent} opacity="0.5" />
        {/* Mouth with tooth showing */}
        <path d="M20 31 Q24 36 28 31" stroke={c.text} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Tooth! */}
        <rect x="22.5" y="31" width="3" height="4" rx="1" fill={c.tooth} />
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 280 56"
      width={width}
      height={height}
      className={cn('flex-shrink-0', className)}
      aria-label="Chewawa"
    >
      {/* Dog icon */}
      <g transform="translate(0, 2)">
        {/* Dog face circle */}
        <circle cx="26" cy="26" r="20" fill={c.accent} />
        {/* Ears */}
        <ellipse cx="11" cy="12" rx="6" ry="9" fill={c.accent} transform="rotate(-15 11 12)" />
        <ellipse cx="41" cy="12" rx="6" ry="9" fill={c.accent} transform="rotate(15 41 12)" />
        <ellipse cx="11" cy="12" rx="4" ry="6.5" fill={c.text} transform="rotate(-15 11 12)" />
        <ellipse cx="41" cy="12" rx="4" ry="6.5" fill={c.text} transform="rotate(15 41 12)" />
        {/* Face */}
        <circle cx="26" cy="28" r="16" fill={c.accent} />
        {/* Eyes */}
        <circle cx="19" cy="24" r="2.5" fill={c.text} />
        <circle cx="33" cy="24" r="2.5" fill={c.text} />
        <circle cx="19.8" cy="23.2" r="0.8" fill={c.tooth} />
        <circle cx="33.8" cy="23.2" r="0.8" fill={c.tooth} />
        {/* Nose */}
        <ellipse cx="26" cy="30" rx="3.5" ry="2.5" fill={c.text} />
        {/* Mouth */}
        <path d="M22 33 Q26 37 30 33" stroke={c.text} strokeWidth="1.3" fill="none" strokeLinecap="round" />
        {/* Tooth */}
        <rect x="24.5" y="33" width="3" height="3.5" rx="1" fill={c.tooth} />
      </g>

      {/* Wordmark */}
      <text
        x="58"
        y="40"
        fontFamily="var(--font-display), Fredoka, system-ui, sans-serif"
        fontSize="36"
        fontWeight="600"
        fill={c.text}
        letterSpacing="-0.5"
      >
        chewawa
      </text>
    </svg>
  )
}
