import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Inter_Tight, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import SmoothScroll from '@/components/providers/SmoothScroll'
import PageMascot from '@/components/ui/PageMascot'
import data from '@/data/portfolio.json'

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

// The apex domain redirects here, so www is the canonical host.
const SITE_URL = 'https://www.praveenprasad.in'
const TITLE = 'Praveen Prasad | Full Stack Developer in India'
const DESCRIPTION =
  'Praveen Prasad is a full stack developer in India building websites, web apps, and automations with React, Next.js, and Node.js. Explore his work.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: data.about.name,
    title: TITLE,
    description: DESCRIPTION,
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary',
    title: TITLE,
    description: DESCRIPTION,
    creator: '@praveen_prasaad',
  },
  icons: {
    icon: '/uploads/logo.svg',
    shortcut: '/uploads/logo.svg',
    apple: '/uploads/logo.svg',
  },
}

// Only details already shown on the page.
const [city, region] = data.about.location.split(',').map((part) => part.trim())
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: data.about.name,
  jobTitle: data.about.title,
  url: SITE_URL,
  email: `mailto:${data.about.email}`,
  address: { '@type': 'PostalAddress', addressLocality: city, addressRegion: region, addressCountry: 'IN' },
  worksFor: { '@type': 'Organization', name: data.experiences[0].company.split(',')[0] },
  knowsAbout: ['React', 'Next.js', 'TypeScript', 'Node.js', 'n8n', 'WordPress', 'Shopify'],
  sameAs: data.about.socials.map((s) => s.url),
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <SmoothScroll>{children}</SmoothScroll>

        <PageMascot />
      </body>
    </html>
  )
}
