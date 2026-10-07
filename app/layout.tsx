import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://bd-cachex.vercel.app'),
  title: 'BD CacheX | Enterprise CDN Edge Cache & Bandwidth Allocation Platform',
  description: 'Enterprise CDN cache distribution, capacity allocation, and bandwidth optimization system for Bangladesh ISPs and IIGs.',
  icons: {
    icon: '/favicon.png',
  },
  other: {
    developer: 'Md. Mohsin',
    'developer-portfolio': 'https://md-mohsin.vercel.app/',
    'developer-whatsapp': 'https://wa.me/8801958113265',
    'developer-facebook': 'https://www.facebook.com/muhammad.mohsin.0033/',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-white text-slate-900" suppressHydrationWarning>
        <Toaster position="top-right" richColors />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
