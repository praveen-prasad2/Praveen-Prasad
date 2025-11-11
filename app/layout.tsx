import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://praveen-portfolio.example.com'),
  title: {
    default: 'Praveen Prasad — Portfolio',
    template: '%s | Praveen Prasad Portfolio',
  },
  description:
    'Discover the work of Praveen Prasad — full-stack developer crafting elegant experiences with Next.js, TypeScript, and modern design systems.',
  keywords: [
    'Praveen Prasad',
    'Portfolio',
    'Full Stack Developer',
    'Next.js',
    'TypeScript',
    'React',
    'Tailwind CSS',
    'UI Engineer',
  ],
  authors: [{ name: 'Praveen Prasad', url: 'https://www.linkedin.com/in/praveenprasad' }],
  openGraph: {
    title: 'Praveen Prasad — Portfolio',
    description:
      'Designing and building performant digital products with a focus on clean UX and modern web standards.',
    url: 'https://praveen-portfolio.example.com',
    siteName: 'Praveen Prasad Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Preview of Praveen Prasad Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Praveen Prasad — Portfolio',
    description:
      'Designing and building performant digital products with a focus on clean UX and modern web standards.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

