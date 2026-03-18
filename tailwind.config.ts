import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: {
          DEFAULT: '#FFF8F0',
          dark:    '#F5EDE3',
        },
        forest: {
          DEFAULT: '#2D5A3D',
          light:   '#3A7A52',
          dark:    '#1E3F2B',
        },
        terracotta: {
          DEFAULT: '#D4725C',
          light:   '#E08B78',
          dark:    '#B85A45',
        },
        charcoal: {
          DEFAULT: '#2C2C2C',
          light:   '#4A4A4A',
          muted:   '#6B6B6B',
        },
        sage:    '#A8C5A0',
        sand:    '#E8DDD0',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse 80% 60% at 50% 40%, #3A7A52 0%, #2D5A3D 45%, #1E3F2B 100%)',
      },
      boxShadow: {
        'product':      '0 4px 20px rgba(44,44,44,0.08)',
        'product-lift': '0 8px 32px rgba(44,44,44,0.12)',
        'card':         '0 1px 3px rgba(44,44,44,0.06), 0 4px 12px rgba(44,44,44,0.04)',
        'nav':          '0 4px 24px rgba(44,44,44,0.1)',
        'cta-glow':     '0 0 40px rgba(212,114,92,0.25)',
      },
      animation: {
        'fade-up':    'fadeUp 0.4s ease forwards',
        'float':      'float 4s ease-in-out infinite',
        'shimmer':    'shimmer 2.5s linear infinite',
        'wiggle':     'wiggle 0.4s ease-in-out',
        'chew':       'chew 1.2s ease-in-out infinite',
        'pulse-slow': 'pulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%':      { transform: 'rotate(-3deg)' },
          '75%':      { transform: 'rotate(3deg)' },
        },
        chew: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':      { transform: 'scale(1.05) rotate(-2deg)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
