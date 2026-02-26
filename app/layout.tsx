import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://base-converter.vercel.app'),
  alternates: {
    canonical: 'https://base-converter.vercel.app',
  },
  title: 'Number Base Converter — Binary, Decimal, Hex | Free Tool',
  description: 'Convert numbers between binary, decimal, hexadecimal, and octal bases. Free online base converter for programmers.',
  keywords: ['base converter', 'binary converter', 'decimal to hex', 'hex to decimal', 'octal converter', 'number base'],
  authors: [{ name: 'SmartOK Tools' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://base-converter.vercel.app',
    siteName: 'Base Converter',
    title: 'Number Base Converter — Binary, Decimal, Hex',
    description: 'Convert numbers between binary, decimal, hexadecimal, and octal.',
    images: ['/og-image.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Base Converter',
    description: 'Convert numbers between binary, decimal, hexadecimal, and octal.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Base Converter',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Any',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
              featureList: 'Binary conversion, Decimal conversion, Hexadecimal conversion, Octal conversion',
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-slate-50">{children}</body>
    </html>
  )
}
