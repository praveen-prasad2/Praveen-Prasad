import type { Metadata } from 'next'
import DotCursor from '@/components/ui/DotCursor'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://praveen-portfolio.example.com'),
  title: {
    default: 'Praveen Prasad — Portfolio',
    template: '%s | Praveen Prasad Portfolio',
  },
  description:
    'Full-stack developer crafting scalable web applications with Next.js, React, TypeScript, and Node.js.',
  keywords: [
    'Praveen Prasad',
    'Portfolio',
    'Full Stack Developer',
    'Next.js',
    'TypeScript',
  ],
  authors: [{ name: 'Praveen Prasad', url: 'https://www.linkedin.com/in/praveen-prasad-14764b231/' }],
  openGraph: {
    title: 'Praveen Prasad — Portfolio',
    description: 'Full-stack developer portfolio — Next.js, React, TypeScript, Node.js.',
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
      <body className="min-h-screen bg-bg font-sans text-white antialiased">
        <DotCursor />
        {children}
      </body>
    </html>
  );
}
