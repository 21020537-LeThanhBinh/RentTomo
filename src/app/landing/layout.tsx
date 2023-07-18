import Footer from "@/components/footer/Footer"

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}