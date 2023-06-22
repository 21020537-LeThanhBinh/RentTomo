export default function MapLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="pt-20 relative">
      {children}
    </main>
  )
}