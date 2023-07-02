import Questions from "@/components/landing/FAQ";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import Logo from "@/components/nav/Logo";
import UserMenu from "@/components/nav/UserMenu";

export default function Home() {
  return (
    <>
      <nav className="fixed w-full bg-white z-10 h-[85px]"></nav>

      <main className="min-h-screen relative overflow-x-hidden z-10">
        <div className="h-screen sm:h-[90vh] w-full -skew-y-6 absolute -top-24 bg-gradient-to-tr from-sky-700 to-sky-400 -z-10"></div>

        <div className="py-4">
          <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
            <header className="h-screen">
              <div className="flex flex-row items-center justify-between">
                <Logo isWhite />
                <UserMenu isWhite />
              </div>
              <Hero />
            </header>

            <section>
              <Features />
              <Questions />
            </section>
          </div>
        </div>
      </main>
    </>
  )
}
