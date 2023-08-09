import FacebookMsg from "@/components/FacebookMsg"
import Footer from "@/components/footer/Footer"

export default function ListingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <FacebookMsg />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
    </>
  )
}