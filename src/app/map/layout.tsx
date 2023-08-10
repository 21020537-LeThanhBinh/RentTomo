import NavBar from "@/components/nav/NavBar"

export const metadata = {
  title: 'Bản đồ - RentTomo',
  description: 'Ứng dụng tìm trọ, bạn cùng phòng lý tưởng cho sinh viên.',
}

export default function MapLayout({
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
    </>
  )
}