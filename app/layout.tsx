import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono, Syne } from 'next/font/google'
import SmoothScroll from '@/components/providers/SmoothScroll'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
})

const spaceGrotesk = Space_Grotesk({
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
    'Full-stack developer building premium digital products, websites, and growth engines. Next.js, React, TypeScript, and automation.',
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
      className={`${syne.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-bg font-sans text-accent antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
