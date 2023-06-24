import NavBar from "@/components/nav/NavBar"

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