import type { Metadata } from 'next'
import { Anton, Poppins } from 'next/font/google'
import SmoothScroll from '@/components/providers/SmoothScroll'
import './globals.css'

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Praveen Prasad — Portfolio',
  description:
    'Full-stack developer turning ideas into digital reality. Websites, products, and businesses that solve problems and generate results.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${anton.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-bg font-poppins text-white antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
