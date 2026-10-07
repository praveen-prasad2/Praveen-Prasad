import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Inter_Tight, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import SmoothScroll from '@/components/providers/SmoothScroll'
import PageMascot from '@/components/ui/PageMascot'

import './globals.css'

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['wdth', 'opsz'],
  adjustFontFallback: false,
  variable: '--font-display',
})

const sans = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-sans',
})

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  adjustFontFallback: false,
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Praveen Prasad — Full Stack Developer',
  description:
    'Praveen Prasad is a full-stack developer in Kerala building thoughtful websites, connected applications, and practical automations with Next.js, React, TypeScript, and n8n.',
  icons: {
    icon: '/uploads/logo.svg',
    shortcut: '/uploads/logo.svg',
    apple: '/uploads/logo.svg',
  },
}

export const viewport: Viewport = {
  themeColor: '#0c0c0b',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${display.variable} ${sans.variable} ${serif.variable} ${mono.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <SmoothScroll>{children}</SmoothScroll>

        <PageMascot />
      </body>
    </html>
  )
}
