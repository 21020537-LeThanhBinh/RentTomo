import NavBar from "@/components/nav/NavBar"

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NavBar />
      <main className="pt-20">
        {children}
      </main>
    </>
  )
}