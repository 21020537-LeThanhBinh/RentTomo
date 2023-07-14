import Footer from "@/components/footer/Footer"

export const metadata = {
  title: 'Đăng bài - RentTomo',
  description: 'Ứng dụng tìm nơi ở, bạn cùng phòng lý tưởng.',
}

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="pt-20">
        {children}
      </main>
      <Footer />
    </>
  )
}