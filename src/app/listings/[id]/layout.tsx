import NavBar from "@/components/nav/NavBar"
import dynamic from "next/dynamic";
const Footer = dynamic(() => import("@/components/footer/Footer"));

export default function ListingLayout({
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
      <Footer />
    </>
  )
}