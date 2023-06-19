export default function ListingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="pt-20">
      {children}
    </main>
  )
}