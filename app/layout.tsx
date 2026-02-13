import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hyphe - FIFA Prediction Market',
  description: 'Decentralized FIFA World Cup prediction market. Trade predictions, earn rewards, collect NFTs.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#0F4B95',
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased flex flex-col min-h-screen bg-background text-foreground">
        <Header />
        <main className="flex-1 animate-in">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
