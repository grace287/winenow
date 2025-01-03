import './globals.css'
import { Inter, Playfair_Display } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata = {
  title: 'WineNow',
  description: '당신의 와인 경험을 기록하세요',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-background text-foreground min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto py-6 px-4">
          {children}
        </main>
        <Navigation />
      </body>
    </html>
  )
}

