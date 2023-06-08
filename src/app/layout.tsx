import NavBar from '@/components/nav/NavBar'
import './globals.scss'
import { Inter } from 'next/font/google'
import ToasterProvider from '@/providers/ToasterProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RentxFriend',
  description: 'Ứng dụng tìm phòng trọ và bạn ở ghép nhanh chóng cho sinh viên',
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
        {/* @ts-expect-error Server Component */}
        <NavBar />
        {children}
      </body>
    </html>
  )
}
