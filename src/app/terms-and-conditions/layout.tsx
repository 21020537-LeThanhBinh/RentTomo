import Footer from "@/components/footer/Footer"

export const metadata = {
  title: 'Điều khoản - RentTomo',
  description: 'Ứng dụng tìm trọ, bạn cùng phòng lý tưởng cho sinh viên.',
}

export default function TermsLayout({
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