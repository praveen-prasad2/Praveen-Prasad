import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://praveen-portfolio.example.com'),
  title: {
    default: 'Praveen Prasad — Portfolio',
    template: '%s | Praveen Prasad Portfolio',
  },
  description:
    'Photography-first portfolio experience inspired by Apple design — full-stack developer crafting elegant digital products.',
  keywords: [
    'Praveen Prasad',
    'Portfolio',
    'Full Stack Developer',
    'Next.js',
    'TypeScript',
  ],
  authors: [{ name: 'Praveen Prasad', url: 'https://www.linkedin.com/in/praveenprasad' }],
  openGraph: {
    title: 'Praveen Prasad — Portfolio',
    description: 'An immersive Apple-inspired portfolio operating system.',
    url: 'https://praveen-portfolio.example.com',
    siteName: 'Praveen Prasad Portfolio',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Portfolio preview' }],
    locale: 'en_US',
    type: 'website',
  },
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen overflow-hidden bg-apple-parchment font-text text-apple-ink antialiased">
        {children}
      </body>
    </html>
  )
}
