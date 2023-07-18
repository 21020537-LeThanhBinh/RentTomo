export const metadata = {
  title: 'Bản đồ - RentTomo',
  description: 'Ứng dụng tìm trọ, bạn cùng phòng lý tưởng.',
}

export default function MapLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="pt-20 relative">
        {children}
      </main>
    </>
  )
}