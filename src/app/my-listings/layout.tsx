import NavBar from "@/components/nav/NavBar"
import dynamic from "next/dynamic";
const Footer = dynamic(() => import("@/components/footer/Footer"));
export const metadata = {
  title: 'Phòng của bạn - RentTomo',
  description: 'Ứng dụng tìm trọ, bạn cùng phòng lý tưởng cho sinh viên.',
}

export default function MyListingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NavBar />
      <main className="pt-20 relative">
        {children}
      </main>
      <Footer />
    </>
  )
}