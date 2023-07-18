import Footer from "@/components/footer/Footer"

export const metadata = {
  title: 'Tìm kiếm - RentTomo',
  description: 'Ứng dụng tìm trọ, bạn cùng phòng lý tưởng.',
}

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="pt-20 relative">
        {children}
      </main>
      <Footer />
    </>
  )
}