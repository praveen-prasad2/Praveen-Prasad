import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          primary: 'var(--color-primary)',
          'primary-focus': 'var(--color-primary-focus)',
          'primary-on-dark': 'var(--color-primary-on-dark)',
          ink: 'var(--color-ink)',
          body: 'var(--color-body)',
          'body-on-dark': 'var(--color-body-on-dark)',
          'body-muted': 'var(--color-body-muted)',
          'ink-muted-80': 'var(--color-ink-muted-80)',
          'ink-muted-48': 'var(--color-ink-muted-48)',
          'divider-soft': 'var(--color-divider-soft)',
          hairline: 'var(--color-hairline)',
          canvas: 'var(--color-canvas)',
          parchment: 'var(--color-canvas-parchment)',
          pearl: 'var(--color-surface-pearl)',
          'tile-1': 'var(--color-surface-tile-1)',
          'tile-2': 'var(--color-surface-tile-2)',
          'tile-3': 'var(--color-surface-tile-3)',
          black: 'var(--color-surface-black)',
          chip: 'var(--color-surface-chip)',
          'on-primary': 'var(--color-on-primary)',
          'on-dark': 'var(--color-on-dark)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)'],
        text: ['var(--font-text)'],
        sans: ['var(--font-text)'],
      },
      borderRadius: {
        'apple-xs': 'var(--radius-xs)',
        'apple-sm': 'var(--radius-sm)',
        'apple-md': 'var(--radius-md)',
        'apple-lg': 'var(--radius-lg)',
        'apple-pill': 'var(--radius-pill)',
      },
      spacing: {
        'apple-section': 'var(--spacing-section)',
      },
      boxShadow: {
        product: 'var(--shadow-product)',
      },
    },
  },
  plugins: [],
}
export default config
