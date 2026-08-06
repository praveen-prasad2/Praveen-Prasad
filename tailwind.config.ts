import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: 'rgb(var(--color-bg-rgb) / <alpha-value>)',
          secondary: 'rgb(var(--color-bg-secondary-rgb) / <alpha-value>)',
        },
        primary: 'rgb(var(--color-primary-rgb) / <alpha-value>)',
        accent: 'rgb(var(--color-accent-rgb) / <alpha-value>)',
        muted: 'rgb(var(--color-muted-rgb) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 24px rgba(0, 255, 136, 0.15)',
        'glow-sm': '0 0 12px rgba(0, 255, 136, 0.12)',
        'glow-lg': '0 0 40px rgba(0, 255, 136, 0.18)',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to bottom, transparent, var(--color-bg) 90%)',
      },
    },
  },
  plugins: [],
}
export default config
