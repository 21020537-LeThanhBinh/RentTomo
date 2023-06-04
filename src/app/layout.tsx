import NavBar from '@/components/nav/NavBar'
import './globals.css'
import { Inter } from 'next/font/google'

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
        {/* @ts-expect-error Server Component */}
        <NavBar />
        {children}
      </body>
    </html>
  )
}
