import FacebookMsg from "@/components/FacebookMsg"
import Footer from "@/components/footer/Footer"

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <FacebookMsg />
      <main className="pt-20 relative">
        {children}
      </main>
      <Footer />
    </>
  )
}