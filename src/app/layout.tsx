import ToasterProvider from '@/providers/ToasterProvider'
import { Inter } from 'next/font/google'
import './globals.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RentTomo - Ứng dụng tìm nơi ở, bạn cùng phòng lý tưởng',
  description: 'Ứng dụng tìm nơi ở, bạn cùng phòng lý tưởng',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        
        {children}
      </body>
    </html>
  )
}
