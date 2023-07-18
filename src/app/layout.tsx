import ToasterProvider from '@/providers/ToasterProvider'
import { Inter } from 'next/font/google'
import './globals.scss'
import NavBar from '@/components/nav/NavBar'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RentTomo - Ứng dụng tìm trọ, bạn cùng phòng lý tưởng cho sinh viên',
  description: 'Tìm kiếm trọ hiệu quả dựa trên vị trí, tiện ích phòng và ngân sách của bạn. Hoặc, tham gia ngay vào những phòng đã có thành viên để tiết kiệm chi phí và gặp gỡ những người bạn mới.',
  openGraph: {
    images: {
      url: '/images/renttomo_logo_full_with_bg.png',
      alt: 'RentTomo Logo',
      width: 1200,
      height: 630,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <ToasterProvider />
        <NavBar />
        {children}
      </body>
    </html>
  )
}
