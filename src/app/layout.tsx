import ToasterProvider from '@/providers/ToasterProvider'
import { Inter } from 'next/font/google'
import './globals.scss'
import NavBar from '@/components/nav/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RentTomo - Ứng dụng tìm nơi ở, bạn cùng phòng lý tưởng',
  description: 'Tìm kiếm trọ hiệu quả dựa trên vị trí, tiện ích phòng và ngân sách của bạn. Hoặc, tham gia ngay vào những phòng đã có thành viên để tiết kiệm chi phí và gặp gỡ những người bạn mới.',
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
        <NavBar />
        {children}
      </body>
    </html>
  )
}
