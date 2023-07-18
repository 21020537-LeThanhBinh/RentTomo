import Footer from "@/components/footer/Footer";
import Questions from "@/components/landing/FAQs";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import LastCTA from "@/components/landing/LastCTA";
import Logo from "@/components/nav/Logo";
import UserMenu from "@/components/nav/UserMenu";

export const metadata = {
  title: 'RentTomo - Ứng dụng tìm nơi ở, bạn cùng phòng lý tưởng',
  description: 'Tìm kiếm trọ hiệu quả dựa trên vị trí, tiện ích phòng và ngân sách của bạn. Hoặc, tham gia ngay vào những phòng đã có thành viên để tiết kiệm chi phí và gặp gỡ những người bạn mới.',
  openGraph: {
    images: {
      url: '/images/logo_full.png',
      alt: 'RentTomo Logo',
      width: 167,
      height: 32,
    },
  },
}

export default function Home() {
  return (
    <>
      <nav className="fixed w-full bg-white z-10 h-[85px]"></nav>

      <main className="min-h-screen relative z-10">
        <div className="h-screen sm:h-[90vh] w-full -skew-y-6 absolute -top-24 bg-gradient-to-tr from-sky-600 to-sky-400 -z-10"></div>

        <header className="h-screen max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 p-4">
          <div className="flex flex-row items-center justify-between">
            <Logo isWhite />
            <UserMenu isWhite />
          </div>

          <Hero />
        </header>

        <section>
          <Features />
          <Questions />
          <LastCTA />
        </section>
      </main>

      <Footer />
    </>
  )
}
