import type { Metadata } from 'next'
import { Sora, Inter, JetBrains_Mono } from 'next/font/google'
import SmoothScroll from '@/components/providers/SmoothScroll'

import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-bg font-sans text-ink antialiased">
        <a
          href="#main"
          className="fixed left-4 top-4 z-[999] -translate-y-24 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-transform focus-visible:translate-y-0"
        >
          Skip to content
        </a>

        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
