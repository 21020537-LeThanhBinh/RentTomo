export default function loading() {
  return (
    <>
      <div className="fixed w-full bg-white z-10 h-[85px]"></div>

      <main className="min-h-screen relative z-10">
        <div className="h-screen sm:h-[90vh] w-full -skew-y-6 absolute -top-24 bg-gradient-to-tr from-sky-600 to-sky-400 -z-10"></div>

        <section className="h-screen max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 p-4">
          <div className="flex flex-row items-center justify-between">
            <p>Logo</p>
            <p>UserMenu</p>
          </div>

          <p>Hero</p>
        </section>

        <section>
          <p>Features</p>
          <p>Questions</p>
          <p>LastCTA</p>
        </section>
      </main>

      <p>Footer</p>
    </>
  )
}
