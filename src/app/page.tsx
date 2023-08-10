import Footer from "@/components/footer/Footer";
import Questions from "@/components/landing/FAQs";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import LastCTA from "@/components/landing/LastCTA";
import Logo from "@/components/nav/Logo";
import UserMenu from "@/components/nav/UserMenu";
import UserMenuFallback from "@/components/nav/UserMenuFallback";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <main className="min-h-screen relative z-10">
        <div className="h-screen sm:h-[90vh] w-full -skew-y-6 absolute -top-24 bg-gradient-to-tr from-sky-600 to-sky-400 -z-10"></div>

        <section className="min-h-screen max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 p-4">
          <div className="flex flex-row items-center justify-between">
            <Logo isWhite />
            <Suspense fallback={<UserMenuFallback isWhite />}>
              <UserMenu isWhite />
            </Suspense>
          </div>

          <Hero />
        </section>

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
