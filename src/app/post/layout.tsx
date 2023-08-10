import Footer from "@/components/footer/Footer"
import NavBar from "@/components/nav/NavBar"

export const metadata = {
  title: 'Đăng bài - RentTomo',
  description: 'Ứng dụng tìm trọ, bạn cùng phòng lý tưởng cho sinh viên.',
}

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NavBar />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
    </>
  )
}