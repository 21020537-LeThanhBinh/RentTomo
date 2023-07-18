import Footer from "@/components/footer/Footer"

export const metadata = {
  title: 'Chính sách bảo mật - RentTomo',
  description: 'Ứng dụng tìm trọ, bạn cùng phòng lý tưởng.',
}

export default function PrivacyLayout({
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