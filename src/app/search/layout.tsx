import Pagination from "./Pagination"

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="pt-20">
      <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">

        {children}

        <div className="mt-16 mb-8 flex justify-center">
          <Pagination />
        </div>
      </div>
    </main>
  )
}