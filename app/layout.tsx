import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CartProvider } from '@/components/CartProvider'

const centralAvenue = localFont({
  src: '../public/fonts/Central-Avenue.otf',
  variable: '--font-display',
  display: 'swap',
})

const ttNorms = localFont({
  src: '../public/fonts/TTNorms-Bold.otf',
  variable: '--font-heading',
  weight: '700',
  display: 'swap',
})

const newGrotesk = localFont({
  src: '../public/fonts/New-Grotesk-Square-SIX.otf',
  variable: '--font-body',
  display: 'swap',
})

const BASE_URL = 'https://chewawa.com.au'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Chewawa -- Premium Dental Chews for Dogs',
    template: '%s -- Chewawa',
  },
  description:
    'Australian-made dental chews that clean teeth, freshen breath, and keep your dog happy. Subscribe and save 15%. Free shipping on all orders.',
  keywords: ['dog dental chews', 'dog teeth cleaning', 'pet dental care', 'Australian dog treats', 'dental sticks for dogs', 'dog subscription box', 'natural dog chews'],
  authors: [{ name: 'Chewawa', url: BASE_URL }],
  creator: 'Chewawa',
  openGraph: {
    title: 'Chewawa -- Premium Dental Chews for Dogs',
    description: 'Australian-made dental chews that clean teeth and keep tails wagging. Subscribe and save 15%.',
    type: 'website',
    url: BASE_URL,
    siteName: 'Chewawa',
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chewawa -- Premium Dental Chews for Dogs',
    description: 'Australian-made dental chews. Subscribe and save 15%.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${centralAvenue.variable} ${ttNorms.variable} ${newGrotesk.variable}`}>
      <body className="min-h-screen bg-cream text-charcoal antialiased flex flex-col font-sans">
        <CartProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
